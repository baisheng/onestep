import React from 'react'

import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {}
})

class Buy extends React.Component {
  render() {
    const { classes: s, price } = this.props
    return (
      <div>
        <div className={s.root}>Buy</div>

        <div>{price}</div>
      </div>

      // {price === 0 ? (
      //   <BuyCourseButton />
      // ) : !isAuthenticated ? (
      //   <BuyCourseButton price={price} onClick={this.handleClick} />
      // ) : !isAccessible ? (
      //   <BuyCourse
      //     name={name}
      //     price={price}
      //     courseId={_id}
      //     signContract={this.props.signContract}
      //     checkContract={this.props.checkContract}
      //   />
      // ) : null}
    )
  }
}

export default withStyles(styles)(Buy)
