import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import {
  Login,
  Home,
  AddClass,
  EditClass,
  Attendance,
  AddStudent,
  DeleteStudent,
  CheckStatus,
} from "../../Containers";
import firebaseApp from "../Firebase/Firebase";
import { Notfound } from "../../Components";
import EditStudent from "../../Containers/Edit Student/EditStudent";

let path = localStorage.getItem("path");
if (!path) {
  path = "/home";
} else {
  path = JSON.parse(path);
}

function PublicRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === false ? <Component {...props} /> : <Redirect to={path} />
      }
    />
  );
}

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

class BasicRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: false,
    };
  }

  componentDidMount() {
    let that = this;
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        that.setState({ auth: true });
      } else {
        that.setState({ auth: false });
      }
    });
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <PublicRoute
              authed={this.state.auth}
              exact
              path="/"
              component={Login}
            />
            <PrivateRoute
              authed={this.state.auth}
              path="/home"
              component={Home}
            />
            <PrivateRoute
              authed={this.state.auth}
              path="/add-class"
              component={AddClass}
            />
            <PrivateRoute
              authed={this.state.auth}
              path="/list-class"
              component={EditClass}
            />
            <PrivateRoute
              authed={this.state.auth}
              path="/list-students"
              component={EditStudent}
            />
            <PrivateRoute
              authed={this.state.auth}
              path="/attendance"
              component={Attendance}
            />
            <PrivateRoute
              authed={this.state.auth}
              path="/add-student"
              component={AddStudent}
            />
            <PrivateRoute
              authed={this.state.auth}
              path="/delete-student"
              component={DeleteStudent}
            />
            <PrivateRoute
              authed={this.state.auth}
              path="/check-status"
              component={CheckStatus}
            />
            <Route path="*" component={Notfound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BasicRouter;
