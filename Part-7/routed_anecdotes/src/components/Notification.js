const Notification = ({ message }) => {
  if (!message) return null

  const style = {
    border: 'solid 1px',
    padding: 10,
    marginBottom: 10,
    color: 'green',
    backgroundColor: '#ccffcc',
  }
  return <div style={style}>{message}</div>
}

export default Notification
