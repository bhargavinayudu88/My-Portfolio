const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;

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
    const { httpMethod, pathParameters, queryStringParameters, body } = event;
    const path = event.resource;

    switch (httpMethod) {
      case 'GET':
        if (pathParameters && pathParameters.id) {
          return await getProduct(pathParameters.id);
        } else {
          return await getProducts(queryStringParameters);
        }
      
      case 'POST':
        return await createProduct(JSON.parse(body));
      
      case 'PUT':
        return await updateProduct(pathParameters.id, JSON.parse(body));
      
      case 'DELETE':
        return await deleteProduct(pathParameters.id);
      
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

async function getProducts(queryParams) {
  const { category, search, limit = 50, lastKey } = queryParams || {};
  
  let params = {
    TableName: PRODUCTS_TABLE,
    Limit: parseInt(limit)
  };

  if (lastKey) {
    params.ExclusiveStartKey = JSON.parse(decodeURIComponent(lastKey));
  }

  if (category) {
    params.IndexName = 'CategoryIndex';
    params.KeyConditionExpression = 'category = :category';
    params.ExpressionAttributeValues = {
      ':category': category
    };
  }

  const result = await dynamodb.scan(params).promise();
  
  let items = result.Items;

  // Filter by search term if provided
  if (search) {
    const searchTerm = search.toLowerCase();
    items = items.filter(item => 
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
    );
  }

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({
      products: items,
      lastKey: result.LastEvaluatedKey ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey)) : null
    })
  };
}

async function getProduct(id) {
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: { id }
  };

  const result = await dynamodb.get(params).promise();
  
  if (!result.Item) {
    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Product not found' })
    };
  }

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(result.Item)
  };
}

async function createProduct(productData) {
  const product = {
    id: generateId(),
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const params = {
    TableName: PRODUCTS_TABLE,
    Item: product
  };

  await dynamodb.put(params).promise();

  return {
    statusCode: 201,
    headers: corsHeaders,
    body: JSON.stringify(product)
  };
}

async function updateProduct(id, updateData) {
  const updateExpression = [];
  const expressionAttributeNames = {};
  const expressionAttributeValues = {};

  Object.keys(updateData).forEach(key => {
    updateExpression.push(`#${key} = :${key}`);
    expressionAttributeNames[`#${key}`] = key;
    expressionAttributeValues[`:${key}`] = updateData[key];
  });

  expressionAttributeValues[':updatedAt'] = new Date().toISOString();
  updateExpression.push('#updatedAt = :updatedAt');
  expressionAttributeNames['#updatedAt'] = 'updatedAt';

  const params = {
    TableName: PRODUCTS_TABLE,
    Key: { id },
    UpdateExpression: `SET ${updateExpression.join(', ')}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW'
  };

  const result = await dynamodb.update(params).promise();

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify(result.Attributes)
  };
}

async function deleteProduct(id) {
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: { id }
  };

  await dynamodb.delete(params).promise();

  return {
    statusCode: 204,
    headers: corsHeaders,
    body: ''
  };
}

function generateId() {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}