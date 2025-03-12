import React, { memo } from 'react';
import './EditModal.scss';
import { Box, Modal } from '@mui/material';
import BackButton from '../../buttons/back/BackButton';
import SubmitButton from '../../buttons/submit/SubmitButton';

interface EditModalInterface {
  view: boolean;
  title: string;
  setView: () => void;
  children: React.ReactNode;
  submit: () => void;
  loading: boolean;
}

const EditModal: React.FC<EditModalInterface> = ({ ...props }) => {
  return (
    <Modal open={props.view}>
      <Box className="edit-modal">
        <p className="title text-center">{props.title}</p> {props.children}
        <div className="d-flex gap-3">
          <BackButton title="Cancelar" submit={props.setView} />
          <SubmitButton
            title="Salvar"
            submit={props.submit}
            loading={props.loading}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default EditModal;
