import { Button, Dialog, DialogActions, DialogTitle, TextField } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { addUser, deleteUser, editUser } from '../../../store/user/actions'
import { User } from '../../../store/user/types'
import { useStyles } from './styles'

interface UserPopupParentProps {
  open: boolean
  handleClose(): void
  user?: User
}

interface UserPopupDispatchProps {
  deleteUser(id: number): void
  editUser(user: User): void
  addUser(user: User): void
}

type UserPopupProps = UserPopupParentProps & UserPopupDispatchProps

function UserPopup(props: UserPopupProps) {

  const { open, handleClose, user, deleteUser, editUser, addUser } = props

  const classes = useStyles()
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    if(user) {
      setEmail(user.email)
      setUsername(user.username)
      setName(user.name)
    }
    else {
      setEmail('')
      setUsername('')
      setName('')
    }
  }, [user])

  const handleChange = (callback: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      callback(e.target.value)
    }
  }

  const handleDeleteUser = (id: number) => {
    return () => {
      handleClose()
      deleteUser(id)
    }
  }

  const handleEditUser = (user: User) => {
    return () => {
      handleClose()
      editUser({
        id: user.id,
        email: email,
        name: name,
        username: username
      })
    }
  }

  const handleCreateUser = () => {
    handleClose()
    addUser({
      email: email,
      name: name,
      username: username
    })
  }

  return (
    <Dialog PaperProps={{
      className: classes.dialog
    }}  maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>
        <Trans i18nKey={user ? 'user:editTitle' : 'user:addTitle'}>
        </Trans>
      </DialogTitle>
      <TextField label={t('user:name')} className={classes.outerField} variant="outlined" InputProps={{
        className: classes.field
      }} value={name} onChange={handleChange(setName)}/>
      <TextField label={t('user:username')} className={classes.outerField} variant="outlined" InputProps={{
        className: classes.field
      }} value={username} onChange={handleChange(setUsername)}/>
      <TextField label={t('user:email')} className={classes.outerField} variant="outlined" InputProps={{
        className: classes.field
      }} value={email} onChange={handleChange(setEmail)}/>
      <DialogActions>
        {
          !user && <Button onClick={handleCreateUser} >
            <Trans i18nKey="user:add">
            </Trans>
          </Button>
        }
        {
          user && <Button onClick={handleEditUser(user)} >
            <Trans i18nKey="user:edit">
            </Trans>
          </Button>
        }
        {
          user && <Button onClick={handleDeleteUser(user.id as number)} >
            <Trans i18nKey="user:delete">
            </Trans>
          </Button> 
        }        
      </DialogActions>
    </Dialog>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  deleteUser: deleteUser,
  editUser: editUser,
  addUser: addUser
}, dispatch)

export default connect(null, mapDispatchToProps)(UserPopup)