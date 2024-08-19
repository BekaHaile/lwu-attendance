import React, { useEffect, useState } from "react";
import { DenseAppBar, InputPage } from "../../Components";
import List from "../../Components/StudentTable/Table";
import Grid from "@material-ui/core/Grid";
import "./EditStudent.css";
import firebaseApp from "../../Config/Firebase/Firebase";
import { MDBBtn } from "mdbreact";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EditUi = ({ data, isAttendance, onCheckIn, startCheckin }) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((item) => {
    const fullName = `${item.studentName} ${item.fatherName}`.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();

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
            onCheckIn={onCheckIn}
            startCheckin={startCheckin}
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

const EditStudent = ({ students, isAttendance, onCheckIn, startCheckin }) => {
  const [allStudents, setAllStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (students) {
        setAllStudents(students);
      } else {
        const studentDocs = await firebaseApp
          .firestore()
          .collection("students")
          .get();
        const fetchedStudents = studentDocs.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
        setAllStudents(fetchedStudents);
      }
    };
    fetchStudents();
  }, [students]);

  return (
    <div>
      {isAttendance ? (
        <EditUi
          data={allStudents}
          isAttendance={true}
          onCheckIn={onCheckIn}
          startCheckin={startCheckin}
        />
      ) : (
        <DenseAppBar
          name="Students"
          component={<EditUi data={allStudents} isAttendance={isAttendance} />}
        />
      )}
    </div>
  );
};

export default EditStudent;
