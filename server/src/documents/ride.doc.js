export const newRide = {
  tags: ["Ride creation"],
  description: "Create a ride",
  operationId: "create Ride",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [],
  requestBody: {
    content: {
      // content-type
      "application/json": {
        schema: {
          type: "object",
          properties: {
            origin: {
              type: "string",
              description: "where are u from",
              example: "Kicukiro",
            },
            destination: {
              type: "string",
              description: "where you want to go",
              example: "Kabeza",
            },
            otherStations: {
              type: "string",
              description: "other places driver will stop on the way",
              example: "Remera",
            },
            seats: {
              type: "integer",
              description: "number of the available seats,a car has",
              example: "5",
            },
            departureDate: {
              type: "date",
              description: "the date of the journey",
              example: "2022-03-02",
            },
            price: {
              type: "integer",
              description: "the price for the ride",
              example: "2022-03-02",
            },
          },
        },
      },
    },
  },
  responses: {
    // response code
    201: {
      description: "Ride created successfully", // response desc
      content: {},
    },
    // response code
    500: {
      description: "Server error", // response desc
    },
  },
};

export const searchRide = {
  tags: ["search Ride"],
  description: "Search for Ride by date, origin, destination and seats",
  operationId: "searchRide",
  parameters: [
    {
      name: 'date',
      in: 'query',
      description: 'search by date',
      schema: {
        type: 'date',
      },
    },
    {
      name: 'origin',
      in: 'query',
      description: 'Search by origin',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'destination',
      in: 'query',
      description: 'search by destination',
      schema: {
        type: 'string',
      },
    },
    {
      name: 'seats',
      in: 'query',
      description: 'Search by seats',
      schema: {
        type: 'integer',
      },
    },
  ],
  responses: {
    200: {
      description: "Success",
      content: {
      },
    },
    400: {
      description: "Invalid request data",
    },
    404: {
      description: "Ride not available",
    },
    500: {
      description: "Server error",
    },
  },
};
export const cancelRide = {
  tags: ["Ride cancel"],
  description: "delete a ride",
  operationId: "delete Ride",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Ride ID',
      required: true
    }
  ],
  responses: {
    // response code
    200: {
      description: "Ride was canceled successfully", // response desc
      content: {},
    },
    // response code
    500: {
      description: "Server error", // response desc
    },
  },
};

export const getRide = {
  tags: ["get Ride"],
  description: "Get  a ride ",
  operationId: "Get a ride",
  responses: {
    200: {
      description: "Get your Ride successfully", 
      content: {

      },
    },
    500: {
      description: "Server error", 
    },
  },
};

