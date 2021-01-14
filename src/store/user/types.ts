export interface UserState {
  users: User[]
}

export interface User {
  id?: number
  name: string
  username: string
  email: string
}

export enum UserActions {

  SET_USERS = '@user/SET_USERS',
  ADD_USER_SUCCESS = '@user/ADD_USER_SUCCESS',
  EDIT_USER_SUCCESS = '@user/EDIT_USER_SUCCESS',
  DELETE_USER_SUCCESS = '@user/DELETE_USER_SUCCESS',

  FETCH_USERS = '@user/FETCH_USERS',
  ADD_USER = '@user/ADD_USER',
  EDIT_USER = '@user/EDIT_USER',
  DELETE_USER = '@user/DELETE_USER'

}