import type { FastifyInstance } from 'fastify'

export async function AuthLogin(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    const token = request.cookies.token

    console.log(token)

    if (!token) {
      reply.code(401).send({
        message: 'Sem token!',
        code: 401,
      })
    }

    try {
      const decoded = app.jwt.verify(token)
      request.user = decoded
    } catch (error) {
      reply.status(401).send({ message: 'Token inválido!', code: 401 })
    }
  })
}
