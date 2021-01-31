import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // Server

    return axios.create({
      baseURL: "http://ticketing.novusweb.dk",
      headers: req.headers,
    });
  } else {
    // Client

    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
