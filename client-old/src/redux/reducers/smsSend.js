import config from '../../config/config'

const initialState = {
  alreadySendMsg: false,
  second: config.smsTimeLimit,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'SMS_INIT':
      return initialState
    case 'ALREADY_SEND_MSG':
      return {
        ...state,
        alreadySendMsg: true,
      }
    case 'COUNT_DOWN':
      return {
        ...state,
        second: state.second - 1,
      }
    case 'READY_TO_SEND_MSG':
      return {
        ...state,
        alreadySendMsg: false,
        second: config.smsTimeLimit,
      }
    default:
      return state
  }
}
