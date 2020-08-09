import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Landing from "./Pages/Home/Landing.js";
import Blogs from "./Pages/Blogs.jsx";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          <Switch>
            {/* <Suspense fallback={loading()}> */}
              <Route exact path="/register">
                <SignUp />
              </Route>
              {/* <Route exact path="/blogs">
              <Blogs />
            </Route> */}
              <Route path="/home" component={Landing} />
              <Route exact path="/">
                <SignIn />
              </Route>
            {/* </Suspense> */}
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
export default App;
