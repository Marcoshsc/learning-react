import { List, ListItem, ListItemText, Paper, Typography, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../../store/rootReducer'
import { fetchUsers } from '../../store/user/actions'
import { User } from '../../store/user/types'
import { useStyles } from './styles'
import UserPopup from './UserPopup'

interface UserMainPageDispatch {
  fetchUsers(): void
}

interface UserMainPageReduxProps {
  users: User[]
}

type UserMainPageProps = UserMainPageDispatch & UserMainPageReduxProps

function UserMainPage(props: UserMainPageProps) {

  const { fetchUsers, users } = props

  const { i18n, t } = useTranslation()
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [lang, setLang] = useState<"pt" | "en">("en")

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [lang, i18n])

  const classes = useStyles()

  const [popupOpen, setPopupOpen] = useState(false)

  const handleClick = (user: User) => {

    return () => {
      setSelectedUser(user)
      setPopupOpen(true)
    }
  }

  const handlePopupClose = () => {
    setPopupOpen(false)
  }

  const handleCreate = () => {
    setSelectedUser(undefined)
    setPopupOpen(true)
  }

  const handleChangeLanguage = () => {
    if(lang === 'pt')
      setLang('en')
    else
      setLang('pt')
  }

  console.log(users)

  return (
    <>
    <UserPopup open={popupOpen} handleClose={handlePopupClose} user={selectedUser}/>
    <Paper className={classes.paper}>
      <div className={classes.titleDiv}>
        <Typography className={classes.title} component="h1">
          <Trans i18nKey="user:title">
            Users
          </Trans>
        </Typography>
        <Button onClick={handleCreate} color="primary" variant="contained" className={classes.addButton}>
          <Trans i18nKey="user:add">
          </Trans>
        </Button>
        <Button onClick={handleChangeLanguage} color="primary" variant="contained" className={classes.addButton}>
          <Trans i18nKey="global:changelang">
          </Trans>
        </Button>
      </div>
      <div>
        <List>
          {
            users.map(el => (
              <ListItem key={el.id} button onClick={handleClick(el)}>
                <ListItemText primary={t('user:name')} secondary={el.name} />
                <ListItemText primary={t('user:username')} secondary={el.username} />
                <ListItemText primary={t('user:email')} secondary={el.email} />
              </ListItem>
            ))
          }
        </List>
      </div>
    </Paper>
    </>
  )
}

const mapStateToProps = ({ userReducer }: ApplicationState) => ({
  users: userReducer.users
})

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchUsers: fetchUsers
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserMainPage)