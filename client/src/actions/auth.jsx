import { fetchNoToken, fetchWithToken } from "../helpers/fetch";
import types from "../types";
import Swal from "sweetalert2";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    fetchNoToken("auth/login", { email, password }, "POST")
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.ok) {
          const { user, token } = resp;
          const { _id: id, name } = user;

          localStorage.setItem("token", token);
          localStorage.setItem("token-init-date", new Date().getTime());

          dispatch(
            login({
              id,
              name,
            })
          );
        } else {
          const msgError =
            resp.msg || resp.errors[Object.keys(resp.errors)[0]].msg;
          Swal.fire("Error", msgError, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    fetchNoToken("auth/register", { name, email, password }, "POST")
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.ok) {
          const { user, token } = resp;
          const { _id: id, name } = user;

          localStorage.setItem("token", token);
          localStorage.setItem("token-init-date", new Date().getTime());

          dispatch(
            login({
              id,
              name,
            })
          );
        } else {
          const msgError =
            resp.msg || resp.errors[Object.keys(resp.errors)[0]].msg;
          Swal.fire("Error", msgError, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    fetchWithToken("auth/renew")
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp.ok) {
          const { user, token } = resp;
          const { _id: id, name } = user;

          localStorage.setItem("token", token);
          localStorage.setItem("token-init-date", new Date().getTime());

          dispatch(
            login({
              id,
              name,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      })
      .finally(() => {
        dispatch(checkingFinish());
      });
  };
};

const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.authLogout,
});
