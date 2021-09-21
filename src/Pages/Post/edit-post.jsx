import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { fetchPost, fetchUsers } from "../../Helper";
import { Form } from "../../Component";

function EditPost({ editPost }) {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [users, setUsers] = useState([]);
  const initialize = async () => {
    const data = await fetchPost(id);
    const userData = await fetchUsers();
    setPost(data);
    setUsers(userData);
  };
  const history = useHistory();
  useEffect(
    () => initialize(),
    // eslint-disable-next-line
    [editPost]
  );

  useEffect(
    () => initialize(),
    // eslint-disable-next-line
    []
  );

  // const handleChange = ({ target }) => {
  //   setPost({ ...post, [target.id]: target.value });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   editPost(post);
  //   history.push("/post");
  // };

  return (
    <>
      {/* <Slide direction="left" in={true} mountOnEnter unmountOnExit> */}
      <Form
        initialValues={{
          id: (post && post.id) || 1,
          userId: (post && post.userId) || "",
          title: (post && post.title) || "",
          body: (post && post.body) || "",
        }}
        atSubmit={(values) => {
          editPost(values);
          history.push("/post");
        }}
        heading={"Edit Post"}
        users={users}
        disableId={true}
      />
      {/* </Slide> */}
    </>
  );
}

export default EditPost;
