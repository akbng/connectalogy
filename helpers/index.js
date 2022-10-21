export const getHighScorers = (limit) =>
  fetch(`/api/v1/highscorers?limit=${limit}`).then((res) => res.json());

export const getUserDetails = (id) =>
  fetch(`/api/v1/user/${id}`).then((res) => res.json());

export const createNewUser = ({ name, email, image }) =>
  fetch(`/api/v1/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email, image }),
  }).then((res) => res.json());

export const updateScore = (userId, score) =>
  fetch(`/api/v1/user/update/score/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ score }),
  }).then((res) => res.json());
