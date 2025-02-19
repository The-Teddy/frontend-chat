import { memo } from 'react';

const StatusIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      className="icon-default-color"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      ></circle>
      <circle cx="12" cy="12" r="6" fill="currentColor"></circle>
    </svg>
  );
};

export default memo(StatusIcon);
