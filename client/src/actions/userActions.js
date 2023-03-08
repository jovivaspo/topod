import { LOGIN, LOGOUT, REGISTER } from "../types";
import { helpHttp } from "../services/helpHttp";
import { urls } from "../services/urlApi";

export const login =
  (form, setAlert, setForm, initialForm, navigate) => async (dispatch) => {
    try {
      const res = await helpHttp().post(`${urls().LOGIN}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: form.email,
          password: form.password,
        },
      });

      if (res.error) {
        setAlert({
          open: true,
          type: "error",
          message: res.error,
        });
        return false;
      }
      setAlert({
        open: true,
        type: "success",
        message: res.message,
      });

      setTimeout(() => {
        const { uid, token, email, name } = res;
        const userInfo = { uid, token, email, name };
        dispatch({ type: LOGIN, payload: userInfo });
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setForm(initialForm);
        navigate("/playlist");
      }, 1000);
    } catch (err) {
      setAlert({
        open: true,
        type: "error",
        message: "Algo salió mal",
      });
    }
  };

export const register =
  (form, setAlert, setForm, initialForm, navigate) => async (dispatch) => {
    try {
      const res = await helpHttp().post(`${urls().REGISTER}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name: form.name,
          email: form.email,
          password: form.password,
        },
      });

      if (res.error) {
        setAlert({
          open: true,
          type: "error",
          message: res.error,
        });
        return false;
      }

      setAlert({
        open: true,
        type: "success",
        message: res.message,
      });

      setTimeout(() => {
        const { uid, token, email, name } = res;
        const userInfo = { uid, token, email, name };
        dispatch({ type: LOGIN, payload: userInfo });
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setForm(initialForm);
        navigate("/playlist");
      }, 1000);
    } catch (err) {
      setAlert({
        open: true,
        type: "error",
        message: "Algo salió mal",
      });
      return false;
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("userInfo");
};

export const updateUser =
  (body, setAlert, setForm, user) => async (dispatch) => {
    try {
      const res = await helpHttp().put(`${urls().UPDATE}${user.userInfo.uid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.userInfo.token}`,
        },
        body: body,
      });

      if (res.error) {
        setAlert({
          open: true,
          type: "error",
          message: res.error,
        });
        return false;
      }

      setAlert({
        open: true,
        type: "success",
        message: res.message,
      });

      const { uid, email, name } = res.userUpdated;

      const userInfo = { uid, email, name, token: user.userInfo.token };

      dispatch({ type: LOGIN, payload: userInfo });

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      setForm({ name, email, password: "", confirmPassword: "" });
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (error) {
      return setAlert({
        open: true,
        type: "error",
        message: "Algo salió mal",
      });
    }
  };
