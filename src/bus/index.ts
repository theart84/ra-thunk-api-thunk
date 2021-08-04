// Reducers
import taskReducer from './tasks/reducer';
import formReducer from './form/reducer';

export const rootReducer = {
  tasks: taskReducer,
  form: formReducer,
}
