import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Form } from "../../Component";
import { fetchUsers } from "../../Helper";

function CreatePost({ addPost }) {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  const initialize = async () => {
    const userData = await fetchUsers();
    setUsers(userData);
  };

  useEffect(() => {
    let isMount = true;
    isMount && initialize();
    return () => {
      isMount = false;
    };
  }, []);
  return (
    <>
      {/* <Slide direction="left" in={true} mountOnEnter unmountOnExit> */}
      <Form
        initialValues={{
          userId: "",
          id: "",
          title: "",
          body: "",
        }}
        atSubmit={(values) => {
          console.log(values);
          addPost(values);
          history.replace("/post");
        }}
        heading={"Create Post"}
        users={users}
        // validate={{}}
        disableId={true}
        hideId={true}
      />
      {/* </Slide> */}
    </>
  );
}

export default CreatePost;
