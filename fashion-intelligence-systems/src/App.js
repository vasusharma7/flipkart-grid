import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Landing from "./Pages/Home/Landing.jsx";
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/register">
              <SignUp />
            </Route>
            <Route exact path="/home">
              <Landing />
            </Route>
            <Route path="/">
              <SignIn />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
export default App;
