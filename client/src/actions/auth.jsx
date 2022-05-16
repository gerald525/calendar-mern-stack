import { fetchNoToken } from "../helpers/fetch";
import types from "../types";
import Swal from "sweetalert2";

export const startLogin = (email, password) => {
  //TODO: Catch for validations errors
  return async (dispatch) => {
    const resp = await fetchNoToken("auth/login", { email, password }, "POST");
    const body = await resp.json();

    if (body.ok) {
      const { user, token } = body;
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
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startRegister = (name, email, password) => {
  //TODO: Catch for validations errors
  return async (dispatch) => {
    const resp = await fetchNoToken(
      "auth/register",
      { name, email, password },
      "POST"
    );
    const body = await resp.json();

    if (body.ok) {
      const { user, token } = body;
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
      Swal.fire("Error", body.msg, "error");
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
