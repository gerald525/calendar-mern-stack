import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ isAuth, children }) => {
  return isAuth ? <Navigate to="/" /> : children;
};

PublicRoute.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};

export default PublicRoute;
