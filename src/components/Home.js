import React, { useState, useEffect } from "react";

import Todo from './Todo';
import Form from './Form';
import FilterButton from './FIlterButton'
import {nanoid} from 'nanoid';
import { cleanup } from "@testing-library/react";

const FILTER_MAP = {
  All: () => true,
  NotStarted: task => task.status === 0,
  Started : task => task.status === 1,
  Completed: task => task.status === 2
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

// const DATA = [
//     { id: "todo-0", name: "Eat", completed: true },
//     { id: "todo-1", name: "Sleep", completed: false },
//     { id: "todo-2", name: "Repeat", completed: false }
//   ];

const DATA = [
    { id: "todo-0", name: "Eat", status: 1 },
    { id: "todo-1", name: "Sleep", status: 2 },
    { id: "todo-2", name: "Repeat", status: 1 }
]

function Home(props) {
  // const [tasks, setTasks] = useState(props.tasks);
  const [tasks, setTasks] = useState(DATA);
  const [filter, setFilter] = useState('All');

  
  useEffect(()=>{
      const data = JSON.parse(localStorage.getItem('allTasks'));
      if (data) {
          setTasks(data);
        }
    }, [])
                          useEffect(()=>{
                            localStorage.setItem('allTasks', JSON.stringify(tasks))
                          })
  
  // useEffect(()=>{
  //   localStorage.setItem('allTasks', JSON.stringify(tasks))
  // })

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false};
    setTasks([...tasks, newTask]);
    
  }
    
  

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }


  function toggleTaskStatus(id, statusValue) {
    const updatedTasks = tasks.map(task => {
        // if this task has the same ID as the edited task
        if (id === task.id) {
          // use object spread to make a new object
          // whose `completed` prop has been inverted
          return {...task, status: statusValue}
        }
        return task;
      });
      setTasks(updatedTasks);
  }


  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  function clearAll () {
    localStorage.clear();
    setTasks([]);
  }

  // const taskList = tasks.map(task => (
  //   <Todo
  //       id={task.id}
  //       name={task.name}
  //       completed={task.completed}
  //       key={task.id}
  //       toggleTaskCompleted = {toggleTaskCompleted}
  //       deleteTask= {deleteTask}
  //       editTask={editTask}
  //     />
  //   )
  // );




const taskList = tasks.filter(task => FILTER_MAP[filter](task)).map(task => (
    <Todo
      id={task.id}
      name={task.name}
      status={task.status}
      key={task.id}
      toggleTaskCompleted={toggleTaskStatus}
      deleteTask={deleteTask}
      editTask={editTask}
    />
));

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
       {filterList}
       <button onClick={clearAll}>Clear Tasks</button>
       
      </div>
      <h2 id="list-heading">
        {tasks.length} tasks remaining 
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
       {/* <Todo name="Eat" completed={true} id="todo-0"/>
       <Todo name="Sleep" completed={false} id="todo-1"/>
       <Todo name="Repeat" completed={false} id="todo-2"/> */}
        {taskList}
       
      </ul>
    </div>
  );

}
export default Home;
