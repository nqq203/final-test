import React, { memo } from 'react'
import Todo from './Todo'

const TodoList = memo(props => {
    const { listTodos, clearTask,  numOfTodosLeft, numOfTodos, status } = props
    return (
        <section className="main">
            <ul className="todo-list">
                {
                    listTodos.map((todo, index) => <Todo index={index} key={todo.id} todo={todo} {...props} />)
                }
            </ul>
            {
                status ==="COMPLETED" && numOfTodosLeft < numOfTodos && <button className="clear-task" onClick={clearTask}>Delete all</button>
            }
        </section>
    )
})

export default TodoList