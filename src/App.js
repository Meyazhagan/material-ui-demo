import { Route } from "react-router";
import { AboutPage, HomePage, PostPage } from "./Pages";

import { NavBar } from "./Component";

function App() {
  return (
    <>
      <NavBar />
      <Route path="/" exact component={HomePage}></Route>
      <Route path="/about" component={AboutPage}></Route>
      <Route path="/post" component={PostPage}></Route>
    </>
  );
}

export default App;
