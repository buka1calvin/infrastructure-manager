export const updateUserStatus = {
    tags: ["Admin disable/re-enable an account"],
    description: "Update a user's status",
    operationId: "updateUserStatus",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "User ID",
        required: true,
        schema: {
          type: "string",
          example: "12345",
        },
      },
    ],
    responses: {
      200: {
        description: "User status updated successfully",
      },
      400: {
        description: "Invalid request data",
      },
      404: {
        description: "User not found",
      },
      500: {
        description: "Server error",
      },
    },
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
  };

  export const assignUserRole = {
    tags: ["Admin set roles"],
    description: "Assign a role to a user",
    operationId: "assignUserRole",
    parameters: [
      {
        name: 'id',
        in: 'path',
        description: 'User ID',
        required: true
      }
    ],
    requestBody: {
      description: "User data",
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              newRole: {
                type: "string",
                description: "User role",
                example: "admin",
              },
            },
            required: ["newRole"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "User role assigned successfully",
      },
      400: {
        description: "Invalid request data",
      },
      404: {
        description: "User not found",
      },
      500: {
        description: "Server error",
      },
    },
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
  };
  