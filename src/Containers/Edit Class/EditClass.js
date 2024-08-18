import React from "react";
import { DenseAppBar, List } from "../../Components";
import Grid from "@material-ui/core/Grid";
import "./EditClass.css";
import firebaseApp from "../../Config/Firebase/Firebase";
import { MDBBtn } from "mdbreact";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const EditUi = ({ data }) => {
  const history = useHistory();

  const addClass = () => {
    history.push("/add-class");
  };

  let title = ["Class Name", "Class Time", "Delete Class"];
  return (
    <div style={{ marginTop: 50 }}>
      <Grid justifyContent="center" container spacing={3}>
        <Grid item xs={10} sm={10} md={10} lg={10}>
          <List data={data} heading={title} />
        </Grid>
        <Grid item xs={2} sm={2} md={2} lg={2}>
          <div className="mdbtn">
            <MDBBtn
              color="dark"
              className="mb-3"
              type="button"
              onClick={addClass}
            >
              Add Class
            </MDBBtn>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

class EditClass extends React.Component {
  constructor() {
    super();
    this.state = {
      allClasses: [],
    };
  }

  async componentDidMount() {
    let { allClasses } = this.state;
    await firebaseApp
      .firestore()
      .collection("classes")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          let id = doc.id;
          let data = doc.data();
          data.id = id;
          allClasses.push(data);
          this.setState({
            allClasses,
          });
        });
      });
  }

  render() {
    return (
      <div>
        <DenseAppBar
          name="Classes"
          component={<EditUi data={this.state.allClasses} />}
        />
      </div>
    );
  }
}

export default EditClass;
