import React, { PureComponent } from 'react';
import TodoList from './components/TodoList'
import Body from './components/Body'
import FeatureBar from './components/FeatureBar'

import './App.css'

const filterByStatus = (listTodos = [], status = '', id) => {
  switch (status) {
    case 'ACTIVE':
      return listTodos.filter(item => !item.isCompleted)
    case 'COMPLETED':
      return listTodos.filter(item => item.isCompleted)
    case 'REMOVE':
      return listTodos.filter(item => item.id !== id)
    default:
      return listTodos
  }
}

const filterTodosLeft = (listTodos = []) => {
  return listTodos.filter(item => !item.isCompleted) 
}

class App extends PureComponent {
  state = {
    listTodos: [],
    isCheckedAll: false,
    status: 'ALL',
    todoEditingId: ''
  }

  addTodos = (todo = {}) => {
    this.setState(preState => ({
      listTodos: [...preState.listTodos, todo]
    }))
  }

  markCompleted = (id = '') => {
    const { listTodos } = this.state
    let isCheckedAll = true
    const updatedListTodos = listTodos.map(item => {
      if ((!item.isCompleted && item.id !== id) || (item.isCompleted && item.id === id)) {
        isCheckedAll = false
      }
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item
    })
    this.setState({
      isCheckedAll,
      listTodos: updatedListTodos
    })
  }

  checkAll = () => {
    const { listTodos, isCheckedAll } = this.state
    const updatedListTodos = listTodos.map(item => ({ ...item, isCompleted: !isCheckedAll }))
    this.setState(preState => ({
      isCheckedAll: !preState.isCheckedAll,
      listTodos: updatedListTodos
    }))
  }

  clearTask = () => {
    this.setState(preState => ({
      listTodos: filterTodosLeft(preState.listTodos, 'REMOVE')
    }))
  }

  getEditTodo = (id = '') => {
    this.setState({
      todoEditingId: id
    })
  }

  editTodo = (todo, index) => {
    const { listTodos } = this.state
    listTodos.splice(index, 1, todo)
    this.setState({ listTodos })
  }

  removeTodo = (id = '') => {
    this.setState(prevState => ({
      listTodos: filterByStatus(prevState.listTodos, 'REMOVE', id)
    }))
  }

  render() {
    const { listTodos, status, todoEditingId } = this.state
    return (
      <div className="todoapp">
        <FeatureBar
          activeButton={status}
          setStatusFilter={(status) => this.setState({ status })}
        />
        <Body
          addTodo={this.addTodos}
          status={status}
        />
        <TodoList
          listTodos={filterByStatus(listTodos, status)}
          markCompleted={this.markCompleted}
          clearTask={this.clearTask}
          numOfTodosLeft={filterTodosLeft(listTodos).length}
          numOfTodos={listTodos.length}
          status={status}
          todoEditingId={todoEditingId}
          getEditTodo={this.getEditTodo}
          editTodo={this.editTodo}
          removeTodo={this.removeTodo}
        />
        
      </div>
    );

  }
}

export default App;
