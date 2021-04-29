'use strict';

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const firebaseTokenVerifier = require('firebase-token-verifier')

const projectId = "ll-auth-61b58"

const headers = {
  'Access-Control-Allow-Origin': '*'
}

module.exports.hello = async (event) => {
  if (event.path === '/whoami' && event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          username: 'sva22'
        }
      ),
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.viewPins = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    // return the expected status and CORS headers
    return {
        statusCode: 200,
        headers
    }
  }

  if (event.path === '/yourPins/pinsList' && event.httpMethod === 'GET') {
    const token = event.headers['Authorization'] 
    if (!token) {
      return {
        headers,
        statusCode: 401
      }
    }

    try {
      // validate the token from the request
      const decoded = await firebaseTokenVerifier.validate(token, projectId)
    } catch (err) {
      // the token was invalid,
      console.error(err)
      return {
        headers,
        statusCode: 401
      }
    }

    const locations = await getLocations(decoded['email'])
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(locations)
    }
  }

  if (event.path === '/yourPins/addPin' && event.httpMethod === 'POST') {
    let user;
    try {
      user = await checkUser(event)
    } catch (err) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({message: err.message})
      }
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({message: 'Missing body'})
      }
    }

    const pinContent = JSON.parse(event.body);
    const data = await addPin(pinContent.loc_id, pinContent.uu_id, pinContent.category_name, pinContent.loc_name)

    return {
      statusCode: 201,
        headers
    }
  }
};

module.exports.viewCategories = async (event) => {

  if (event.httpMethod === 'OPTIONS') {
    // return the expected status and CORS headers
    return {
        statusCode: 200,
        headers
    }
  }

  if (event.path === '/yourPins/categories' && event.httpMethod === 'GET') {
    const token = event.headers['Authorization']
    if (!token) {
      return {
        statusCode: 401,
        headers
      }
    }

    try {
      // validate the token from the request
      const decoded = await firebaseTokenVerifier.validate(token, projectId)
    } catch (err) {
      // the token was invalid,
      console.error(err)
      return {
        headers,
        statusCode: 401
      }
    }
    
    const categories = await getCategories(decoded['email'])
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(categories)
    }
  }

  if (event.path === '/yourPins/addCategory' && event.httpMethod === 'POST') {
    let user;
    try {
      user = await checkUser(event)
    } catch (err) {
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({message: err.message})
      }
    }

    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({message: 'Missing body'})
      }
    }

    const categoryContent = JSON.parse(event.body);
    const data = await addCategory(categoryContent.category_id, categoryContent.uu_id, categoryContent.category_name)

    return {
      statusCode: 201,
        headers
    }
  }

};

const checkUser = async (event) => {
  const token = event.headers['Authorization']
    if (!token) {
      throw new Error('Missing token')
    }
    const decodedUser = await firebaseTokenVerifier.validate(token, projectId)
    return decodedUser
}

function getLocations (uuid) {
  console.log("get Locations")
  return docClient.query(
    {
      TableName: "ll_bss_locations",
      KeyConditionExpression: "uu_id = :uuid",
      ExpressionAttributeValues: {":uuid": uuid},
    }
  ).promise().then((response) => response.Items);
}

function getCategories (uuid) {
  console.log("get Categories")
  return docClient.query(
    {
      TableName: "ll_bss_categories",
      KeyConditionExpression: "uu_id = :uuid",
      ExpressionAttributeValues: {":uuid": uuid},
    }
  ).promise().then((response) => response.Items);
}

function addPin(loc_id, uu_id, category_name, loc_name) {
  console.log("Adding pin")
  return docClient.put(
    {
      TableName: "ll_bss_locations",
      Item: {
        loc_id: loc_id,
        uu_id: uu_id,
        category_name: category_name,
        likes: 0,
        loc_name: loc_name
      },
    }
  ).promise();
};

function addCategory(category_id, uu_id, category_name) {
  console.log("Adding category")
  return docClient.put(
    {
      TableName: "ll_bss_categories",
      Item: {
        category_id: category_id,
        uu_id: uu_id,
        category_name: category_name,
        followers: 0
      },
    }
  ).promise();
};
