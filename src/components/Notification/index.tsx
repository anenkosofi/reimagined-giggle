import React, { FC } from 'react';

import './Notification.scss';

type NotificationProps = {
  message: string;
};

const Notification: FC<NotificationProps> = ({ message }) => {
  return <p className="notification">{message}</p>;
};

export default Notification;
