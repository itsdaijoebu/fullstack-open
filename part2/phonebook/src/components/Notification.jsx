const Notification = ({ message, messageClass }) => {
  if (message === null) {
    return null;
  }

  return <div className={`notification ${messageClass}`}>{message}</div>;
};

export default Notification;
