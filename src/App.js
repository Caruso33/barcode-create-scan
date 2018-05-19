import React, { Component, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import CreateBarcode from './createBarcode';
import ScanBarcode from './scanBarcode';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Fragment>
              <Link to="/scan">
                <button>Scan Barcode</button>
              </Link>
              <Link to="/create">
                <button>Create Barcode</button>
              </Link>
            </Fragment>
          )}
        />
        <Route path="/scan" component={ScanBarcode} />
        <Route path="/create" component={CreateBarcode} />
      </Switch>
    );
  }
}

export default App;
