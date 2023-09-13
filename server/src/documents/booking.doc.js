export const createBooking = {
    tags: ["Bookings"],
    description: "Create a new booking for a ride",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        in: "path",
        name: "_id",
        schema: {
          type: "string",
          pattern: "^[0-9a-fA-F]{24}$",
        },
        required: true,
        description: "The ID of the ride to book (in ObjectId format)",
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              booked_seats: {
                type: "integer",
                minimum: 1,
                description: "Number of seats to book (default: 1)",
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: "Booking created successfully",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Booking",
            },
          },
        },
      },
      400: {
        description: "Invalid ride ID or ride already booked",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      401: {
        description: "Unauthorized, user is not a passenger",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      403: {
        description: "Booking already exists",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    },
  };
  
  

  export const approveBooking = {
    "tags": ["Bookings"],
    "description": "Approve or reject a booking",
    "security": [
      {
        "bearerAuth": []
      }
    ],
    "parameters": [
      {
        "in": "path",
        "name": "_id",
        "schema": {
          "type": "string",
        },
        "required": true,
        "description": "The ID of the booking"
      }
    ],
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "properties": {
              "status": {
                "type": "string",
                "enum": ["approved", "rejected"],
                "description": "New status for the booking"
              }
            },
            "required": ["status"]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Booking approved or rejected successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "400": {
        "description": "Invalid booking ID, booking already approved/rejected, or invalid status provided",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "401": {
        "description": "Unauthorized, user is not a driver or not the driver who posted the ride",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "type": "string"
                }
              }
            }
          }
        }
      }
    }
  };

  export const getBooks = {
    tags: ["Bookings"],
    description: "Get  a bookings",
    operationId: "Get bookings",
    security: [
        {
          bearerAuth: [],
        },
      ],
    parameters: [],
    responses: {
      200: {
        description: "Get your Bookings successfully", // response desc
        content: {

        },
      },
      500: {
        description: "Server error", // response desc
      },
    },
  };