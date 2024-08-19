import React from "react";
import { DenseAppBar, Paper } from "../../Components";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import firebaseApp from "../../Config/Firebase/Firebase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      totalStudents: 0,
      totalClass: 0,
      totalSection: 0,
    };
  }

  async componentDidMount() {
    let { totalStudents, totalClass } = this.state;

    // Fetch class data
    await firebaseApp
      .firestore()
      .collection("classes")
      .get()
      .then((res) => {
        let classCount = 0;
        res.forEach((doc) => {
          let data = doc.data();
          if (data.className) {
            classCount += 1;
          }
        });
        this.setState({
          totalClass: classCount,
        });
      });

    // Fetch student data
    await firebaseApp
      .firestore()
      .collection("students")
      .get()
      .then((res) => {
        let studentCount = 0;
        res.forEach((doc) => {
          studentCount += 1;
        });
        this.setState({
          totalStudents: studentCount,
        });
      });
  }

  render() {
    const data = [
      { name: "Classes", value: this.state.totalClass },
      { name: "Students", value: this.state.totalStudents },
    ];

    const COLORS = ["#0088FE", "#00C49F"];

    return (
      <div>
        <Grid container spacing={3}>
          {/* Total Students */}
          <Grid item xs={12} sm={6}>
            <Paper>
              <Typography align="center" variant="h5">
                Total Students
              </Typography>
              <Typography align="center" variant="h5">
                {this.state.totalStudents}
              </Typography>
            </Paper>
          </Grid>
          {/* Total Classes */}
          <Grid item xs={12} sm={6}>
            <Paper>
              <Typography align="center" variant="h5">
                Total Classes
              </Typography>
              <Typography align="center" variant="h5">
                {this.state.totalClass}
              </Typography>
            </Paper>
          </Grid>

          {/* Bar Graph */}
          <Grid item xs={12} sm={12}>
            <Paper>
              <Typography align="center" variant="h5">
                Total Students & Classes (Bar Graph)
              </Typography>
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  render() {
    return (
      <div>
        <DenseAppBar name="Dashboard" component={<Dashboard />} />
      </div>
    );
  }
}

export default Home;
