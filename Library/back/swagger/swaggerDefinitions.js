const swaggerDefinition = {
  // BEGIN: User Configuration
  "/user": {
    get: {
      summary:
        "Retorna uma mensagem indicando que o servidor está funcionando corretamente.",
      tags: ["User"],
      security: [{ bearerAuth: [] }], 
      responses: {
        200: {
          description: "Retorna uma mensagem de sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/user/{id}": {
    get: {
      summary: "Obtém informações de um usuário específico pelo ID.",
      tags: ["User"],
      security: [{ bearerAuth: [] }], 
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID do usuário",
          schema: {
            type: "string",
          },
        },
      ],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        200: {
          description: "Retorna informações do usuário",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    type: "object",
                    description: "Objeto contendo informações do usuário",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Usuário não encontrado",
        },
        500: {
          description: "Erro ao buscar usuário",
        },
      },
    },
  },
  "/user/logout/{Id}": {
    post: {
      summary: "Desconecta um usuário pelo ID.",
      tags: ["User"],
      security: [{ bearerAuth: [] }], 
      parameters: [
        {
          in: "path",
          name: "Id",
          required: true,
          description: "ID do usuário a ser desconectado",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Usuário desconectado com sucesso",
        },
      },
    },
  },
  "/user/register": {
    post: {
      summary: "Registra um novo usuário",
      tags: ["User"],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "Nome do usuário",
                },
                email: {
                  type: "string",
                  description: "Email do usuário",
                },
                password: {
                  type: "string",
                  description: "Senha do usuário",
                },
                confirmpassword: {
                  type: "string",
                  description: "Confirmação da senha do usuário",
                },
                profileImage: {
                  type: "string",
                  format: "binary",
                  description: "Imagem de perfil do usuário",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Usuário registrado com sucesso",
        },
        422: {
          description: "Erro de validação",
        },
        500: {
          description: "Erro no servidor",
        },
      },
    },
  },
  "/user/login": {
    post: {
      summary: "Autentica um usuário com email e senha.",
      tags: ["User"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Usuário autenticado com sucesso",
        },
        401: {
          description: "Credenciais inválidas",
        },
      },
    },
  },
  "/user/update/{Id}": {
    put: {
      summary: "Atualiza informações de um usuário pelo ID.",
      tags: ["User"],
      security: [{ bearerAuth: [] }], 
      parameters: [
        {
          in: "path",
          name: "Id",
          required: true,
          description: "ID do usuário a ser atualizado",
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                email: {
                  type: "string",
                }
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Usuário atualizado com sucesso",
        },
        404: {
          description: "Usuário não encontrado",
        },
        422: {
          description: "Erro de validação ou senhas não coincidem",
        },
      },
    },
  },
  "/user/delete/{Id}": {
    delete: {
      summary: "Deleta um usuário pelo ID.",
      tags: ["User"],
      security: [{ bearerAuth: [] }], 
      parameters: [
        {
          in: "path",
          name: "Id",
          required: true,
          description: "ID do usuário a ser deletado",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Usuário deletado com sucesso",
        },
        404: {
          description: "Usuário não encontrado",
        },
      },
    },
  },
  "/user/{email}": {
    get: {
      summary: "Verifica se o usuário existe a partir do e-mail",
      tags: ["User"],
      parameters: [
        {
          name: "email",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "E-mail do usuário a ser verificado",
        },
      ],
      responses: {
        200: {
          description: "Retorna se existe usuário com o e-mail fornecido",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  user: {
                    type: "object",
                    description: "Objeto",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Usuário não encontrado",
        },
        500: {
          description: "Erro ao buscar usuário",
        },
      },
    },
  },
  "/user/check-email/{email}": {
    get: {
      summary: "Verifica se o usuário existe a partir do e-mail",
      tags: ["User"],
      parameters: [
        {
          name: "email",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          description: "E-mail do usuário a ser verificado",
        },
      ],
      responses: {
        200: {
          description: "Usuário encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                  },
                  user: {
                    type: "object",
                    description: "Objeto contendo informações do usuário",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Usuário não encontrado",
        },
        422: {
          description: "Erro de validação (e-mail não fornecido)",
        },
        500: {
          description: "Erro no servidor",
        },
      },
    },
  },
  "/user/change-password": {
    post: {
      summary: "Altera a senha de um usuário.",
      tags: ["User"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "Email do usuário",
                  example: "user@example.com",
                },
                newPassword: {
                  type: "string",
                  description: "Nova senha do usuário",
                  example: "NewPassword123!",
                },
                confirmNewPassword: {
                  type: "string",
                  description: "Confirmação da nova senha",
                  example: "NewPassword123!",
                },
              },
              required: ["email", "newPassword", "confirmNewPassword"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Senha alterada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                    example: "Senha alterada com sucesso!",
                  },
                },
              },
            },
          },
        },
        422: {
          description: "Erro de validação",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                    example: "Por favor, forneça todos os campos obrigatórios.",
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Usuário não encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                    example: "Usuário não encontrado.",
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Erro no servidor ao alterar senha",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                    example: "Erro no servidor ao alterar senha.",
                  },
                },
              },
            },
          },
        },
      },
    },
  },  
  // END: User Configuration
  // BEGIN: Book Configuration
  "/books/create": {
    post: {
      summary: "Cria um novo livro",
      tags: ["Books"],
      security: [{ bearerAuth: [] }], 
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                author: {
                  type: "string",
                },
                publicationYear: {
                  type: "number",
                },
                category: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                imageURL: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
                userId: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Livro criado com sucesso",
        },
        400: {
          description: "Erros de validação no corpo da requisição",
        },
        404: {
          description: "Usuário não encontrado",
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },
  "/books/create-multiple": {
    "post": {
      "summary": "Cria novos livros",
      "tags": ["Books"],
      "security": [{ "bearerAuth": [] }],
      "requestBody": {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "books": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "title": {
                        "type": "string"
                      },
                      "author": {
                        "type": "string"
                      },
                      "publicationYear": {
                        "type": "number"
                      },
                      "category": {
                        "type": "string"
                      },
                      "description": {
                        "type": "string"
                      },
                      "imageURL": {
                        "type": "string"
                      },
                      "status": {
                        "type": "string"
                      }
                    },
                    "required": ["title", "author", "publicationYear", "category", "status"]
                  }
                },
                "isGoogle": {
                  "type": "boolean"
                },
                "userId": {
                  "type": "string"
                }
              },
              "required": ["books", "userId"]
            }
          }
        }
      },
      "responses": {
        "201": {
          "description": "Livros criados com sucesso"
        },
        "400": {
          "description": "Erros de validação no corpo da requisição"
        },
        "404": {
          "description": "Usuário não encontrado"
        },
        "500": {
          "description": "Erro interno do servidor"
        }
      }
    }
  },  
  "/books": {
    get: {
      summary: "Retorna todos os livros de um usuário",
      tags: ["Books"],
      security: [{ bearerAuth: [] }], 
      parameters: [
        {
          in: "query",
          name: "userId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Lista de livros do usuário paginada",
        },
        400: {
          description: "ID do usuário é obrigatório",
        },
        404: {
          description: "Usuário não encontrado",
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },
  "/books/{id}": {
    get: {
      summary: "Retorna um livro pelo ID",
      tags: ["Books"],
      security: [{ bearerAuth: [] }], 
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Livro encontrado",
        },
        404: {
          description: "Livro não encontrado",
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },
  "/books/categories": {
    get: {
      summary: "Retorna a lista de categorias de livros",
      tags: ["Books"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Lista de categorias de livros",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  categories: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },
  "/books/status": {
    get: {
      summary: "Retorna a lista de status de livros",
      tags: ["Books"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Lista de status de livros",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "array",
                    items: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },
  "/{userId}/books/{bookId}": {
    put: {
      summary: "Atualiza um livro pelo ID",
      tags: ["Books"],
      security: [{ bearerAuth: [] }], 
      parameters: [
        {
          in: "path",
          name: "userId",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          in: "path",
          name: "bookId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                author: {
                  type: "string",
                },
                publicationYear: {
                  type: "number",
                },
                category: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                imageURL: {
                  type: "string",
                },
                status: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Livro atualizado com sucesso",
        },
        400: {
          description: "Erros de validação no corpo da requisição",
        },
        404: {
          description: "Livro não encontrado",
        },
        401: {
          description: "Não autorizado a atualizar este livro",
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
    delete: {
      summary: "Deleta um livro pelo ID",
      tags: ["Books"],
      security: [{ bearerAuth: [] }], 
      parameters: [
        {
          in: "path",
          name: "userId",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          in: "path",
          name: "bookId",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Livro deletado com sucesso",
        },
        404: {
          description: "Livro não encontrado",
        },
        401: {
          description: "Não autorizado a deletar este livro",
        },
        500: {
          description: "Erro interno do servidor",
        },
      },
    },
  },
  // END: Book Configuration
};

export { swaggerDefinition };
