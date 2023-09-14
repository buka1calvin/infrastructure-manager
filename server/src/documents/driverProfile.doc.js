export const updateDriverProfile = {
    tags: ["User Authentication"],
    description: "Update a driver's profile",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            properties: {
              driverLicenseNumber: {
                type: "string",
                description: "Driver's license number",
                example: "1234567890",
              },
              carPictures: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
                description: "Car pictures",
              },
            },
            required: ["driverLicenseNumber", "carPictures"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "Driver profile updated successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  // Include the properties of the user object here
                },
                message: {
                  type: "string",
                  example: "Driver profile updated successfully",
                },
              },
            },
          },
        },
      },
      401: {
        description: "User not found",
      },
      500: {
        description: "Server error",
      },
    },
  };
  
  export const updateVerificationStatus = {
    tags: ["Admin driver Verification"],
    description: "Update user's verification status",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        description: "User ID",
        required: true,
        schema: {
          type: "string",
          example: "1234567890",
        },
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              verificationStatus: {
                type: "string",
                description: "Verification status",
                example: "approved",
              },
            },
            required: ["verificationStatus"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "Verification status updated successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  // Include the properties of the user object here
                },
                message: {
                  type: "string",
                  example: "Verification status updated successfully",
                },
              },
            },
          },
        },
      },
      401: {
        description: "Only admin users can update verification status",
      },
      500: {
        description: "Server error",
      },
    },
  };
  