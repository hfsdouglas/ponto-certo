import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'

import { Login } from './routes/login'
import { SetPontoEntrada } from './routes/entrada'

const app = fastify()

app.register(jwt, {
  secret: '@jwt-ponto-certo-secret',
})

app.register(cookie, {
  secret: '@cookie-ponto-certo-secret',
})

app.register(cors, {
  origin: '*',
})

app.register(Login)
app.register(SetPontoEntrada)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Servidor está rodando na porta 3333!')
  })
