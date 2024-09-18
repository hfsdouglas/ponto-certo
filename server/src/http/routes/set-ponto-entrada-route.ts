import z from 'zod'
import type { FastifyInstance } from 'fastify'

export async function SetPontoEntrada(app: FastifyInstance) {
  app.post('/funcionario/:id/entrada', async (request, reply) => {
    if (!request.user) {
      reply.code(401).send({
        message: 'Acesso restrito!',
        code: 401,
      })
    }

    const PontoEntradaParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = PontoEntradaParamsSchema.parse(request.params)
  })
}
