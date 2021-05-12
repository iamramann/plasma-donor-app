/* eslint-disable no-unused-vars */
import SearchPage from "./containers/SearchPage";
import Register from "./containers/Register";
import { Switch, Route } from "react-router-dom";
// import HelpPage from "./container/HelpPgae";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Register />
        </Route>
        <Route exact path="/search">
          <SearchPage />
        </Route>
      </Switch>
    </>
  );
}
export default App;
