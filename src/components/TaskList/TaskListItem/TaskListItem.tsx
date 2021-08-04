// Core
import React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';

// Interfaces
import {ITask} from "../../../bus/tasks/interface";
import {Dispatch} from "@reduxjs/toolkit";

// Actions
import {changeStatusLoader} from "../../../bus/loader/reducer";
import {setError} from "../../../bus/error/reducer";
import {deleteTask} from "../../../bus/tasks/reducer";

// Styles
import styles from './TaskListItem.module.css';

const TaskListItem: React.FC<ITask> = ({id, name, price}) => {
  const dispatch = useDispatch<Dispatch>();
  const history = useHistory<History>();

  const onEditHandler = () => {
    history.push(`/services/${id}`);
  }

  const onDeleteHandler = () => {
    const fetchData = async () => {
      dispatch(changeStatusLoader(true));
      dispatch(setError({message: '', status: false}));
      try {
        const response = await fetch(`http://localhost:7070/api/services/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Что-то поломалось!');
        }
        dispatch(deleteTask({id}));
        dispatch(changeStatusLoader(false));
      } catch (error) {
        dispatch(changeStatusLoader(false));
        dispatch(setError({message: error.message, status: true}));
      }
    }
    fetchData();
  }
  return (
    <div className="card mb-3" data-id={id}>
      <div className="card-body d-flex justify-content-between">
        <div className={styles.text}>{name}</div>
        <div className={styles.price}>{price}</div>
        <div className={styles.control}>
          <span className={styles.edit} onClick={onEditHandler}/>
          <span className={styles.delete} onClick={onDeleteHandler}/>
        </div>
      </div>
    </div>
  );
}

export default TaskListItem;
