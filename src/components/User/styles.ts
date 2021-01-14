import { makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    height: '100vh',
    borderTopColor: theme.palette.primary.main,
    borderTopWidth: 3,
    borderTopStyle: 'solid',
    padding: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 30,
    width: '80%',
  },
  titleDiv: {
    display: 'flex',
    flexDirection: 'row'
  },
  addButton: {
    width: '10%'
  }
}))