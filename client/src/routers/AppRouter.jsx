import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AuthRouter from "./AuthRouter";
import CalendarScreen from "../components/calendar/CalendarScreen";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <PublicRoute isAuth={true}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute isAuth={true}>
              <CalendarScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};
export default AppRouter;

// import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
// import LoginScreen from "../components/auth/LoginScreen"
// import CalendarScreen from "../components/calendar/CalendarScreen"

// const AppRouter = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<LoginScreen />} />
//         <Route path="/" element={<CalendarScreen />} />

//         <Route path='*' element={<Navigate replace to='/' />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }
// export default AppRouter
