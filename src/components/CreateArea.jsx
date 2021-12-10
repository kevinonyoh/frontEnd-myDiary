import React from "react";

function CreateArea(props) {
  return (
    <div>
      <form onSubmit={props.submitElement}>
        <input onChange={props.valueChange} name="title" placeholder="Title" />
        <textarea
          onChange={props.valueChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
