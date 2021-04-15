import React, { useContext, useState, FormEvent } from "react";

import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { TaskContext } from "../contexts/TaskContext";
import { Types } from "../reducers/TaskReducer";
import { TaskType } from "../types";
import { v4 as uuidv4 } from "uuid";

const AddTaskComponent = () => {
  const { dispatch } = useContext(TaskContext);
  const [description, setDescription] = useState("");

  const onAddTask = (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    let task: TaskType = {
      id: uuidv4(),
      isChecked: false,
      created: new Date(),
      description: description,
    };

    dispatch({
      type: Types.ADD_TASK,
      payload: task,
    });
    setDescription("");
  };
  return (
    <form onSubmit={onAddTask}>
      <Grid container direction="row" justify="center" alignItems="center">
        <TextField
          label="Add Task"
          variant="outlined"
          size="small"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Grid>
    </form>
  );
};

export default AddTaskComponent;
