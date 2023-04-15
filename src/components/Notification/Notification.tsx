import classNames from 'classnames';
import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useMessage } from '../../App';
import { ErrorType } from '../../types/ErrorType';
import { SuccessType } from '../../types/SuccessType';

export const Notification: React.FC = () => {
  const { message, setMessage } = useMessage();
  const isError = typeof message === typeof ErrorType;
  useEffect(() => {
    setTimeout(() => {
      setMessage(ErrorType.None);
    }, 5000);
  }, []);

  return (
    <Alert
      variant={isError ? 'danger' : 'success'}
      onClose={() => setMessage(isError ? ErrorType.None : SuccessType.None)}
      dismissible
      className={classNames('notification', { hidden: !message })}
    >
      <Alert.Heading>{message}</Alert.Heading>
    </Alert>
  );
};
