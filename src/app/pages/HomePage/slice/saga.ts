import { call, put, takeLatest } from 'redux-saga/effects';
import { todoActions } from './index';
import { api } from './api';
import { PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './types';

function* fetchTodosSaga() {
  try {
    const todos: Todo[] = yield call(api.fetchTodos);
    yield put(todoActions.fetchTodosSuccess(todos));
  } catch (error) {
    yield put(todoActions.fetchTodosFailure());
  }
}

function* addTodoSaga(action: PayloadAction<Todo>) {
  try {
    const todo: Todo = yield call(api.addTodo, action.payload);
    yield put(todoActions.addTodo(todo));
  } catch (error) {
    console.error(error);
  }
}

function* deleteTodoSaga(action: PayloadAction<number>) {
  try {
    const id: number = yield call(api.deleteTodo, action.payload);
    yield put(todoActions.deleteTodo(id));
  } catch (error) {
    console.error(error);
  }
}

function* editTodoSaga(action: PayloadAction<Todo>) {
  try {
    const todo: Todo = yield call(api.editTodo, action.payload);
    yield put(todoActions.editTodo(todo));
  } catch (error) {
    console.error(error);
  }
}

export function* todoSaga() {
  yield takeLatest(todoActions.fetchTodos.type, fetchTodosSaga);
  yield takeLatest(todoActions.addTodo.type, addTodoSaga);
  yield takeLatest(todoActions.deleteTodo.type, deleteTodoSaga);
  yield takeLatest(todoActions.editTodo.type, editTodoSaga);
}
