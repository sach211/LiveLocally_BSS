'use strict';

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

  const firebaseTokenVerifier = require('firebase-token-verifier')
  const projectId = "ll-auth-61b58"
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify([{name: 'Cloister Cafe', category: 'gr8 cocktails', likes: 10,}, {name: 'Ginger and Lemongrass',category: 'restaurants',likes: 2,},{name: 'Mao\'s Bao', category: 'restaurants',likes: 23,}])
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

  const firebaseTokenVerifier = require('firebase-token-verifier')
  const projectId = "ll-auth-61b58"
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
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify([{name: 'gr8 cocktails', followers: 3,}, {name: 'restaurants',followers: 12,}])
    }
  }
};

