import { z } from 'zod'
import { prisma } from '../../lib/prisma'
import type { FastifyInstance } from 'fastify'

export async function Login(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    const LoginBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })

    const { email, password } = LoginBodySchema.parse(request.body)

    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
        senha: password,
      },
    })

    if (!usuario) {
      reply.code(401).send({
        message: 'E-mail ou senha inválida!',
        code: 401,
      })
    }

    const secondsToExpire = 60 * 60 * 5

    const token = app.jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      { expiresIn: secondsToExpire }
    )

    reply
      .setCookie('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: true,
      })
      .send({ token })
      .code(200)
  })
}
