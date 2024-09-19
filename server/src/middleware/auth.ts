import type { FastifyInstance } from 'fastify'

export default function Auth(app: FastifyInstance) {
  app.addHook('preHandler', async (request, reply) => {
    const token = request.cookies.token

    if (!token) {
      reply.code(401).send({
        message: 'Token não fornecido!',
        code: 401,
      })
    }

    try {
      const decoded = app.jwt.verify(token)
      request.user = decoded
    } catch (error) {
      reply.code(401).send({
        message: 'Token inválido!',
        code: 401,
      })
    }
  })
}
