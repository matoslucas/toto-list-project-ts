import React, { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { TaskContext } from "../contexts/TaskContext";
import styled from "styled-components";
import { colors } from "@material-ui/core";

const StyledAppBar = withStyles({
  root: {
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
  },
})(AppBar);

const NavbarComponent = () => {
  const { state } = useContext(TaskContext);
  return (
    <StyledAppBar position="static">
      <Toolbar variant="dense" style={{ justifyContent: "center" }}>
        <Typography variant="h6" color="inherit">
          React Todo List ({state.tasks.length})
        </Typography>
      </Toolbar>
    </StyledAppBar>
  );
};
export default NavbarComponent;
