import React, { Suspense, lazy } from "react";
import "./App.css";
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { dom } from "@fortawesome/fontawesome-svg-core";

import configureStore from "./store";

const store = configureStore();

const Books = lazy(() => import("./components/book"));

dom.watch();

const App = () => (
  <Router>
    <Suspense fallback={<div>Carregando...</div>}>
      <Switch>
        <Provider store={store}>
          <Route exact path="/" component={Books} />
          <Route exact path="/books" render={(props) => <Books {...props} />} />
        </Provider>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
