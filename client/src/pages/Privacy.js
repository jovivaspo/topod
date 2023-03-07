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
const Privacy = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Política de Privacidad</h2>
      <h3>Información personal recopilada</h3>
      <p className={classes.parrafo}>
        La Empresa podrá recopilar y procesar la siguiente información personal
        del usuario cuando este accede y utiliza el Servicio: Información de
        registro: la información que el usuario proporciona al registrarse en el
        Sitio Web, como su nombre, dirección de correo electrónico y contraseña.
        Información de pago: si el usuario decide adquirir servicios o productos
        a través del Sitio Web, la información de pago necesaria para realizar
        el pago correspondiente. Información de uso: la información recopilada a
        través de cookies u otras tecnologías similares que recopilan
        información sobre la interacción del usuario con el Sitio Web, como el
        tipo de navegador utilizado, la dirección IP del usuario y las páginas
        visitadas.
      </p>
      <h3>Uso de la información personal</h3>
      <p className={classes.parrafo}>
        Procesar y gestionar el registro del usuario en el Sitio Web.
        Proporcionar y gestionar el Servicio, incluyendo la conversión de videos
        de YouTube en podcasts. Realizar operaciones de pago si el usuario
        adquiere servicios o productos a través del Sitio Web. Analizar la
        información de uso del usuario para mejorar la calidad y la eficiencia
        del Servicio. Enviar información relevante sobre el Servicio y otras
        comunicaciones comerciales que puedan ser de interés del usuario.
      </p>
      <h3>Divulgación de información personal</h3>
      <p className={classes.parrafo}>
        La Empresa no venderá, alquilará ni divulgará la información personal
        del usuario a terceros, excepto en los siguientes casos: Si el usuario
        autoriza expresamente la divulgación de su información personal. Si la
        Empresa está obligada a divulgar la información personal del usuario por
        ley, por un mandato judicial o por una solicitud de una autoridad
        competente. Si la Empresa considera que la divulgación de la información
        personal del usuario es necesaria para proteger sus derechos, propiedad
        o seguridad, o la de otros usuarios del Sitio Web. Seguridad de la
        información personal La Empresa implementará medidas de seguridad
        razonables para proteger la información personal del usuario contra el
        acceso no autorizado, la alteración, la divulgación o la destrucción.
        Entre estas medidas se incluyen el cifrado de datos y la restricción del
        acceso a la información personal a aquellos empleados, contratistas y
        agentes de la Empresa que necesiten conocerla para proporcionar el
        Servicio.
      </p>
      <h3>Seguridad de la información personal</h3>
      <p className={classes.parrafo}>
        La Empresa implementará medidas de seguridad razonables para proteger la
        información personal del usuario contra el acceso no autorizado, la
        alteración, la divulgación o la destrucción. Entre estas medidas se
        incluyen el cifrado de datos y la restricción del acceso a la
        información personal a aquellos empleados, contratistas y agentes de la
        Empresa que necesiten conocerla para proporcionar el Servicio.
      </p>
      <h3>Derechos del usuario</h3>
      <p className={classes.parrafo}>
        El usuario tiene derecho a acceder, rectificar, limitar, oponerse,
        suprimir y portar su información personal. Para ejercer estos derechos,
        el usuario debe ponerse en contacto con la Empresa a través de la
        dirección de correo electrónico.
      </p>
      <h3>Modificaciones a la política de privacidad</h3>
      <p className={classes.parrafo}>
        La Empresa se reserva el derecho de modificar esta Política en cualquier
        momento y sin previo aviso al usuario. La versión actualizada de la
        Política de privacidad estará siempre disponible en el Sitio Web. Se
        recomienda al usuario revisar regularmente la Política de privacidad
        para mantenerse informado sobre las posibles modificaciones.
      </p>
      <h3>Consentimiento</h3>
      <p className={classes.parrafo}>
        Al acceder y utilizar el Servicio y el Sitio Web, el usuario acepta y
        consiente el tratamiento de su información personal de acuerdo con los
        términos y condiciones de esta Política de privacidad. Si el usuario no
        está de acuerdo con los términos y condiciones de esta Política de
        privacidad, no debe acceder ni utilizar el Servicio ni el Sitio Web.
      </p>
    </div>
  );
};

export default Privacy;
