import React from 'react';
import './BackButton.scss';

interface BackButtonInterface {
  title: string;
  submit: () => void;
}
const BackButton: React.FC<BackButtonInterface> = ({ ...props }) => {
  return (
    <button className="back-button" onClick={() => props.submit()}>
      {props.title}
    </button>
  );
};

export default BackButton;
