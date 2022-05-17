import { fetchNoToken, fetchWithToken } from "../helpers/fetch";
import types from "../types";
import Swal from "sweetalert2";
import { removeError, setError } from "./ui";
import { eventLogout } from "./event";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    fetchNoToken("auth/login", { email, password }, "POST")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          const { user, token } = data;
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
          if (data.errors) dispatch(checkingErrors(data.errors));
          if (data.msg) Swal.fire("Error", data.msg, "error");
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
      .then((data) => {
        if (data.ok) {
          const { user, token } = data;
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
          if (data.errors) dispatch(checkingErrors(data.errors));
          if (data.msg) Swal.fire("Error", data.msg, "error");
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Please, contact the administrator", "error");
      });
  };
};

export const checkingErrors = (errors) => {
  return (dispatch) => {
    const { msg } = errors[Object.keys(errors)[0]];
    dispatch(setError(msg));
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    fetchWithToken("auth/renew")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.ok) {
          const { user, token } = data;
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
    dispatch(removeError());
    dispatch(eventLogout());
    dispatch(logout());
  };
};

export const logout = () => ({
  type: types.authLogout,
});
