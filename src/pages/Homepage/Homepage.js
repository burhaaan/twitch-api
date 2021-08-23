import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Homepage.scss";
import { GetGames } from "../../services/Twitch";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
      error: null,
    };
  }
  getData = async () => {
    try {
      let games = await GetGames(6);
      this.setState({
        games,
      });
    } catch (error) {
      this.setState({ error: "error" });
      console.log(error);
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getData();
  }

  render() {
    const { games } = this.state;
    const gamesList = games.data
      ? games.data.map(item => {
          return (
            <GameCard
              key={item.id}
              name={item.name}
              imgURL={item.box_art_url}
            />
          );
        })
      : null;

    const topContainer = (
      <div className="home-topContainer">
        <div>
          <h4 className="home-categTitle">
            <Link style={{ color: "rgba(51, 51, 51, 0.9)" }} to="/categories">
              Top Categories
            </Link>
          </h4>

          <div className="home-gamesList">{gamesList}</div>
        </div>

      </div>
    );
    
    return (
      <div>
        {topContainer}
      </div>
    );
  }
}

const GameCard = ({ name, imgURL}) => (
  <div style={{ height: "270px", width: "201px" }} className="home-gameCard">
    <Link
      to={{
        pathname: `/game/${name}`,
        props: { gameName: name }
      }}
    >
      <img style={{ height: "200px", width: "200px" }} src={imgURL} alt="" />
    </Link>
    <p>{name}</p>
  </div>
);

export default Profile;
