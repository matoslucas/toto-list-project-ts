import React, { useEffect, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import AddTaskComponent from "./AddTaskComponent";
import TaskListComponent from "./TasksListComponent";
import { TaskContext } from "../contexts/TaskContext";
import { Types } from "../reducers/TaskReducer";

import Services from "../api/services";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: "#f5f5f5",
  },
}));

const TodoListComponent = () => {
  const classes = useStyles();

  const { dispatch } = useContext(TaskContext);
  useEffect(() => {
    Services.getTasks().then((res) => {
      dispatch({
        type: Types.LOAD_TASKS,
        payload: res.data,
      });
    });
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AddTaskComponent></AddTaskComponent>
        </Grid>
        <Grid item xs={12}>
          <TaskListComponent></TaskListComponent>
        </Grid>
      </Grid>
    </div>
  );
};

export default TodoListComponent;
