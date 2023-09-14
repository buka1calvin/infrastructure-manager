 const userPayment = {
  tags: ['Payment'],
  summary: 'User payment',
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description: 'URL for the payment session'
              }
            }
          },
          example: {
            url: 'https://stripe.com/checkout'
          }
        }
      }
    },
    400: {
      description: 'Bad Request'
    },
    404: {
      description: 'Not Found',
      content: {
        'application/json': {
          schema: {
            type: 'string',
            description: 'Error message'
          },
          example: 'Nothing to pay 😥. Wait for your booking to be approved.'
        }
      }
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'Error message'
              }
            }
          }
        }
      }
    }
  }
};

export default userPayment;
  
  