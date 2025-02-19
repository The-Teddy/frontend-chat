import { Spinner, SpinnerProps } from 'react-bootstrap';

const Load: React.FC<SpinnerProps & React.RefAttributes<unknown>> = () => {
  return (
    <div className="d-flex flex-column justify-items-center align-items-center w-100">
      <Spinner animation="border" color="#1f1e2c" />
      <span className="text-gray-700 mt-3">...Loading</span>
    </div>
  );
};
export default Load;
