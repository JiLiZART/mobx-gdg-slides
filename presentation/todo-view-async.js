import { 
    observable, 
    computed, 
    action, 
    autorun 
} from 'mobx';
import React, { Component } from 'react';
import { observer } from 'mobx-react';

class ObservableTodoStore {
    @observable todos = [];
    @observable pendingRequests = 0;

    @computed get report() {
        if (this.todos.length === 0) {
            return "<none>";
        }

        const task = this.todos[0].task;
        const progress = Number(this.completedCount/this.todos.length).toFixed(2);

        return `Next: "${task}". Progress: ${progress}`;
    }

    constructor() {
        autorun(
            () => console.log(this.report)
        );
    }

    @computed get completedCount() {
        return this.todos.filter(
            todo => todo.completed === true
        ).length;
    }

    @action addTodo(text) {
        this.todos.push({
            task: text,
            completed: false,
            assignee: null
        });
    }
}

const store = new ObservableTodoStore();

store.addTodo("hello MobX");

store.addTodo("try MobX");

store.todos[0].completed = true;

store.todos[1].task = "try MobX in own project";

store.todos[0].task = "MobX forever";

@observer
class TodoList extends Component {
  render() {
    const { store } = this.props;

    return (
      <div>
        { store.report }
        <ul>
        { store.todos.map(
          (todo, idx) => 
            <TodoView 
                todo={ todo } 
                key={ idx } />
        ) }
        </ul>
        { store.pendingRequests > 0 
            ? <div><b>Loading...</b></div>
            : null }
        <button 
            onClick={ this.onNewTodo }
            >Add</button>
        <small>(dblclick to edit)</small>
      </div>
    );
  }

  onNewTodo = () => {
    const { store } = this.props;
    store.addTodo(prompt('Title:', 'buy bread'));
  }
}

@observer
class TodoView extends Component {
  render() {
    const { todo } = this.props;

    return (
      <li 
        onDoubleClick={ this.onRename }>
        <input
          type='checkbox'
          checked={ todo.completed }
          onChange={ this.onToggleCompleted }
        />
        { todo.task }
        { todo.assignee
          ? <small>{ todo.assignee.name }</small>
          : null
        }
      </li>
    );
  }

  onToggleCompleted = () => {
    const { todo } = this.props;

    todo.completed = !todo.completed;
  }

  onRename = () => {
    const { todo } = this.props;

    todo.task = prompt('Name', todo.task) || todo.task;
  }
}

store.todos[0].completed = !store.todos[0].completed;
store.todos[1].task = "Random todo " + Math.random();
store.todos.push({ task: "Find a fine cheese", completed: true });

setInterval(() => {
  if (store.pendingRequests > 0) {
    store.pendingRequests = 0;
  } else {
    store.pendingRequests = 1;
  }
}, 2000);

export default () => <TodoList store={ store } />;
