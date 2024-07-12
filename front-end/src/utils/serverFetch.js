import { backendURL } from "./config";

export const unauthPost = async (route, body, value, setValue) => {
  const response = await fetch(backendURL + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const formatResponse = await response.json();
  return formatResponse;
};

export const authPost = async (route, body, value, setValue) => {
  const token = getToken();
  const response = await fetch(backendURL + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const formatResponse = await response.json();
  return formatResponse;
};

export const authGet = async (route) => {
  const token = getToken();
  const response = await fetch(backendURL + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const formatResponse = await response.json();
  return formatResponse;
};



const getToken = () => {
  const cookieParts = document.cookie.split(";");
  let accessToken;
  for (const part of cookieParts) {
    const [name, value] = part.trim().split("=");
    if (name === "token") {
      accessToken = value;
      break;
    }
  }
  console.log(accessToken, "access");

  return accessToken;
};
