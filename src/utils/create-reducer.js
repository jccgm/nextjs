import { combineReducers } from 'redux';
import settings from '@redux/reducers/settings';
import commonData from '@redux/reducers/common';
import auth from '@redux/reducers/auth';
import statistics from '@redux/reducers/statistics';
import global from '@redux/reducers/global';


export default function createReducer(asyncReducers) {
  return combineReducers({
    auth,
    settings,
    commonData,
    global,
    ...asyncReducers,
  });
}
