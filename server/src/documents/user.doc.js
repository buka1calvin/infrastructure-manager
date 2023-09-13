export const signUp = {
  tags: ['User Authentication'],
  description: 'Create a new user',
  operationId: 'createUser',
  parameters: [],
  requestBody: {
    content: {
      // content-type
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            firstname: {
              type: 'string',
              description: 'User first name',
              example: 'Iribagiza'
            },
            lastname: {
              type: 'string',
              description: 'User last name',
              example: 'Jeannette'
            },
            email: {
              type: 'string',
              description: 'User email',
              example: 'iribagizajenny@test.com'
            },
            phoneNumber: {
              type: 'string',
              description: 'User phone number',
              example: '+123456789'
            },
            password: {
              type: 'string',
              description: 'User password',
              example: '@Qwert123'
            }
          }
        }
      }
    }
  },
  responses: {
    // response code
    201: {
      description: 'User created successfully', // response desc
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                description: 'Created user object',
                properties: {
                  firstname: {
                    type: 'string'
                  },
                  lastname: {
                    type: 'string'
                  },
                  email: {
                    type: 'string'
                  },
                  role: {
                    type: 'string'
                  },
                  phoneNumber: {
                    type: 'string'
                  },
                  isActive: {
                    type: 'boolean'
                  }
                }
              },
              token: {
                type: 'string',
                description: 'Generated token for authentication'
              }
            }
          }
        }
      }
    },
    // response code
    500: {
      description: 'Server error' // response desc
    }
  }
};

export const loginUser = {
  tags: ['User Authentication'],
  description: 'Logs in a user',
  operationId: 'loginUser',
  parameters: [],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'User email',
              example: 'user@test.com'
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'password123'
            }
          },
          required: ['email', 'password']
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Successful login',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Successful login'
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 1
                  },
                  firstname: {
                    type: 'string',
                    example: 'John'
                  },
                  lastname: {
                    type: 'string',
                    example: 'Doe'
                  },
                  email: {
                    type: 'string',
                    example: 'user@test.com'
                  },
                  role: {
                    type: 'string',
                    example: 'admin'
                  }
                }
              },
              token: {
                type: 'string',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
              }
            }
          }
        }
      }
    },
    401: {
      description: 'Invalid email or password',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Invalid email or password'
              }
            }
          }
        }
      }
    },
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'User not found'
              }
            }
          }
        }
      }
    },
    500: {
      description: 'Server error'
    }
  }
};
export const getUserProfile = {
  tags: ['User Authentication'],
  description: 'Get a user profile',
  security: [
    {
      bearerAuth: []
    }
  ],
  responses: {
    200: {
      description: 'User profile fetched',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              userDetails: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 1
                  },
                  firstname: {
                    type: 'string',
                    example: 'John'
                  },
                  lastname: {
                    type: 'string',
                    example: 'Doe'
                  },
                  email: {
                    type: 'string',
                    example: 'user@test.com'
                  },
                  role: {
                    type: 'string',
                    example: 'admin'
                  }
                }
              }
            }
          }
        }
      }
    },
    500: {
      description: 'Server error'
    }
  }
};

export const userProfile = {
  tags: ['User Authentication'],
  description: 'User profile editing',
  security: [
    {
      bearerAuth: []
    }
  ],
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            gender: {
              type: 'string',
              description: 'Gender',
              example: 'male'
            },
            DOB: {
              type: 'string',
              format: 'date',
              description: 'Date of Birth',
              example: '2020-10-10'
            },
            preferredCurrency: {
              type: 'string',
              description: 'Preferred Currency',
              example: 'RWF'
            },
            preferredLanguage: {
              type: 'string',
              description: 'Preferred Language',
              example: '@Qwert123'
            },
            street: {
              type: 'string',
              description: 'Street',
              example: 'KG08 Ave'
            },
            province: {
              type: 'string',
              description: 'Province',
              example: 'Kigali City'
            },
            district: {
              type: 'string',
              description: 'District',
              example: 'Nyarugenge'
            },
            phoneNumber: {
              type: 'string',
              description: 'Phone Number',
              example: '07851234567'
            },
            email: {
              type: 'string',
              description: 'Email',
              example: 'user@example.com'
            },
            profilePic: {
              type: 'file',
              description: 'Profile Picture'
            }
          }
        }
      }
    }
  },
  responses: {
    202: {
      description: 'User profile updated successfully'
    },
    500: {
      description: 'Server error'
    }
  }
};

export const verifyOTP = {
  tags: ['User Authentication'],
  description: 'Validates OTP and logs in user',
  operationId: 'verifyOTP',
  parameters: [
    {
      name: 'token',
      in: 'path',
      description: 'Authentication token',
      required: true,
      schema: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9vgfgfg'
      }
    }
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            otp: {
              type: 'string',
              description: 'One-time password',
              required: true,
              example: '123459'
            }
          },
          required: ['otp']
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Successful login',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Logged in successfully'
              },
              token: {
                type: 'string',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9vgfgfg'
              }
            }
          }
        }
      }
    },
    401: {
      description: 'Invalid OTP',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Invalid OTP'
              }
            }
          }
        }
      }
    },
    403: {
      description: 'Expired or invalid OTP',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Invalid OTP!'
              }
            }
          }
        }
      }
    },
    500: {
      description: 'Server error'
    }
  }
};
  
export const logoutUser = {
  tags: ['User Logout'],
  description: 'User logout',
  security: [
    {
      bearerAuth: []
    }
  ],
  responses: {
    200: {
      description: 'You have logged out successfully'
    },
    500: {
      description: 'Server error'
    }
  }
};

export const verifyEmail = {
  tags: ['User Authentication'],
  description: 'Verify the user\'s email',
  operationId: 'verifyEmail',
  parameters: [
    {
      name: 'token',
      in: 'query',
      description: 'Token sent to the user\'s email',
      required: true,
      schema: {
        type: 'string'
      }
    }
  ],
  responses: {
    200: {
      description: 'Email verified successfully',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Email verified'
              }
            }
          }
        }
      }
    },
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'User not found'
              }
            }
          }
        }
      }
    },
    419: {
      description: 'Token has expired',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Token has expired'
              }
            }
          }
        }
      }
    },
    500: {
      description: 'Server error'
    }
  }
};
  
export const getSales = {
  tags: ['get sales'],
  description: 'seller retrieve his/her sales',
  operationId: 'getSales',
  responses: {
    200: {
      description: 'sales retrieved successfully'
    },
    400: {
      description: 'Invalid request data'
    },
    404: {
      description: 'sales not found'
    },
    500: {
      description: 'Server error'
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};
  
  
export const changeSaleStatu = {
  tags: ['seller update  sale status'],
  description: 'update status for a sale',
  operationId: 'updatestatus',
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'sale id',
      required: true
    }
  ],
  requestBody: {
    description: 'sale data',
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            newStatus: {
              type: 'string',
              description: 'sale status',
              example: 'rejected'
            }
          },
          required: [ 'newstatus']
        }
      }
    }
  },
  responses: {
    200: {
      description: 'sale status assigned successfully'
    },
    400: {
      description: 'Invalid request data'
    },
    404: {
      description: 'sale not found'
    },
    500: {
      description: 'Server error'
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

export const resetEmail = {
  tags: ['Reset Password'],
  description: 'Reset user password',
  operationId: 'Reset password',
  parameters: [],
  requestBody: {
    content: {
      // content-type
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description: 'User email',
              example: 'name@example.com'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Email set successfully'
    },
    400: {
      description: 'User not registered'
    }
  }
};  
  
    
export const ResetPassword = {
  tags: ['Reset Password'],
  description: 'Reset user password',
  operationId: 'Reset password',
  parameters: [
    {
      name: 'token',
      in: 'path',
      description: 'the sent token',
      required: true
    }
  ],
  requestBody: {
    content: {
      // content-type
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            password: {
              type: 'string',
              // eslint-disable-next-line max-len
              description: 'Enter New password, password must include one number small letters and characters + capital letters',
              example: 'maxmax250'
            },
            confirmPassword: {
              type: 'string',
              description: 're-enter your new password',
              example: 'maxmax250'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Password reset successfully'
    },
    400: {
      description: 'Bad request'
    }
  }
};
  
  
  
  
  