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
      classesSections: [],
      classesTime: [],
      class: "",
      section: "",
      time: "",
      sec: true,
      tim: true,
      start: true,
      name: "",
      name1: "snackbar",
      message: "",
      change: false,
      searchDisabled: true,
    };
  }

  async componentDidMount() {
    let { classesNames, classesSections, classesTime } = this.state;
    await firebaseApp
      .firestore()
      .collection("classes")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          let id = doc.id;
          let data = doc.data();
          data.id = id;
          classesNames.push(data.className);
          classesSections.push(data.classSection);
          classesTime.push(data.classTime);
          this.setState({
            classesNames,
            classesSections,
            classesTime,
          });
        });
      });
  }

  getClass = () => {
    this.setState({
      disabled: false,
      start: true,
      change: true,
    });
  };

  endAttendance = () => {
    this.setState({
      disabled: true,
      sec: true,
      tim: true,
      start: true,
      clas: false,
      change: false,
      class: "",
      section: "",
      time: "",
    });
  };

  search = async () => {
    let { number } = this.state;
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
    let today = date.toISOString().substring(0, 10);
    await firebaseApp
      .firestore()
      .collection(`${this.state.class}-${this.state.section}`)
      .doc(`${number}`)
      .get()
      .then((res) => {
        if (res.data() === undefined) {
          this.setState({
            name1: "show",
            message: "Student Data Not Found ❌ ❌ ❌ ",
            number: "",
          });
          setTimeout(() => {
            this.setState({ name1: "snackbar" });
          }, 3000);
        } else {
          var flag = false;
          let student = res.data();
          Object.entries(student.attendance).forEach((itemArray) => {
            if (itemArray[0] === today) {
              flag = true;
            }
          });

          if (flag === true) {
            this.setState({
              name: student.data.studentName,
              fname: student.data.fatherName,
              rollNum: student.data.rollNumber,
              message: "Student Already marked ✔️",
              name1: "show",
              number: "",
            });
            setTimeout(() => {
              this.setState({ name1: "snackbar" });
            }, 3000);
          } else {
            console.log(student, "dsid");
            firebaseApp
              .firestore()
              .collection(`${this.state.class}-${this.state.section}`)
              .doc(`${number}`)
              .set(
                {
                  attendance: {
                    [today]: {
                      attendance: "present",
                      time: currentTime,
                      day: saveDay,
                      month: saveMonth,
                    },
                  },
                },
                { merge: true }
              );
            this.setState({
              name: student.data.studentName,
              fname: student.data.fatherName,
              rollNum: student.data.rollNumber,
              message: "Student marked Succesfully ✔️✔️✔️",
              name1: "show",
              number: "",
            });
            setTimeout(() => {
              this.setState({ name1: "snackbar" });
            }, 3000);
          }
        }
      });

    this.setState({
      searchDisabled: true,
    });
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
                {this.state.change ? (
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
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <EditStudent isAttendance={true} />

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
