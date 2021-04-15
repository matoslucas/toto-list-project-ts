import axios from "axios";

import { TaskType } from "../types";

class Services {
  apiurl: string = "";

  constructor() {
    this.apiurl = process.env.REACT_APP_API_URL
      ? process.env.REACT_APP_API_URL
      : "http://localhost:8080";
  }

  postTask = (task: TaskType) => {
    return axios.post(`${this.apiurl}/api/taskModel`, task);
  };

  getTasks = () => {
    return axios.get(`${this.apiurl}/api/taskModel`);
  };

  updateTask = (id: string, task: TaskType) => {
    return axios.patch(`${this.apiurl}/api/taskModel/${id}`, task);
  };

  deleteTask = (id: string) => {
    return axios.delete(`${this.apiurl}/api/taskModel/${id}`);
  };
}

export default new Services();
