/* eslint-disable no-unused-vars */
import SearchPage from "./container/SearchPage";
import RegisterPage from "./container/RegisterPage";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <RegisterPage />
        </Route>
        <Route exact path="/search">
          <SearchPage />
        </Route>
      </Switch>
    </>
  );
}
export default App;
