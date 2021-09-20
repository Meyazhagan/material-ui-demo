import axios from "axios";

let baseUrl = "https://jsonplaceholder.typicode.com";
// const setBaseUrl = (url) => {
//   baseUrl = url;
// };

// setBaseUrl();
const fetchUsers = async () => {
  try {
    // if (localStorage.getItem("users")) {
    //   return await JSON.parse(localStorage.getItem("users"));
    // }
    const { data } = await axios.get(`${baseUrl}/users`);
    localStorage.setItem("users", JSON.stringify(data));
    return data;
  } catch (err) {
    console.log(err);
  }
};

const fetchUser = async (id) => {
  try {
    // if (localStorage.getItem("users")) {
    //   return await JSON.parse(localStorage.getItem("users"))[id];
    // }
    const res = await axios.get(`${baseUrl}/users/${id}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const fetchPosts = async () => {
  try {
    // if (localStorage.getItem("posts")) {
    //   return JSON.parse(localStorage.getItem("posts"));
    // }
    const { data } = await axios.get(`${baseUrl}/posts`);

    localStorage.setItem("posts", JSON.stringify(data));
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const fetchPost = async (id) => {
  try {
    // if (localStorage.getItem("posts")) {
    //   return JSON.parse(localStorage.getItem("posts"))[id - 1];
    // }
    const url = `${baseUrl}/posts/${id}`;
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
};

const fetchCommands = async (id) => {
  try {
    const key = `comments-${id}`;
    // if (localStorage.getItem(key)) {
    //   return JSON.parse(localStorage.getItem(key));
    // }
    const { data } = await axios.get(`${baseUrl}/posts/${id}/comments`);

    localStorage.setItem(key, JSON.stringify(data));
    return data;
  } catch (err) {
    console.log(err);
  }
};

const addPost = async (post) => {
  const { data } = await axios.post(`${baseUrl}/posts`, JSON.stringify(post), {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return data || {};
};

const editPost = async (post) => {
  const { data } = await axios.put(
    `${baseUrl}/posts/${post.id}`,
    JSON.stringify(post),
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return data || {};
};

const deletePost = async (post) => {
  const { data } = await axios.delete(`${baseUrl}/posts/${post.id}`);
  return data;
};

// const fetchFrom = (url, action) => {};
export {
  fetchUser,
  fetchUsers,
  fetchPosts,
  fetchPost,
  fetchCommands,
  addPost,
  editPost,
  deletePost,
};
