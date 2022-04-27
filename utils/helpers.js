const generateId = (todos) => {
  if (!todos.length) {
    return 1
  } else {
    return (
      [...todos]
        .sort((prevTodo, nextTodo) => {
          const substractionResult = +prevTodo.id - +nextTodo.id
          if (substractionResult < 0) {
            return -1
          } else if (substractionResult > 0) {
            return 1
          } else {
            return 0
          }
        })
        .at(-1).id + 1
    )
  }
}

module.exports = {
  generateId
}
