// Core
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

//Actions
import {asyncFetchData} from "../../bus/tasks/reducer";

// Interfaces
import {ITask} from "../../bus/tasks/interface";

// Types
import {RootState} from "../../store";

// Components
import EmptyTasks from "./EmptyTasks/EmptyTasks";
import TaskListItem from "./TaskListItem/TaskListItem";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const TaskList: React.FC = () => {
  const tasks = useSelector((store: RootState) => store.tasks.tasks);
  const loader = useSelector((store: RootState) => store.tasks.loader);
  const error = useSelector((store: RootState) => store.tasks.error);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncFetchData());
  }, []);

  const taskList = tasks.map((task: ITask) =>
    <TaskListItem
      key={task.id}
      id={task.id}
      name={task.name}
      price={task.price}
    />);

  return (
    <>
      {loader && <Loader/>}
      {error.status && !loader && <ErrorMessage message={error.message}/>}
      {tasks.length > 0 && taskList}
      {!loader && !tasks.length && !error.status && <EmptyTasks/>}
    </>
  );
}

export default TaskList;
