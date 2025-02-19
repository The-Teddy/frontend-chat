import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const ReadIcon = () => {
  return (
    <span title="Lido">
      <FontAwesomeIcon icon={faCheckDouble} color="blue" />
    </span>
  );
};

export default memo(ReadIcon);
