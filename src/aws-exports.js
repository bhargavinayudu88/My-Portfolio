const awsconfig = {
  Auth: {
    region: process.env.VITE_AWS_REGION || 'us-east-1',
    userPoolId: process.env.VITE_USER_POOL_ID || 'us-east-1_example',
    userPoolWebClientId: process.env.VITE_USER_POOL_CLIENT_ID || 'example-client-id',
    mandatorySignIn: false,
    authenticationFlowType: 'USER_SRP_AUTH'
  },
  API: {
    endpoints: [
      {
        name: 'kartzy-api',
        endpoint: process.env.VITE_API_ENDPOINT || 'https://api.example.com',
        region: process.env.VITE_AWS_REGION || 'us-east-1'
      }
    ]
  },
  Storage: {
    AWSS3: {
      bucket: process.env.VITE_S3_BUCKET || 'kartzy-images',
      region: process.env.VITE_AWS_REGION || 'us-east-1'
    }
  }
}

export default awsconfig