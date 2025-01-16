import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ReadIcon = () => {
  return (
    <span title="Lido">
      <FontAwesomeIcon icon={faCheckDouble} color="blue" />
    </span>
  );
};

export default ReadIcon;
