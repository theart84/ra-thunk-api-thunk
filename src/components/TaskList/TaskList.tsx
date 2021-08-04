// Core
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

//Actions
import {fetchTasks} from "../../bus/tasks/reducer";
import {changeStatusLoader} from "../../bus/loader/reducer";

// Interfaces
import {ITask} from "../../bus/tasks/interface";

// Types
import {RootState} from "../../store";

// Components
import EmptyTasks from "./EmptyTasks/EmptyTasks";
import TaskListItem from "./TaskListItem/TaskListItem";
import {setError} from "../../bus/error/reducer";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const TaskList: React.FC = () => {
  const tasks = useSelector((store: RootState) => store.tasks.tasks);
  const loader = useSelector((store: RootState) => store.loader.loader);
  const error = useSelector((store: RootState) => store.error);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      dispatch(changeStatusLoader(true))
      dispatch(setError({message: '', status: false}))
      try {
        const response = await fetch('http://localhost:7070/api/services');
        if (!response.ok) {
          throw new Error('Что-то поломалось!');
        }
        const tasks = await response.json();
        dispatch(fetchTasks(tasks));
        dispatch(changeStatusLoader(false));
      } catch (error) {
        dispatch(changeStatusLoader(false));
        dispatch(setError({message: error.message, status: true}))
      }
    }
    fetchData();
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
