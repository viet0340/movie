import { takeEvery } from 'redux-saga/effects';
import { ADD_USER, REMOVE_USER } from '../actions/actionTypes';

export function* addUser() {
  yield takeEvery(ADD_USER, () => {});
}

export function* removeUser() {
  yield takeEvery(REMOVE_USER, () => {});
}
