import React from 'react';
import './SubmitButton.scss';

interface SubmitButtonInterface {
  title: string;
  submit: () => void;
  disable?: boolean;
}

const SubmitButton: React.FC<SubmitButtonInterface> = ({ ...props }) => {
  return (
    <button
      onClick={props.submit}
      className="submit-button"
      disabled={props.disable}
    >
      {props.title}
    </button>
  );
};

export default SubmitButton;
