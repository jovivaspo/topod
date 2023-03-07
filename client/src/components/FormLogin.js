import { Button, TextField, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { login, register } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: theme.palette.secondary.main,
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(224,201,152,1) 0%, rgba(205,167,87,1) 100%)",
    borderRadius: 20,
    padding: 16,

    width: 400,

    [theme.breakpoints.down("xs")]: {
      width: 280,
    },
  },
  input: {
    margin: 8,
  },

  button: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 12,
  },
}));

const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const initialAlert = {
  open: false,
  type: "",
  message: "",
};

const FormLogin = ({ value, setValue }) => {
  const classes = useStyles();
  const [form, setForm] = useState(initialForm);
  const [alert, setAlert] = useState(initialAlert);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(initialAlert);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === 0) {
      //Inicio de sesión
      if (form.email === "" || form.password === "") {
        setAlert({
          open: true,
          type: "error",
          message: "Completa todos los campos",
        });
        return false;
      }

      dispatch(login(form, setAlert, setForm, initialForm));
      setTimeout(() => {
        navigate("/playlist");
      }, 1000);
    } else {
      if (form.password !== form.confirmPassword) {
        setAlert({
          open: true,
          type: "error",
          message: "Las contraseñas no coinciden",
        });
        return false;
      }
      if (form.email === "" || form.password === "" || form.name === "") {
        setAlert({
          open: true,
          type: "error",
          message: "Completa todos los campos",
        });
        return false;
      }

      dispatch(register(form, setAlert, setForm, initialForm));
      setTimeout(() => {
        navigate("/playlist");
      }, 1000);
    }
  };

  return (
    <div>
      <form className={classes.form} onSubmit={handleSubmit}>
        {value === 1 && (
          <TextField
            className={classes.input}
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            variant="outlined"
            onChange={handleChange}
            autoComplete="off"
          />
        )}

        <TextField
          className={classes.input}
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          variant="outlined"
          onChange={handleChange}
          autoComplete="off"
        />

        <TextField
          className={classes.input}
          type="password"
          name="password"
          placeholder="Contraseña"
          variant="outlined"
          value={form.password}
          onChange={handleChange}
          autoComplete="off"
        />

        {value === 1 && (
          <TextField
            className={classes.input}
            type="password"
            name="confirmPassword"
            placeholder="Contraseña"
            variant="outlined"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
          />
        )}

        <Button
          size="small"
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          onSubmit={handleSubmit}
        >
          {value === 0 ? "Iniciar Sesión" : "Registrate"}
        </Button>
        {value === 0 ? (
          <>
            <p
              style={{
                margin: "0 auto",
                padding: 14,
                fontSize: 14,
                color: "black",
              }}
            >
              ¿Eres nuevo?
            </p>

            <Button
              size="small"
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => setValue(1)}
            >
              Crea una cuenta
            </Button>
          </>
        ) : (
          <>
            <p
              style={{
                margin: "0 auto",
                padding: 14,
                fontSize: 14,
                color: "black",
              }}
            >
              ¿Ya tienes cuenta?
            </p>
            <Button
              size="small"
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={() => setValue(0)}
            >
              Inicia sesión
            </Button>
          </>
        )}
        <p
          style={{
            margin: "0 auto",
            padding: 14,
            fontSize: 10,
            color: "black",
            textAlign: "center",
          }}
        >
          Al iniciar sesión o crear una cuenta, acepta nuestros{" "}
          <Link to="/terminos-y-condiciones"> Términos y condiciones</Link> y
          <Link to="/politica-privacidad"> Política de privacidad</Link>.
        </p>
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <MuiAlert
            onClose={handleClose}
            elevation={10}
            variant="filled"
            severity={alert.type}
          >
            {alert.message}
          </MuiAlert>
        </Snackbar>
      </form>
    </div>
  );
};

export default FormLogin;
