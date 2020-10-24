import React, {useState} from "react";

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("");

    function handleChange (e){
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
      }

    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input id={props.id} className="todo-text" type="text" onChange={handleChange} data-testid="edit-input"/>
          </div>
          <div className="btn-group">
            <button type="button" className="btn todo-cancel" onClick={()=>setEditing(false)}>
              Cancel
              <span className="visually-hidden">renaming {props.name}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit" >
              Save
              <span className="visually-hidden">new name for {props.name}</span>
            </button>
          </div>
        </form>
      );

    const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
              {/* <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)}
              /> */}
              <div style={{display: 'flex', margin: '1rem'}}>
                  <input type="radio" id={props.id} name={ `status${props.id}` } checked = {props.status=== 0} value="0" onChange={() => props.toggleTaskCompleted(props.id, 0)}/>
                  <label for="male">Not Started</label><br></br>
                  <input type="radio" id={props.id} name={ `status${props.id}` } checked = {props.status === 1}value="1" onChange={() => props.toggleTaskCompleted(props.id, 1)}/>
                  <label for="female">Started</label>
                  <input type="radio" id={props.id} name={ `status${props.id}` } checked ={props.status === 2} value="2" onChange={() => props.toggleTaskCompleted(props.id, 2)}/>
                  <label for="other">Completed</label>
              </div>

              <label className="todo-label" htmlFor={props.id} >
                {props.name}
              </label>
            </div>
            <div className="btn-group">
              <button type="button" className="btn" onClick={() => setEditing(true)} data-testid="edit-button">
                Edit <span className="visually-hidden">{props.name}</span>
              </button>
              <button
                type="button"
                className="btn btn__danger"
                onClick={() => props.deleteTask(props.id)}
              >
                Delete <span className="visually-hidden">{props.name}</span>
              </button>
            </div>
        </div>
      );
    
      // console.log(isEditing + 'is editing');
      
      return(
        <li data-testid="isEditing">{isEditing ? editingTemplate : viewTemplate}</li>
      )
    
  }