import React from 'react'

const Notification = ({notification}) => {
    const style = {
      border: 'solid',
      padding: '10px',
      borderWidth: 1
    }
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }

export default Notification