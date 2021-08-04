// Reducers
import taskReducer from './tasks/reducer';
import formReducer from './form/reducer';
import loaderReducer from './loader/reducer';
import errorReducer from './error/reducer'

export const rootReducer = {
  tasks: taskReducer,
  form: formReducer,
  loader: loaderReducer,
  error: errorReducer
}
