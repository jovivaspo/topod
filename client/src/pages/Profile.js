import { Button, Container, makeStyles } from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalContext } from "../context/GlobalContext";
import EditIcon from "@material-ui/icons/Edit";
import { AlertMessage } from "../components/AlertMessage";
import { updateUser } from "../actions/userActions";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    fontSize: 32,
    marginTop: 32,
    marginBottom: 63,
    color: theme.palette.text.secondary,
  },

  subtitle: {
    textAlign: "left",
    fontSize: 24,
    marginTop: 32,
    marginBottom: 32,
    color: theme.palette.text.secondary,
  },

  inputContainer: {
    display: "flex",
  },

  input: {
    width: "90%",
    margin: 8,
    padding: 4,
    background: theme.palette.primary.main,
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderBottom: "solid 2px #CDA757",
    marginBottom: 32,
    opacity: 1,

    "&:focus": {
      outline: "none",
    },

    "&::placeholder": {
      fontSize: "16px",
      color: "#cbc6c6",
    },

    "&:disabled": {
      color: "#cbc6c6",
      opacity: 0.8,
    },
  },
  durationContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  icon: {
    position: "relative",
    paddingTop: "8px",
    cursor: "pointer",
    display: "inline-block",
    height: "36px",
  },
  failIcon: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "transparent",
  },
  btnContainer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "right",
    gap: "24px",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const { setAlert } = useContext(GlobalContext);
  const initialForm = {
    name: user.userInfo.name,
    email: user.userInfo.email,
    password: "",
    confirmPassword: "",
  };
  const [form, setForm] = useState(initialForm);
  const ref = {
    name: useRef(),
    email: useRef(),
    password: useRef(),
    confirmPassword: useRef(),
  };

  const dispatch = useDispatch();

  const handlerChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlerEdit = (e) => {
    ref[e.target.dataset.name].current.disabled = false;

    if (e.target.dataset.name === "password")
      ref.confirmPassword.current.disabled = false;
  };

  const handlerCancel = () => {
    setForm(initialForm);
    ref.name.current.disabled = true;
    ref.email.current.disabled = true;
    ref.password.current.disabled = true;
    ref.confirmPassword.current.disabled = true;
  };

  const handlerAmpliar = () => {
    setAlert({
      open: true,
      type: "success",
      message: "En breves esta opción estará disponible",
    });
  };

  const handlerSubmit = () => {
    if (JSON.stringify(form) === JSON.stringify(initialForm)) return;

    const body = {};

    if (!form.name || !form.email) {
      return setAlert({
        open: true,
        type: "warning",
        message: "Nombre o email están incompletos",
      });
    }

    if (initialForm.name !== form.name) {
      body.name = form.name;
    }

    if (initialForm.email !== form.email) {
      body.email = form.email;
    }

    if (form.password && form.password.length < 6) {
      return setAlert({
        open: true,
        type: "warning",
        message: "La contraseña debe contener más de 6 caracteres",
      });
    }
    if (form.password !== form.confirmPassword) {
      return setAlert({
        open: true,
        type: "warning",
        message: "Las contraseñas no coinciden",
      });
    }
    if (form.password.length > 6 && form.password === form.confirmPassword) {
      body.password = form.password;
    }
    dispatch(updateUser(body, setAlert, setForm, user));
    ref.name.current.disabled = true;
    ref.email.current.disabled = true;
    ref.password.current.disabled = true;
    ref.confirmPassword.current.disabled = true;
  };

  return (
    <>
      <h2 className={classes.title}>Perfil</h2>

      <Container maxWidth="sm" className="">
        <h2 className={classes.subtitle}>Datos de usuario</h2>
        <label>Nombre</label>
        <div className={classes.inputContainer}>
          <input
            type="text"
            className={classes.input}
            placeholder="Nombre"
            name="name"
            value={form.name}
            disabled
            onChange={handlerChange}
            ref={ref.name}
          />
          <i className={classes.icon}>
            <div
              className={classes.failIcon}
              data-name="name"
              onClick={handlerEdit}
            ></div>
            <EditIcon />
          </i>
        </div>
        <label>Email</label>
        <div className={classes.inputContainer}>
          <input
            type="email"
            className={classes.input}
            placeholder="Email"
            name="email"
            value={form.email}
            disabled
            onChange={handlerChange}
            ref={ref.email}
          />
          <i className={classes.icon}>
            <div
              className={classes.failIcon}
              data-name="email"
              onClick={handlerEdit}
            ></div>
            <EditIcon />
          </i>
        </div>
        <label>Cambiar contraseña</label>
        <div className={classes.inputContainer}>
          <input
            type="password"
            className={classes.input}
            placeholder="Contraseña"
            name="password"
            value={form.password}
            disabled
            onChange={handlerChange}
            ref={ref.password}
          />
          <i className={classes.icon}>
            <div
              className={classes.failIcon}
              data-name="password"
              onClick={handlerEdit}
            ></div>

            <EditIcon />
          </i>
        </div>
        <label>Confirmar contraseña</label>
        <input
          type="password"
          className={classes.input}
          placeholder="Confirmar contraseña"
          name="confirmPassword"
          value={form.confirmPassword}
          disabled
          onChange={handlerChange}
          ref={ref.confirmPassword}
        />
        <div className={classes.durationContainer}>
          <p>
            Tiempo total ocupado: <span>80h</span>
          </p>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            size="small"
            onClick={handlerAmpliar}
          >
            Ampliar
          </Button>
        </div>
        <div className={classes.btnContainer}>
          <Button
            className={classes.btnSave}
            variant="contained"
            color="secondary"
            type="submit"
            size="small"
            onClick={handlerSubmit}
          >
            Guardar
          </Button>
          <Button
            className={classes.btnSave}
            variant="contained"
            color="secondary"
            type="submit"
            size="small"
            onClick={handlerCancel}
          >
            Cancelar
          </Button>
        </div>
      </Container>
      <AlertMessage />
    </>
  );
};

export default Profile;
