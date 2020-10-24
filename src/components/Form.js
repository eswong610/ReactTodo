import React, { useState } from "react";




function Form(props) {
    const [name, setName] = useState('');

    

    function handleSubmit(e) {
        e.preventDefault();
        props.addTask(name);
        setName("");
      }
    function handleChange(e) {
        setName(e.target.value);
    }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg" data-testid="form-label">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        data-testid='form-input'
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
        
      />
      <button type="submit" className="btn btn__primary btn__lg" data-testid="form-submit">
        Add
      </button>
    </form>
  );
}

export default Form;