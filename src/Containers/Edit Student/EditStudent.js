import React from "react";
import { DenseAppBar } from "../../Components";
import List from "../../Components/StudentTable/Table";
import Grid from "@material-ui/core/Grid";
import "./EditStudent.css";
import firebaseApp from "../../Config/Firebase/Firebase";
import { MDBBtn } from "mdbreact";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EditUi = ({ data, isAttendance }) => {
  const history = useHistory();

  const addStudent = () => {
    history.push("/add-student");
  };

  let title = ["Name", "Phone Number", "City", "Actions"];
  return (
    <div style={{ marginTop: 50 }}>
      <Grid justifyContent="center" container spacing={3}>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <List data={data} heading={title} isAttendance={isAttendance} />
        </Grid>
        {!isAttendance && (
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <div className="mdbtn">
              <MDBBtn
                color="dark"
                className="mb-3"
                type="button"
                onClick={addStudent}
              >
                Add Student
              </MDBBtn>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

class EditStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      allStudents: [],
    };
  }

  async componentDidMount() {
    let { allStudents } = this.state;
    await firebaseApp
      .firestore()
      .collection("students")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          let id = doc.id;
          let data = doc.data();
          data.id = id;
          allStudents.push(data);
          this.setState({
            allStudents,
          });
        });
      });
  }

  render() {
    return (
      <div>
        <DenseAppBar
          name="Students"
          component={
            <EditUi
              data={this.state.allStudents}
              isAttendance={this.props.isAttendance}
            />
          }
        />
      </div>
    );
  }
}

export default EditStudent;
