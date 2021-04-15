import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CropFreeIcon from "@material-ui/icons/CropFree";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";

import { TaskContext } from "../contexts/TaskContext";
import { Types } from "../reducers/TaskReducer";
import { TaskType } from "../types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //backgroundColor: theme.palette.background.transparent,
  },
  marked: {
    textDecoration: "line-through",
  },
}));

const TaskListComponent = () => {
  const { state, dispatch } = useContext(TaskContext);

  const classes = useStyles();

  const onChecked = (id: string, isChecked: boolean) => {
    dispatch({
      type: Types.CHECK_TASK,
      payload: {
        id,
        isChecked,
      },
    });
  };
  return (
    <List className={classes.root}>
      {state.tasks.map((task: TaskType) => {
        return (
          <ListItem
            key={task.id}
            role={undefined}
            dense
            button
            onClick={() => {
              onChecked(task.id, !task.isChecked);
            }}
          >
            <IconButton color="primary">
              {!task.isChecked ? <CropFreeIcon /> : <LibraryAddCheckIcon />}
            </IconButton>
            <ListItemText
              primary={task.description}
              className={task.isChecked ? classes.marked : ""}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="comments"
                onClick={() => {
                  dispatch({
                    type: Types.REMOVE_TASK,
                    payload: { id: task.id },
                  });
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default TaskListComponent;
