const todos = require('../data/todos.json')
const { writeDataToFile } = require('../utils/utils')

const { generateId } = require('../utils/helpers')

const findAll = async () => {
  return new Promise((resolve, reject) => {
    resolve(todos)
  })
}

const find = async (id) => {
  return new Promise((resolve, reject) => {
    const todo = todos.find((todo) => todo.id === +id)

    resolve(todos)
  })
}

const create = async (label) => {
  return new Promise((resolve, reject) => {
    const newTodo = {
      id: generateId(todos),
      label,
      done: false
    }

    todos.push(newTodo)
    writeDataToFile('./data/todos.json', todos)

    resolve(newTodo)
  })
}

const update = async (id, updatedTodo) => {
  return new Promise((resolve, reject) => {
    const todoId = +id
    const idx = todos.findIndex((todo) => todo.id === todoId)
    todos[idx] = { ...updatedTodo, id: todoId }

    writeDataToFile('./data/todos.json', todos)

    resolve(todos[idx])
  })
}

const remove = async (id) => {
  return new Promise((resolve, reject) => {
    const idx = todos.findIndex((todo) => todo.id === +id)
    todos.splice(idx, 1)

    writeDataToFile('./data/todos.json', todos)

    resolve()
  })
}

module.exports = {
  findAll,
  find,
  create,
  update,
  remove
}
