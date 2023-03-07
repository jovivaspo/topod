import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    fontSize: 32,
    marginTop: 32,
    marginBottom: 48,
    color: theme.palette.text.secondary,
  },
  container: {
    margin: "4em",
  },
  parrafo: {
    marginBottom: "2em",
  },
}));
const TermsConditions = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Términos y condiciones</h2>
      <h3>Aceptación de los términos y condiciones</h3>
      <p className={classes.parrafo}>
        El acceso y uso del Sitio Web están sujetos a los presentes términos y
        condiciones de uso (en adelante, "Términos y Condiciones"), que el
        usuario acepta al acceder o utilizar el Sitio Web. Si el usuario no
        acepta estos Términos y Condiciones, deberá abstenerse de utilizar el
        Sitio Web.
      </p>
      <h3>Modificaciones de los términos y condiciones</h3>
      <p className={classes.parrafo}>
        La Empresa se reserva el derecho de modificar los Términos y Condiciones
        en cualquier momento y sin previo aviso. El usuario deberá revisar
        periódicamente los Términos y Condiciones para conocer las eventuales
        modificaciones.
      </p>
      <h3>Servicio de conversión de videos de YouTube en podcasts</h3>
      <p className={classes.parrafo}>
        El Sitio Web ofrece un servicio de conversión de videos de YouTube en
        podcasts, que permite al usuario crear su propia lista de reproducción
        de podcasts. La Empresa no se hace responsable del contenido de los
        videos de YouTube convertidos en podcasts por el usuario, y se reserva
        el derecho de cancelar el servicio en caso de que se utilice para
        infringir los derechos de autor u otras leyes aplicables.
      </p>
      <h3>Registro de usuario</h3>
      <p className={classes.parrafo}>
        Para utilizar el servicio de conversión de videos de YouTube en
        podcasts, el usuario debe registrarse en el Sitio Web y proporcionar su
        información personal, incluyendo su nombre, dirección de correo
        electrónico y contraseña. La Empresa garantiza la protección de los
        datos personales del usuario de conformidad con la legislación aplicable
        en materia de protección de datos.
      </p>
      <h3>Exclusión de responsabilidad</h3>
      <p className={classes.parrafo}>
        La Empresa no garantiza la disponibilidad y continuidad del Sitio Web,
        ni se hace responsable de los daños y perjuicios que puedan derivarse
        del acceso o uso del Sitio Web. La Empresa no se hace responsable del
        contenido de los videos de YouTube convertidos en podcasts por el
        usuario, y se reserva el derecho de cancelar el servicio en caso de que
        se utilice para infringir los derechos de autor u otras leyes
        aplicables.
      </p>
      <h3>Política de privacidad</h3>
      <p className={classes.parrafo}>
        La Empresa garantiza la protección de los datos personales del usuario
        de conformidad con la legislación aplicable en materia de protección de
        datos. Para conocer nuestra política de privacidad, por favor consulte
        el apartado correspondiente en el Sitio Web.
      </p>
    </div>
  );
};

export default TermsConditions;
