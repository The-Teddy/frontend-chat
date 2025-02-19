import { memo } from 'react';
import './Icons.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
const DeliveredIcon = () => {
  return (
    <span title="Entregue">
      <FontAwesomeIcon icon={faCheckDouble} />
    </span>
  );
};

export default memo(DeliveredIcon);
