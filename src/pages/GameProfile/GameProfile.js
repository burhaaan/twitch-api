import React, { Component } from "react";
import Loading from "../../components/Loader";
import "./GameProfile.scss";
import { GetGameStreams, GetGameViewedStreams } from "../../services/Twitch";

class GameProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameName: "",
      gameRawName: "",
      liveStreams: [],
      mostViewedStreams: [],
      waitingForResponse: true,
      error: null
    };
  }

  getGameDataFromTwitch = async () => {
    let waitingForResponse;

    // Gets the raw name of the game
    let gameRawName =
      this.props && this.props.location && this.props.location.props
        ? this.props.location.props.gameName
        : this.props.location.pathname.match(/[^/]+$/)[0];

    // Makes the gameRawName compatible with API search.
    let gameName = gameRawName.replace(/&|\+/g, match => {
      return match == "&" ? "%26" : match == "+" ? "%2B" : "";
    });

    this.setState({ gameName, gameRawName });

    try {
      let liveStreams = await GetGameStreams(gameName);
      liveStreams.length == 0
        ? (waitingForResponse = false)
        : (waitingForResponse = true);

      let mostViewedStreams = await GetGameViewedStreams(gameName);
      this.setState({ liveStreams, mostViewedStreams, waitingForResponse });
    } catch (error) {
      this.setState({ error: "error" });
      console.log(error);
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getGameDataFromTwitch();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.getGameDataFromTwitch();
    }
  }

  render() {
    const {
      gameName,
    } = this.state;

    let coverArt = `https://static-cdn.jtvnw.net/ttv-boxart/./${gameName}-272x380.jpg`;

    const gameCard = gameName ? (
      <div className="game-topContainer">
        <div className="game-logoContainer">
          <div className="game-gameLogo">
            <img src={coverArt} alt="" />
          </div>
        </div>
      </div>
    ) : (
      <Loading />
    );

    return (
      <div>
        {gameCard}
      </div>
    );
  }
}

export default GameProfile;
