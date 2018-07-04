import React from 'react'
import Header from './Header'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Snackbar from '@material-ui/core/Snackbar'
import Drawer from '@material-ui/core/Drawer'
import TocList from '../../containers/TocListContainer'
import DrawerHeader from './DrawerHeader'
import { DRAWER_WIDTH } from '../../constants/GlobalStyle'
import DrawerFooter from '../../containers/DrawerFooterContainer'

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    border: '2px solid red'
  },
  content: {
    marginLeft: -DRAWER_WIDTH,
    flexGrow: 1,
    flexShrink: 0,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing.unit * 8,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: DRAWER_WIDTH,
    border: '2px solid green'
  },
  main: {
    flexGrow: 1,
    overflow: 'auto'
  }
})

const Layout = ({
  notification,
  children,
  clearNotification,
  toggleDrawer,
  isSidebarOpen,
  goto,
  currentUser,
  isOnEpisodePage,
  classes: s
}) => {
  return (
    <div className={s.root}>
      <Header
        currentUser={currentUser}
        goto={goto}
        toggleDrawer={toggleDrawer}
        isSidebarOpen={isSidebarOpen}
      />
      <Drawer
        variant="persistent"
        open={isSidebarOpen}
        classes={{
          paper: s.drawer
        }}
      >
        <DrawerHeader toggleDrawer={toggleDrawer} goto={goto} />
        <div className={s.main}>{isOnEpisodePage && <TocList />}</div>

        <DrawerFooter />
      </Drawer>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        variant="error"
        open={Boolean(notification)}
        autoHideDuration={3000}
        message={notification}
        onClose={clearNotification}
      />
      <div
        className={classNames(s.content, {
          [s.contentShift]: isSidebarOpen
        })}
      >
        {children}
      </div>
    </div>
  )
}

Layout.propTypes = {
  currentUser: PropTypes.object.isRequired,
  notification: PropTypes.string.isRequired,
  clearNotification: PropTypes.func.isRequired,
  isSidebarOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  isOnEpisodePage: PropTypes.bool.isRequired
}

export default withStyles(styles)(Layout)