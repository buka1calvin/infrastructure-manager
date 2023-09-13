export const statistic = {
    tags: ["users Statistic"],
    description: "Returns the statistics for a users",
    operationId: "statistic",
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    requestBody: {
      content: {
        "application/json": {},
      },
    },
    responses: {
      200: {
        description: "Successful operation",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  year: {
                    type: "string",
                    example: "2023",
                  },
                  month: {
                    type: "string",
                    example: "March",
                  },
                  Bookings: {
                    type: "integer",
                    example: 20,
                  },
                  Ride: {
                    type: "number",
                    format: "float",
                    example: 200.5,
                  },
                  payedBooking: {
                    type: "integer",
                    example: 5,
                  },
                  allBookingMoney: {
                    type: "number",
                    format: "float",
                    example: 50.25,
                  },
                },
              },
            },
          },
        },
      },
      401: {
        description: "Unauthorized User",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Unauthorized User",
                },
              },
            },
          },
        },
      },
      500: {
        description: "Internal server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                error: {
                  type: "string",
                  example: "Internal server error",
                },
              },
            },
          },
        },
      },
    },
  };