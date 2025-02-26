import React from 'react';
import './SubmitButton.scss';

interface SubmitButtonInterface {
  title: string;
  submit?: () => void;
  disable?: boolean;
  loading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonInterface> = ({ ...props }) => {
  return (
    <button
      onClick={props.submit}
      className="submit-button"
      disabled={props.disable}
    >
      {!props.loading && props.title}
      {props.loading && (
        <span className="indicator-progress" style={{ display: 'block' }}>
          <span className="spinner-border spinner-border-sm align-midle ms-2 text-white"></span>
        </span>
      )}
    </button>
  );
};

export default SubmitButton;
