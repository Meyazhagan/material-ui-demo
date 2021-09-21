import { Route, Switch } from "react-router";
import { AboutPage, HomePage, PostPage, NotFound } from "./Pages";
import { BrowserRouter } from "react-router-dom";

import { NavBar } from "./Component";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/about" component={AboutPage}></Route>
          <Route path="/post" component={PostPage}></Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
