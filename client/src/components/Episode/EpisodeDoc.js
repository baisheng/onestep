import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    fontFamily: `'Helvetica Neue',Helvetica,Arial,Sans-serif`,
    lineHeight: 1.9,
    fontSize: 16,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing.unit
    },
    '& pre': {
      border: `2px solid ${theme.palette.primary.light}`,
      padding: theme.spacing.unit,
      fontFamily: `Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace`,
      overflow: 'auto'
    }
  }
})

class EpisodeDoc extends Component {
  render() {
    const { classes: s, doc } = this.props
    return (
      <div className={s.root}>
        <ReactMarkdown source={doc} />
      </div>
    )
  }
}

export default withStyles(styles)(EpisodeDoc)