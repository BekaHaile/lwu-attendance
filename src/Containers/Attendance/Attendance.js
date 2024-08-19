import React from "react";
import { DenseAppBar, Paper, DropdownPage } from "../../Components";
import Grid from "@material-ui/core/Grid";
import { MDBFormInline, MDBBtn } from "mdbreact";
import firebaseApp from "../../Config/Firebase/Firebase";
import "./Attendance.css";
import EditStudent from "../Edit Student/EditStudent";

class AttendanceUi extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      classesNames: [],
      class: "",
      start: true,
      name: "",
      name1: "snackbar",
      message: "",
      searchDisabled: true,
    };
  }

  async componentDidMount() {
    let { classesNames } = this.state;
    await firebaseApp
      .firestore()
      .collection("classes")
      .get()
      .then((res) => {
        res.forEach((doc, index) => {
          let id = doc.id;
          let data = doc.data();
          data.id = id;
          classesNames.push({
            value: data.id,
            label: data.className,
            key: index,
          });
          this.setState({
            classesNames,
          });
        });
      });
  }

  getClass = () => {
    this.setState({
      disabled: false,
      start: true,
    });
  };

  endAttendance = () => {
    this.setState({
      disabled: true,
      sec: true,
      tim: true,
      start: true,
      clas: false,
      class: "",
      section: "",
      time: "",
    });
  };

  onCheckIn = async ({ student, checkIn }) => {
    let { phoneNumber } = student;
    var date = new Date();

    let months = [
      `January`,
      `Febuary`,
      `March`,
      `April`,
      `May`,
      `June`,
      `July`,
      `August`,
      `September`,
      `November`,
      `December`,
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    var saveDay = days[date.getDay()];
    var saveMonth = months[date.getMonth()];

    var currentTime = date.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (checkIn) {
      firebaseApp
        .firestore()
        .collection("classes")
        .doc(this.state.class) // Reference to the specific class document
        .set(
          {
            attendance: {
              [phoneNumber]: {
                student: {
                  city: student.city,
                  fatherName: student.fatherName,
                  id: student.id,
                  phoneNumber: student.phoneNumber,
                  studentName: student.studentName,
                },
                time: currentTime,
                day: saveDay,
                month: saveMonth,
              },
            },
          },
          { merge: true } // This will merge the attendance object with any existing data in the document
        );
    } else {
      // Delete the attendance entry for the specific student
      firebaseApp
        .firestore()
        .collection("classes")
        .doc(this.state.class)
        .set(
          {
            [`attendance.${phoneNumber}`]:
              firebaseApp.firestore.FieldValue.delete(),
          },
          { merge: true }
        );
    }

    this.setState({
      message: checkIn
        ? "Student marked Succesfully ✔️✔️✔️"
        : "Student removed from attendance xxx",
      name1: "show",
      number: "",
    });
    setTimeout(() => {
      this.setState({ name1: "snackbar" });
    }, 3000);
  };

  render() {
    return (
      <div>
        <Paper>
          <Grid justifyContent="start" container>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
                gap: 30,
                width: "70vw",
              }}
            >
              <div style={{ flex: 3 }}>
                <DropdownPage
                  value={this.state.class}
                  disabled={this.state.clas}
                  onChange={(e) => {
                    this.setState({ class: e.value, start: false });
                  }}
                  list={this.state.classesNames}
                  label="Select Class Name"
                />
              </div>
              <div className="mdbtn">
                {this.state.class ? (
                  <MDBBtn
                    color="dark"
                    className="mb-3"
                    type="button"
                    onClick={this.endAttendance}
                  >
                    End Attendance
                  </MDBBtn>
                ) : (
                  <MDBBtn
                    color="dark"
                    disabled={this.state.start}
                    className="mb-3"
                    type="button"
                    onClick={this.getClass}
                  >
                    Start Attendance
                  </MDBBtn>
                )}
              </div>
            </div>
          </Grid>
        </Paper>

        <Paper>
          <EditStudent
            isAttendance={true}
            onCheckIn={this.onCheckIn}
            startCheckin={this.state.class}
          />

          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <div className="searchbtn">
                <MDBFormInline className="md-form mr-auto m-0">
                  <input
                    className="form-control mr-sm-2"
                    value={this.state.number}
                    disabled={this.state.disabled}
                    onChange={(e) =>
                      this.setState({
                        number: e.target.value,
                        searchDisabled: false,
                      })
                    }
                    type="number"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <MDBBtn
                    disabled={this.state.searchDisabled}
                    onClick={this.search}
                    color="dark"
                    size="md"
                    type="button"
                    className="mr-auto"
                  >
                    Search
                  </MDBBtn>
                </MDBFormInline>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}></Grid>
          </Grid>
        </Paper>

        <div id="snackbar" className={this.state.name1}>
          {this.state.message}
        </div>
      </div>
    );
  }
}

class Attendance extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  render() {
    return (
      <div>
        <DenseAppBar name="Attendance" component={<AttendanceUi />} />
      </div>
    );
  }
}

export default Attendance;
