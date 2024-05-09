
@swagger
/users/{id}:
  get:
    summary: Retorna um usuário pelo ID
    tags: [Users]
    parameters:
      - in: path
        name: id
        required: true
        description: ID do usuário a ser retornado
        schema:
          type: integer
    responses:
      '200':
        description: Usuário encontrado
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/User'
      '404':
        description: Usuário não encontrado
 *
