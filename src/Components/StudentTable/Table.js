import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import firebaseApp from "../../Config/Firebase/Firebase";
import Grid from "@material-ui/core/Grid";
import { CheckBox } from "@material-ui/icons";

class Table extends React.Component {
  constructor() {
    super();
    this.state = {
      allStudents: [],
      name: "snackbar",
    };
  }
  componentDidMount() {
    this.setState({ allStudents: this.props.data });
  }

  deleteStudent = (val, i) => {
    let { allStudents } = this.state;
    firebaseApp
      .firestore()
      .collection("students")
      .doc(val.id)
      .delete()
      .then(allStudents.splice(i, 1));
    this.setState({});
    setTimeout(() => {
      this.setState({ name: "snackbar" });
    }, 3000);
    this.setState({
      allStudents,
      name: "show",
      message: "Student Deleted Succesfully",
    });
  };

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} sm={12} lg={12}>
            <table className="table table-bordered table-responsive-md table-striped text-center">
              <thead>
                <tr>
                  <th>#</th>
                  {this.props.heading.map((val, ind) => {
                    return (
                      <th key={ind} className="text-center">
                        {val}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody>
                {this.state.allStudents.map((val, ind) => {
                  return (
                    <tr key={ind}>
                      <th scope="row">{ind + 1}</th>
                      <td>
                        {val.studentName} {val.fatherName}
                      </td>
                      <td>{val.phoneNumber}</td>
                      <td>{val.city}</td>
                      <td>
                        {this.props.isAttendance ? (
                          <CheckBox />
                        ) : (
                          <DeleteIcon
                            onClick={() => this.deleteStudent(val, ind)}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div id="snackbar" className={this.state.name}>
              {this.state.message}
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Table;
