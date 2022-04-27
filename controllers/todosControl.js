const Todos = require('../models/todosModel')

const { getPostData } = require('../utils/utils')

const getTodos = async (req, res) => {
  try {
    const todos = await Todos.findAll()
    
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(JSON.stringify(todos))
  } catch (error) {
    throw new Error(error.message)
  }
}

const getTodo = async (req, res, id) => {
  try {
    const todo = await Todos.find(id)

    if (!todo) {
      res.writeHead(404, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: `Can't find any todo by this id` }))
    } else {
      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end(JSON.stringify(todo))
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const createTodo = async (req, res) => {
  try {
    const body = await getPostData(req)
    const { label } = JSON.parse(body)

    const newTodo = await Todos.create(label)

    res.writeHead(201, { 'Content-type': 'application/json' })
    res.end(JSON.stringify(newTodo))
  } catch (error) {
    throw new Error(error.message)
  }
}

const updateTodo = async (req, res, id) => {
  try {
    const [todo] = await Todos.find(id)
    if (!todo) {
      res.writeHead(404, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: `Can't find any todo by this id` }))
    } else {
      const body = await getPostData(req)
      const { label, done } = JSON.parse(body)

      const updatedTodo = await Todos.update(id, { ...todo, label, done })

      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end(JSON.stringify(updatedTodo))
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteTodo = async (req, res, id) => {
  try {
    const [todo] = await Todos.find(id)
    if (!todo) {
      res.writeHead(404, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: `Can't find any todo by this id` }))
    } else {
      await Todos.remove(id)

      res.writeHead(200, { 'Content-type': 'application/json' })
      res.end(JSON.stringify({ message: 'Todo has been deleted' }))
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo
}
