import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { MDBInput,MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem  } from "mdbreact";


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

function OutlinedTextFields(props) {
  const classes = useStyles();



  return (
    <form className={classes.container} noValidate autoComplete="off">

      <TextField
        id="outlined-email-input"
        label={props.label}
        className={classes.textField}
        type={props.type}
        name={props.name}
        autoComplete="email"
        margin="normal"
        variant="outlined"
        value={props.value}
        onChange={props.onChange}
      />

    </form>
  );
}

const InputPage = (props) => {
  return (
    <MDBInput onChange={props.onChange} value={props.value} hint={props.label} type={props.type} />

  );
}




const DropdownPage = (props) => {
  return (
    <MDBDropdown>
      <MDBDropdownToggle caret color="primary">
        {props.title}
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        <MDBDropdownItem header>{props.intro}</MDBDropdownItem>
        <MDBDropdownItem>{props.val}</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}





export {
  OutlinedTextFields,
  InputPage,
  DropdownPage

}