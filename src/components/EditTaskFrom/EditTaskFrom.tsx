// Core
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from 'react-router-dom';

// Actions
import {changeValue, clearForm} from '../../bus/form/reducer';

// Types
import {RootState} from "../../store";
import {changeStatusLoader} from "../../bus/loader/reducer";
import {setError} from "../../bus/error/reducer";
import {ITask} from "../../bus/tasks/interface";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {Dispatch} from "@reduxjs/toolkit";

const EditTaskFrom: React.FC = () => {
  const {name, price, content} = useSelector((store: RootState) => store.form);
  const loader = useSelector((store: RootState) => store.loader.loader);
  const error = useSelector((store: RootState) => store.error);
  const dispatch = useDispatch<Dispatch>();
  const history = useHistory<History>();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(changeStatusLoader(true))
      dispatch(setError({message: '', status: false}))
      try {
        const response = await fetch(`http://localhost:7070/api/services/${params.id}`);
        if (!response.ok) {
          throw new Error('Что-то поломалось!');
        }
        const task: ITask = await response.json();
        Object.entries(task)
          .forEach(([key, value]) => {
            dispatch(changeValue({type: key, value: value.toString()}))
          })
        dispatch(changeStatusLoader(false));
      } catch (error) {
        dispatch(changeStatusLoader(false));
        dispatch(setError({message: error.message, status: true}))
      }
    }
    fetchData();
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    dispatch(changeValue({type: name, value}));
  }

  const onResetHandler = () => {
    dispatch(clearForm());
    history.goBack();
  }

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim().length || !price.trim().length || !content.trim().length) {
      return;
    }
    const convertPriceFromStrToNum = Number(price);
    if (isNaN(convertPriceFromStrToNum)) {
      return;
    }
    const payload = {
      id: params.id,
      name,
      price: convertPriceFromStrToNum,
      content
    }
    const fetchData = async () => {
      dispatch(changeStatusLoader(true))
      dispatch(setError({message: '', status: false}))
      try {
        const response = await fetch(`http://localhost:7070/api/services/${params.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error('Что-то поломалось!');
        }
        dispatch(changeStatusLoader(false));
        dispatch(clearForm());
        history.goBack();
      } catch (error) {
        dispatch(changeStatusLoader(false));
        dispatch(setError({message: error.message, status: true}))
      }
    }
    fetchData();
  }

  return (
    <>
      {loader && <Loader/>}
      {error.status && !loader && <ErrorMessage message={error.message}/>}
      {name && price && content && (
        <div className="card mb-5">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>
              <div className="mb-3">
                <label htmlFor="taskName" className="form-label">Название операции</label>
                <input
                  type="text"
                  className="form-control"
                  id="taskName"
                  name="name"
                  value={name}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">Стоимость</label>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  value={price}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">Название операции</label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  name="content"
                  value={content}
                  onChange={onChangeHandler}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{marginRight: 15}}>Save</button>
              <button type="reset" className="btn btn-danger" onClick={onResetHandler}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditTaskFrom;
