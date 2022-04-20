import React from 'react'
import { useState } from "react";

function TaskEdit({ tasks, setTasks, task }) {
    let editTaskFormInitialState = {
        title: "",
        description: "",
        priority: 0,
        dueDate: "",
      };
    
      const [editTaskFormState, setEditTaskFormState] = useState(
        editTaskFormInitialState
      );
    
      const handleFormChange = (event) => {
        const { name, value } = event.target;
        setEditTaskFormState((editTaskFormState) => ({
          ...editTaskFormState,
          [name]: value,
        }));
      };
    
      let id = task.id;
    
      function handleEditTaskSubmit(event) {
        event.preventDefault();
    
        console.log(id);
        console.log(editTaskFormState);
        fetch(`/tasks/${id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/JSON",
            accept: "application/JSON",
          },
          body: JSON.stringify(editTaskFormState),
        })
          .then((r) => r.json())
          .then((task) => {
            let updatedTasks = tasks.map((t) => {
              if (t.id === task.id) {
                return task;
              } else {
                return t;
              }
            });
            setTasks(updatedTasks);
          });
      }
    


  return (
    <div>
    <form onSubmit={handleEditTaskSubmit}>
      <label> Task Title: </label>
      <input
        type="text"
        placeholder="Enter a new title"
        id="title-input"
        name="title"
        value={editTaskFormState.title}
        onChange={handleFormChange}
      />

      <label> Description: </label>
      <input
        type="text"
        placeholder="Enter a new description"
        id="description-input"
        name="description"
        value={editTaskFormState.content}
        onChange={handleFormChange}
      />

      <label> Priority: </label>
      <select
        name="priority"
        id="priority-input"
        value={editTaskFormState.priority}
        onChange={handleFormChange}
      >
        <option> 1 </option>
        <option> 2 </option>
        <option> 3 </option>
        <option> 4 </option>
        <option> 5 </option>
      </select>

      <label> Due Date: {task.due_date} </label>
      <input
        type="datetime-local"
        id="duedate-input"
        name="duedate"
        value={editTaskFormState.dueDate}
        onChange={handleFormChange}
      />

      <button className="rounded-full bg-yellow-200 m-2 p-1" type="submit">
        {" "}
        Submit Changes{" "}
      </button>
    </form>
  </div>
  )
}

export default TaskEdit