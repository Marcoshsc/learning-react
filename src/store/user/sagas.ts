import { AnyAction } from 'redux'
import { call, put, takeLatest } from 'redux-saga/effects'
import { addUser, deleteUser, editUser, getUsers } from '../../services/userServices'
import { addUserSuccess, deleteUserSuccess, editUserSuccess, setUsers } from './actions'
import { User, UserActions } from './types'

export default function* userSagas() {
  yield takeLatest(UserActions.FETCH_USERS, fetchUserSaga)
  yield takeLatest(UserActions.ADD_USER, addUserSaga)
  yield takeLatest(UserActions.EDIT_USER, editUserSaga)
  yield takeLatest(UserActions.DELETE_USER, deleteUserSaga)
}

function* fetchUserSaga() {

  try {
    const users: User[] = yield call(getUsers)

    yield put(setUsers(users))

  } catch(err) {
    console.error(err)
  }

}

function* addUserSaga(action: AnyAction) {

  try {
    const user: User = action.payload.user

    const newUser = yield call(addUser, user)
  
    yield put(addUserSuccess(newUser))
  } catch(err) {
    console.error(err)
  }
  
}

function* editUserSaga(action: AnyAction) {

  try {
    const user: User = action.payload.user
    const newUser: User = yield call(editUser, user.id as number, user)

    yield put(editUserSuccess(newUser))
  
  } catch(err) {
    console.error(err)
  }
}

function* deleteUserSaga(action: AnyAction) {

  try {
    const id = action.payload.id

    yield call(deleteUser, id)

    yield put(deleteUserSuccess(id))
  
  } catch(err) {
    console.error(err)
  }
}