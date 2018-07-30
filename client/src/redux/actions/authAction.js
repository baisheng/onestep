import axios from 'axios'
import { showNotification } from './index'
import config from '../../config/config'
import * as types from '../../constants/actionTypes/authActionTypes.js'
import jwtDecode from 'jwt-decode'

export const setCurrentUser = user => ({
  type: types.AUTH_USER,
  user
})

function handleError(error, dispatch) {
  if (error.response) {
    dispatch(showNotification(error.response.data.errorMsg))
  } else {
    console.log(error)
  }
}

export function login(data, history) {
  return dispatch => {
    axios
      .post(`${config.api}/login`, data)
      .then(res => {
        if (typeof window !== 'undefined') {
          const token = res.data.token
          sessionStorage.setItem('jwtToken', token)
          axios.defaults.headers.common['Authorization'] = `${token}`
          dispatch(setCurrentUser(jwtDecode(token)))
          dispatch(showNotification('登录成功'))
          history.push('/user/profile')
        }
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function signup(data, history) {
  return dispatch => {
    axios
      .post(`${config.api}/signup`, data)
      .then(res => {
        if (typeof window !== 'undefined') {
          const token = res.data.token
          sessionStorage.setItem('jwtToken', token)
          axios.defaults.headers.common['Authorization'] = `${token}`
          dispatch(setCurrentUser(jwtDecode(token)))
          dispatch(showNotification('注册成功'))
          history.push('/user/profile')
        }
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function oauthWeChat(data, history) {
  return dispatch => {
    axios
      .post(`${config.api}/oauth/wechat`, data)
      .then(res => {
        if (!res.data.binding) {
          dispatch({ type: types.WECHAT_USER, user: res.data.user })
        } else {
          // 已经绑定则直接登录
          if (typeof window !== 'undefined') {
            const token = res.data.token
            sessionStorage.setItem('jwtToken', token)
            axios.defaults.headers.common['Authorization'] = `${token}`
            dispatch(setCurrentUser(jwtDecode(token)))
            dispatch(showNotification('登录成功'))
            history.push('/user/profile')
          }
        }
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function oauthBinding(data, history) {
  return dispatch => {
    delete data.errors
    axios
      .post(`${config.api}/oauth/binding`, data)
      .then(res => {
        if (typeof window !== 'undefined') {
          const token = res.data.token
          sessionStorage.setItem('jwtToken', token)
          axios.defaults.headers.common['Authorization'] = `${token}`
          dispatch(setCurrentUser(jwtDecode(token)))
          dispatch(showNotification('登录成功'))
          history.push('/user/profile')
        }
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}

export function logout(data) {
  return dispatch => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('jwtToken')
      delete axios.defaults.headers.common['Authorization']
      dispatch(setCurrentUser({}))
      dispatch(showNotification('退出成功'))
    }
  }
}

export function modifyPassword(data) {
  return dispatch => {
    axios
      .post(`${config.api}/password`, data)
      .then(res => {
        dispatch(showNotification('密码修改成功'))
      })
      .catch(error => {
        handleError(error, dispatch)
      })
  }
}
