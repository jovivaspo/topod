import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableList from "../components/TableList";
import { useNavigate } from "react-router-dom";
import { loadPlaylist } from "../actions/audioPlayerActions";
import { GlobalContext } from "../context/GlobalContext";
import { LinearProgress, makeStyles } from "@material-ui/core";
import { AlertMessage } from "../components/AlertMessage";
import Progress from "../components/Progress";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
    fontSize: 32,
    marginTop: 32,
    color: theme.palette.text.secondary,
  },
}));

const PlayList = () => {
  const clasess = useStyles();
  const { loading, working } = useContext(GlobalContext);
  const audioPlayer = useSelector((state) => state.audioPlayer);
  const user = useSelector((state) => state.user);
  const podcasts = audioPlayer.playlist;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.userInfo) {
      navigate("/login");
      return false;
    }
    dispatch(loadPlaylist(user));
  }, []);

  return (
    <div className="playlist">
      <h2 className={clasess.title}>Tu Playlist {user.userInfo.name}</h2>
      {loading && (
        <LinearProgress
          color="secondary"
          style={{
            width: "80vw",
            margin: "0 auto",
            marginTop: 30,
            marginBottom: 30,
          }}
        />
      )}
      {working && !loading && <Progress />}
      {podcasts && (
        <TableList podcasts={podcasts} style={{ marginBottom: 20 }} />
      )}
      {<AlertMessage />}
    </div>
  );
};

export default PlayList;
