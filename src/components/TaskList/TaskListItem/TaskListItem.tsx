// Core
import React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';

// Interfaces
import {ITask} from "../../../bus/tasks/interface";

// Actions
import {asyncDeleteTask} from "../../../bus/tasks/reducer";

// Styles
import styles from './TaskListItem.module.css';

const TaskListItem: React.FC<ITask> = ({id, name, price}) => {
  const dispatch = useDispatch();
  const history = useHistory<History>();

  const onEditHandler = () => {
    history.push(`/services/${id}`);
  }

  const onDeleteHandler = () => {
    dispatch(asyncDeleteTask(id));
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
