import fastify from 'fastify'
import jwt from '@fastify/jwt'
import cookie from '@fastify/cookie'

import { Login } from './routes/login-route'
import { SetPontoEntrada } from './routes/set-ponto-entrada-route'
import { AuthLogin } from '../middlewares/auth'

const app = fastify()

app.register(jwt, {
  secret: '@jwt-ponto-certo-secret',
})

app.register(cookie, {
  secret: '@cookie-ponto-certo-secret',
})

app.register(AuthLogin)
app.register(Login)
app.register(SetPontoEntrada)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('Servidor está rodando na porta 3333!')
  })
