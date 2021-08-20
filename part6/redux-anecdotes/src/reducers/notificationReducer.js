const notificationsReducer = (state = null, action) => {
    switch (action.type) {
        case 'NEW_NOTIFICATION':
            return action.notification
        case 'HIDE_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const setNotification = (notification, timeout) => {
  window.clearTimeout(window.timeout);  
  return async dispatch => {
      dispatch({
        type: 'NEW_NOTIFICATION',
        notification,
      })
  
      window.timeout = setTimeout(() => {
        dispatch({
          type: 'HIDE_NOTIFICATION',
          notification: null
        })
      }, timeout * 1000)
    }
  }
  
  export default notificationsReducer