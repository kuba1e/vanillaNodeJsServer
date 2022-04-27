const http = require('http')

const todosRouter = require('./routes/todosRouter')

const PORT = process.env.PORT || 3000

const server = http.createServer(todosRouter)

server.listen(PORT, () => {
  console.log('server has been started')
})
