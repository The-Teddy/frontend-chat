import React from 'react';
import './DynamicModal.scss';

interface DynamicModalInterface {
  view: boolean;
  children: React.ReactNode;
  settingModal: {
    y: number;
    x: number;
  } | null;
}
const DynamicModal: React.FC<DynamicModalInterface> = ({ ...props }) => {
  return (
    <>
      <div
        id="dynamic-modal"
        style={{
          top: props.view ? props.settingModal?.y : -1000,
          left: props.settingModal?.x,
          visibility: props.view ? 'visible' : 'hidden',
          transition: '.5s all ease',
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default DynamicModal;
