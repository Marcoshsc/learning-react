import { action } from "typesafe-actions"
import { User, UserActions } from "./types"

export const setUsers = (users: User[]) => action(UserActions.SET_USERS, { users })

export const addUserSuccess = (user: User) => action(UserActions.ADD_USER_SUCCESS, { user })

export const editUserSuccess = (user: User) => action(UserActions.EDIT_USER_SUCCESS, { user })

export const deleteUserSuccess = (id: number) => action(UserActions.DELETE_USER_SUCCESS, { id })

export const fetchUsers = () => action(UserActions.FETCH_USERS, {})

export const addUser = (user: User) => action(UserActions.ADD_USER, { user })

export const editUser = (user: User) => action(UserActions.EDIT_USER, { user })

export const deleteUser = (id: number) => action(UserActions.DELETE_USER, { id })