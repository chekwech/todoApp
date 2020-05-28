import React, { Component } from 'react';
import { TodoBanner } from "./TodoBanner";
import { TodoCreater } from "./TodoCreater";
import { TodoRow } from "./TodoRow";
import { VisibilityControl } from "./VisibilityControl";

export default class App extends Component {

constructor(props) {
    super(props);
    this.state = {
      userName: "Emma",
      todoItems: [{action: "Read React", done: false },
                  {action: "Call LF", done: false},
                  {action: "Go for a walk", done: false },
                  {action: "Watch a tutorial", done: false}],
                  showCompleted: true
    }
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value});
  }

  createNewTodo = (task) => {
    if (!this.state.todoItems.find(item => item.action === task)) {
                this.setState({
                     todoItems: [...this.state.todoItems,
                    {action: task, done: false }]
                     }, () => localStorage.setItem("todos", JSON.stringify(this.state)));
              }
  }
  toggleTodo =(todo) => this.setState({todoItems:
  this.state.todoItems.map(item => item.action ===todo.action
    ? { ...item, done: !item.done } : item )});

    todoTableRows = (doneValue) => this.state.todoItems
    .filter(item => item.done === doneValue).map(item =>
      <TodoRow key={ item.action } item={ item } callback={ this.toggleTodo } />)
    
      
      componentDidMount = () => {
        let data = localStorage.getItem("todos");
        this.setState(data != null
          ? JSON.parse(data)
          : {
            userName: "Emma",
            todoItems: [{action: "Read React", done: false },
                        {action: "Call LF", done: false},
                        {action: "Go for a walk", done: false },
                        {action: "Watch a tutorial", done: false}],
              showCompleted: true
          });
      }
  
  render = () =>
      <div>
        <TodoBanner name={ this.state.userName } tasks={this.state.todoItems } />
        <div className="container-fluid">
        <TodoCreater callback={ this.createNewTodo } />
        <table className="table table-striped table-bordered">
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
          <tbody>{this.todoTableRows(false) }</tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl description="Completed Tasks"
          isChecked={this.state.showCompleted}
          callback={ (checked) =>
          this.setState({ showCompleted: checked })} />
        </div>

        { this.state.showCompleted &&
        <table className="table table-striped table-bordered">
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
            </thead>
            <tbody>{ this.todoTableRows(true) }</tbody>
            </table>
            }
      </div>
      </div>
}
