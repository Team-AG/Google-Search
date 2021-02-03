import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBook from "./pages/SearchBook";
import SaveThatBookPlease from "./pages/SaveThatBookPlease";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import NavBar from "./components/Header/NavBar";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path={["/", "/SearchBook"]} >
            <SearchBook />
          </Route>
          {/* component={Saved} */}
          <Route exact path="/SaveThatBookPlease">
            <SaveThatBookPlease />
          </Route>
          <Route exact path="/NoMatch" >
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
