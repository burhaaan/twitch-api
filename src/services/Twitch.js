import axios from "axios";

const client_id = process.env.REACT_APP_TWITCH_KEY;
const acceptLink = "application/vnd.twitchtv.v5+json";
const token = "Bearer eeutiboza0yayhxqf2zxpvn7d3zktb"

const TwitchAPI = axios.create({
  baseURL: "https://api.twitch.tv/helix/",
  headers: {
    "Client-id": client_id,
    'Authorization': token,
    Accept: acceptLink
  }
});

export const GetOnlineInfo = async id => {
  const response = await TwitchAPI.get(`streams/${id}`);
  return response.data.stream;
};

export const GetSearchOptions = async (type, value) => {
  const response = await TwitchAPI.get(
    `search/${type}?query=${value}`
  );
  return response.data.data;
};

export const GetGameStreams = async name => {
  const response = await TwitchAPI.get(`streams/?game=${name}&limit=40`);
  console.log("log response:", response);
  return response.data.streams;
};

export const GetGameViewedStreams = async name => {
  const response = await TwitchAPI.get(
    `videos/top?game=${name}&period=month&limit=12`
  );
  return response.data.vods;
};

export const GetGames = async (limit = 60) => {
  const response = await TwitchAPI.get(`games/top?limit=${limit}`);
  return response.data;
};
