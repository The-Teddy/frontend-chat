import { Box, Modal } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import './MessageDataModal.scss';

interface MessageDataModalInterface {
  modalPosition: {
    top: number;
    left: number;
  } | null;
}
const MessageDataModal: React.FC<MessageDataModalInterface> = ({
  ...props
}) => {
  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  // const modalRef = useRef()

  useEffect(() => {
    if (props.modalPosition) {
      setModalPosition(props.modalPosition);
    }
  }, [props.modalPosition]);
  console.log('dentro do modal: ', modalPosition);

  return (
    <>
      {/* {modalPosition && ( */}
      <div
        className="modal"
        style={{
          position: 'absolute',
          top: 0,
          left: 300,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          padding: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}
      >
        Modal dinâmico!
      </div>
      {/* )} */}
    </>
  );
};

export default MessageDataModal;
