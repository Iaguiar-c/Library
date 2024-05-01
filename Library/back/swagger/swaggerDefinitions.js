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
      summary: "Registra um novo usuário.",
      tags: ["User"],
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
                },
                password: {
                  type: "string",
                },
                confirmpassword: {
                  type: "string",
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
          description: "Erro de validação ou usuário já existente",
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
                },
                password: {
                  type: "string",
                },
                confirmpassword: {
                  type: "string",
                },
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
  // END: User Configuration
  // BEGIN: Senha Configuration
  "/password/forgot-password": {
    post: {
      summary: "Solicitação de recuperação de senha",
      description: "Envia um e-mail com um link para redefinir a senha.",
      tags: ["Senha"],
      security: [{ bearerAuth: [] }], 
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
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "E-mail de recuperação enviado com sucesso",
        },
        400: {
          description: "Usuário não encontrado ou erro ao enviar e-mail",
        },
      },
    },
  },
  "password/reset-password": {
    post: {
      summary: "Atualiza a senha com base no token",
      description:
        "Atualiza a senha do usuário com base no token de recuperação.",
      tags: ["Senha"],
      security: [{ bearerAuth: [] }], 
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                },
                newPassword: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Senha atualizada com sucesso",
        },
        400: {
          description: "Token inválido ou expirado",
        },
        404: {
          description: "Usuário não encontrado",
        },
      },
    },
  },
  // END: Senha Configuration
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

module.exports = {
  swaggerDefinition,
};
