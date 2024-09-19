import z from 'zod'
import type { FastifyInstance } from 'fastify'
import Auth from '../../middleware/auth'

export async function SetPontoEntrada(app: FastifyInstance) {
  await Auth(app)

  app.post('/funcionario/:id/entrada', async (request, reply) => {
    const PontoEntradaParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = PontoEntradaParamsSchema.parse(request.params)
  })
}
