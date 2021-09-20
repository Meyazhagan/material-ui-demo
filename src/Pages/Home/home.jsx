import { AlertSnack } from "../../Component";

function HomePage() {
  return (
    <>
      <p>Home Page</p>
      <AlertSnack
        message={"Hello from Home"}
        handleUndo={(close) => {
          console.log("clicked undo");
          close();
        }}
      />
    </>
  );
}

export default HomePage;
