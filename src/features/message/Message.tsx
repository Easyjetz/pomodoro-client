import React from 'react'


type MessageProps = {
  success: boolean;
  message: string;
}

export const Message: React.FC<MessageProps> = ({success, message}) => {
  return <div className={success === true ? 'message success' : 'message error'}>{message}</div>
}