import { all } from 'redux-saga/effects';
import { addUser, removeUser } from './userSaga';

export default function* rootSaga() {
  yield all([addUser(), removeUser()]);
}
