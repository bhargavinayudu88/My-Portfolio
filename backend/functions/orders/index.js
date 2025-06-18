const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const ORDERS_TABLE = process.env.ORDERS_TABLE;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
};

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    const { httpMethod, pathParameters, body, requestContext } = event;
    const userId = requestContext.authorizer.claims.sub;

    switch (httpMethod) {
      case 'GET':
        if (pathParameters && pathParameters.id) {
          return await getOrder(pathParameters.id, userId);
        } else {
          return await getOrders(userId);
        }
      
      case 'POST':
        return await createOrder(JSON.parse(body), userId);
      
      default:
        return {
          statusCode: 405,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

async function getOrders(userId) {
  const params = {
    TableName: ORDERS_TABLE,
    IndexName: 'UserIndex',
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    },
    ScanIndexForward: false // Sort by creation date descending
  };

  const result = await dynamodb.query(params).promise();

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(result.Items)
  };
}

async function getOrder(orderId, userId) {
  const params = {
    TableName: ORDERS_TABLE,
    Key: { id: orderId }
  };

  const result = await dynamodb.get(params).promise();
  
  if (!result.Item) {
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Order not found' })
    };
  }

  // Ensure user can only access their own orders
  if (result.Item.userId !== userId) {
    return {
      statusCode: 403,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Access denied' })
    };
  }

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(result.Item)
  };
}

async function createOrder(orderData, userId) {
  const order = {
    id: generateOrderId(),
    userId,
    ...orderData,
    status: 'processing',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const params = {
    TableName: ORDERS_TABLE,
    Item: order
  };

  await dynamodb.put(params).promise();

  // Here you would typically:
  // 1. Process payment with Stripe
  // 2. Send confirmation email with SES
  // 3. Update inventory
  // 4. Trigger fulfillment process

  return {
    statusCode: 201,
    headers: corsHeaders,
    body: JSON.stringify(order)
  };
}

function generateOrderId() {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}