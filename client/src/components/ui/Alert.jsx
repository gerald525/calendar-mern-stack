import PropTypes from "prop-types";
const Alert = ({ type, description }) => {
  return (
    <div className={`alert alert__${type}`}>
      <p className="alert__title">{description}</p>
    </div>
  );
};
Alert.propTypes = {
  type: PropTypes.string,
  description: PropTypes.string,
};
export default Alert;