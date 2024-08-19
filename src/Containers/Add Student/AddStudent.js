import React from "react";
import Grid from "@material-ui/core/Grid";
import { Paper, InputPage, DenseAppBar } from "../../Components";
import { MDBBtn } from "mdbreact";
import firebaseApp from "../../Config/Firebase/Firebase";

class AddStudentUi extends React.Component {
  constructor() {
    super();
    this.state = {
      name1: "snackbar",
      message: "",
      fatherValidate: true,
      phoneValidate: true,
      cityValidate: true,
      disbBtn: true,
      studentName: "",
      fatherName: "",
      phoneNumber: "",
      city: "",
    };
  }

  AddStudent = async () => {
    let { StudentName, FatherName, PhoneNumber, city } = this.state;
    let obj = {
      attendance: {},
      studentName: StudentName,
      fatherName: FatherName,
      phoneNumber: PhoneNumber,
      city: city,
    };

    if (PhoneNumber === undefined) {
      this.setState({
        message: "Enter Phone Number ",
        name1: "show",
        number: "",
      });
    } else {
      await firebaseApp
        .firestore()
        .collection("students")
        .doc(PhoneNumber)
        .set(obj)
        .then(() => {
          this.setState({
            message: "Student Added Successfully ✔️✔️",
            name1: "show",
            number: "",
          });
        })
        .catch((error) => {
          console.error("Error adding student: ", error);
          this.setState({
            message: `Error adding student ${error}`,
            name1: "show",
            number: "",
          });
        });

      setTimeout(() => {
        this.setState({ name1: "snackbar" });
      }, 3000);
    }

    this.setState({
      StudentName: "",
      FatherName: "",
      PhoneNumber: "",
      city: "",
      fatherValidate: true,
      rollValidate: true,
      cityValidate: true,
      disbBtn: true,
    });
  };

  render() {
    return (
      <div>
        <Grid justifyContent="center" container spacing={4}>
          <Grid item xs={11} md={8} lg={6}>
            <Paper>
              <InputPage
                type="text"
                label="Student Name"
                value={this.state.StudentName}
                onChange={(e) =>
                  this.setState({
                    StudentName: e.target.value,
                    fatherValidate: false,
                  })
                }
              />
              <InputPage
                type="text"
                label="Father Name"
                value={this.state.FatherName}
                disabled={this.state.fatherValidate}
                onChange={(e) =>
                  this.setState({
                    FatherName: e.target.value,
                    phoneValidate: false,
                  })
                }
              />
              <InputPage
                type="number"
                label="Phone Number"
                placeholder="052-xxx-xxxx"
                value={this.state.PhoneNumber}
                disabled={this.state.phoneValidate}
                onChange={(e) =>
                  this.setState({
                    PhoneNumber: e.target.value,
                    cityValidate: false,
                  })
                }
              />
              <InputPage
                type="text"
                label="City"
                value={this.state.city}
                disabled={this.state.cityValidate}
                onChange={(e) =>
                  this.setState({
                    city: e.target.value,
                    disbBtn: false,
                  })
                }
              />
              <div className="mdbtn">
                <MDBBtn
                  color="dark"
                  disabled={this.state.disbBtn}
                  className="mb-3"
                  type="button"
                  onClick={this.AddStudent}
                >
                  Add Student
                </MDBBtn>
              </div>
            </Paper>
          </Grid>
        </Grid>

        <div id="snackbar" className={this.state.name1}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default class AddStudent extends React.Component {
  render() {
    return (
      <div>
        <DenseAppBar name="Add Student" component={<AddStudentUi />} />
      </div>
    );
  }
}
