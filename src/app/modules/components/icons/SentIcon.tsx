import { memo } from 'react';
import './Icons.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const SentIcon = () => {
  return (
    <span title="Enviado">
      <FontAwesomeIcon icon={faCheck} />
    </span>
  );
};

export default memo(SentIcon);
