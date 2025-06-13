import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  // message objesi { type: 'success' | 'error', text: 'mesaj' } şeklinde olmalı
  return (
    <div className={message.type}>
      {message.text}
    </div>
  )
}

export default Notification