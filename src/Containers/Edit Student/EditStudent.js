import React, { useState } from "react";
import { DenseAppBar, InputPage } from "../../Components";
import List from "../../Components/StudentTable/Table";
import Grid from "@material-ui/core/Grid";
import "./EditStudent.css";
import firebaseApp from "../../Config/Firebase/Firebase";
import { MDBBtn } from "mdbreact";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EditUi = ({ data, isAttendance }) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const fullName = `${item.studentName} ${item.fatherName}`.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

    console.log(searchTerm, "------", fullName.startsWith(searchTermLower));

    if (isNaN(searchTerm) && searchTerm.length > 0) {
      // Search by name
      return fullName.startsWith(searchTermLower);
    } else if (!isNaN(searchTerm) && searchTerm.length > 0) {
      // Search by phone number
      return item.phoneNumber.includes(searchTerm);
    }

    return item;
  });

  const addStudent = () => {
    history.push("/add-student");
  };

  let title = ["Name", "Phone Number", "City", "Actions"];

  // console.log("filteredData", filteredData);
  return (
    <div style={{ marginTop: 50 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Grid item xs={5} sm={5} md={5} lg={5}>
            <InputPage
              label="Search:"
              placeholder="Search by name or phone number"
              onChange={handleSearchChange}
              style={{ marginBottom: "20px" }}
            />
          </Grid>

          <List
            data={filteredData}
            heading={title}
            isAttendance={isAttendance}
          />
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
    if (this.props.students) {
      allStudents = this.props.students;
      this.setState({
        allStudents,
      });
    } else
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
        {this.props.isAttendance ? (
          <EditUi data={this.state.allStudents} isAttendance={true} />
        ) : (
          <DenseAppBar
            name="Students"
            component={
              <EditUi
                data={this.state.allStudents}
                isAttendance={this.props.isAttendance}
              />
            }
          />
        )}
      </div>
    );
  }
}

export default EditStudent;
