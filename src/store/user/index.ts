import { Reducer } from "redux";
import { User, UserActions, UserState } from "./types";

const INITIAL_STATE: UserState = {
  users: []
}

const userReducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {

  switch(action.type) {

    case UserActions.SET_USERS: {
      const users: User[] = action.payload.users
      return { ...state, users: users }
    }
    case UserActions.ADD_USER_SUCCESS: {
      const user: User = action.payload.user
      return { ...state, users: [ user, ...state.users ] }
    }
    case UserActions.EDIT_USER_SUCCESS: {
      const user: User = action.payload.user
      const users = state.users
      const filteredUsers = users.filter(el => el.id !== user.id)
      return { ...state, users: [ ...filteredUsers, user ] }
    }
    case UserActions.DELETE_USER_SUCCESS: {
      const id: number = action.payload.id
      return { ...state, users: state.users.filter(el => el.id !== id) }
    }
    default: return state
  }

}

export default userReducer