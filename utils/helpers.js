const generateId = (todos) => {
  if (!todos.length) {
    return 1
  } else {
    return (
      [...todos]
        .sort((prevTodo, nextTodo) => +prevTodo.id - +nextTodo.id)
        .at(-1).id + 1
    )
  }
}

module.exports = {
  generateId
}
