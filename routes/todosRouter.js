const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require('../controllers/todosControl')

const todosRouter = async (req, res) => {
  try {
    if (req.url === '/todos' && req.method === 'GET') {
      await getTodos(req, res)
    } else if (req.url.match(/^\/todos\/([0-9]+)/) && req.method === 'GET') {
      const id = req.url.split('/').at(-1)

      await getTodo(req, res, id)
    } else if (req.url === '/todos' && req.method === 'POST') {
      await createTodo(req, res)
    } else if (req.url.match(/^\/todos\/([0-9]+)/) && req.method === 'PUT') {
      const id = req.url.split('/').at(-1)

      await updateTodo(req, res, id)
    } else if (req.url.match(/^\/todos\/([0-9]+)/) && req.method === 'DELETE') {
      const id = req.url.split('/').at(-1)

      await deleteTodo(req, res, id)
    } else {
      res.writeHead(404, { 'Content-type': 'application/json' })
      res.end(
        JSON.stringify({
          message: 'Route not found'
        })
      )
    }
  } catch (error) {
    res.writeHead(500, { 'Content-type': 'application/json' })
    res.end(
      JSON.stringify({
        message: `An error occupied on a server side: ${error.message}`
      })
    )
  }
}

module.exports = todosRouter
