import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import firebaseApp from "../../Config/Firebase/Firebase";
import Grid from "@material-ui/core/Grid";
import { CheckBox } from "@material-ui/icons";

const Table = ({ data = [], heading, isAttendance, onCheckIn }) => {
  const [allStudents, setAllStudents] = useState(data);
  const [snackbar, setSnackbar] = useState({ show: false, message: "" });

  useEffect(() => {
    setAllStudents(data);
  }, [data]);

  const deleteStudent = (val, i) => {
    firebaseApp
      .firestore()
      .collection("students")
      .doc(val.id)
      .delete()
      .then(() => {
        const updatedStudents = allStudents.filter((_, index) => index !== i);
        setAllStudents(updatedStudents);
        setSnackbar({ show: true, message: "Student Deleted Successfully" });
        setTimeout(() => setSnackbar({ show: false, message: "" }), 3000);
      });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} sm={12} lg={12}>
          <table className="table table-bordered table-responsive-md table-striped text-center">
            <thead>
              <tr>
                <th>#</th>
                {heading.map((val, ind) => (
                  <th key={ind} className="text-center">
                    {val}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allStudents.map((val, ind) => (
                <tr key={ind}>
                  <th scope="row">{ind + 1}</th>
                  <td>
                    {val.studentName} {val.fatherName}
                  </td>
                  <td>{val.phoneNumber}</td>
                  <td>{val.city}</td>
                  <td>
                    {isAttendance ? (
                      <CheckBox onClick={() => onCheckIn(val)} />
                    ) : (
                      <DeleteIcon onClick={() => deleteStudent(val, ind)} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {snackbar.show && (
            <div id="snackbar" className="show">
              {snackbar.message}
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Table;
