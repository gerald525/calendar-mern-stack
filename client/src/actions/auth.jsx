import { fetchNoToken } from "../helpers/fetch";
import types from "../types";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchNoToken("auth/login", { email, password }, "POST");
    const body = await resp.json();

    const { user, token } = body;
    const { _id: id, name } = user;

    if (body.ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          id,
          name,
        })
      );
    }
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});
