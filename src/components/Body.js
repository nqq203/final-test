import React, { memo, useState } from 'react'

const Body = memo((props) => {
    const [text, setText] = useState('')
    const { addTodo, status } = props

    const onAddTodo = (event) => {
        if (event.key === 'Enter' && text) {
            addTodo({
                id: new Date().valueOf(),
                text,
                isCompleted: false
            })
            setText('')
        }
    }

    const onClickAddTodo = () => {
        if (text) {
            addTodo({
                id: new Date().valueOf(),
                text,
                isCompleted: false
            })
            setText('')
        }
    }

    return (
        <body className="body">
            <h1>#todo</h1>
            {
                status !== "COMPLETED" &&
                <div className="add-bar">
                    <input
                        className="new-todo"
                        placeholder="add details"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={onAddTodo}
                    />
                    <button className="add-details"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onClick={onClickAddTodo}>
                        Add
                    </button>
                </div>
            }
        </body>

    )
})

export default Body