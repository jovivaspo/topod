import { makeStyles } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import secondsToString from "../services/secondToString";
import io from "socket.io-client";
import { loadPlaylist } from "../actions/audioPlayerActions";

const useStyles = makeStyles((theme) => ({
  gallery: {
    width: "90vw",
    margin: "0 auto",
  },

  item: {
    display: "flex",
    margin: "20px",
    borderBottom: "solid 1px white",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  imgMain: {
    maxHeight: "265px",
  },

  columnInfo: {
    display: "flex",
    flexDirection: "column",
    margin: "15px",
  },

  tags: {
    display: "flex",
    gap: "20px",
    margin: "10px",
  },

  imgChannel: {
    width: "30px",
    height: "30px",
    borderRadius: "100%",
  },

  button: {
    fontWeight: "bold",
    paddingButton: "8px",
  },
}));

const GalleryVideos = () => {
  const classes = useStyles();
  const { videos, setAlert, setProgress, working, setWorking } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlerConvert = async (video) => {
    try {
      if (!user.userInfo) {
        navigate("/login");
        return false;
      }
      if (working) {
        setAlert({
          open: true,
          type: "warning",
          message: "Espere a que termine el proceso anterior",
        });

        return false;
      }

      setWorking(true);

      const { token } = user.userInfo;
      video.date = new Date();
      const duration = parseInt(video.duration);

      const socket = io("http://localhost:3000", {
        auth: { token },
        query: { duration },
      });

      navigate("/playlist");

      socket.on("connect_error", (err) => {
        console.log("Desconexión");
        socket.disconnect();
        setAlert({
          open: true,
          type: "error",
          message: err.message,
        });
        setWorking(false);
      });

      socket.on("error", (err) => {
        console.log("Error");
        socket.disconnect();
        setAlert({
          open: true,
          type: "error",
          message: err,
        });
        setWorking(false);
      });

      socket.on("message_converting", (message) => {
        setAlert({
          open: true,
          type: "warning",
          message,
        });
      });

      socket.emit("sending_infovideo", video);

      socket.on("converting_progress", (percentage) => {
        setProgress(percentage.toFixed(0));
      });

      socket.on("finish", (message) => {
        setAlert({
          open: true,
          type: "success",
          message,
        });
        dispatch(loadPlaylist(user));
        socket.disconnect();
        setWorking(false);
        setProgress(0);
      });
    } catch (err) {
      setAlert({
        open: true,
        type: "error",
        message: "Algo salió mal",
      });
      setWorking(false);
    }
  };

  return (
    <div className={classes.gallery}>
      {videos?.map((video, index) => {
        return (
          <div key={index} className={classes.item}>
            <img
              className={classes.imgMain}
              src={video.thumbnail}
              alt={video.id}
            />
            <div className={classes.columnInfo}>
              <h3>{video.title}</h3>
              <p className={classes.tags}>
                <span>{video.views} visulizaciones</span>
                <span>Hace {video.uploaded}</span>
              </p>
              <p className={classes.tags}>
                <img
                  className={classes.imgChannel}
                  src={video.channel.thumbnail}
                />
                <span style={{ paddingTop: 6 }}>{video.channel.name}</span>
              </p>
              <p className={classes.tags}>
                <span>{video.description}</span>
              </p>
              <p
                className={classes.tags}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>Duración: {secondsToString(video.duration)}</span>
              </p>
              <p className={classes.tags}>
                {" "}
                <span>
                  <Button
                    className={classes.button}
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handlerConvert(video)}
                  >
                    Convertir
                  </Button>
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GalleryVideos;
