import { Route, Switch } from "react-router";
import { AboutPage, HomePage, PostPage } from "./Pages";

import { NavBar } from "./Component";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact component={HomePage}></Route>
        <Route path="/about" component={AboutPage}></Route>
        <Route path="/post" component={PostPage}></Route>
        <Route path="*" component={HomePage} />
      </Switch>
    </>
  );
}

export default App;
