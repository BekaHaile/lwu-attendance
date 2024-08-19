import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { MDBInput } from "mdbreact";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { Dropdown } from "semantic-ui-react";
import "./Input.css";
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },

  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: "100%",
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
    <MDBInput
      className="input"
      style={{ width: "100%" }}
      onChange={props.onChange}
      disabled={props.disabled}
      value={props.value}
      label={props.label}
      hint={props.hint}
      type={props.type}
    />
  );
};

const DropdownPage = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    props.onChange(selectedOption);
  };

  const options = props.list.map((val, ind) => ({
    ...val,
    key: ind,
  }));

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided) => ({
      ...provided,
      width: "100%",
    }),
    menu: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  return (
    <form>
      <FormControl className={props.formControl} style={{ width: "100%" }}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          isDisabled={props.disabled}
          isSearchable={true} // Enables search functionality
          placeholder="Select an option"
          styles={customStyles}
        />
      </FormControl>
    </form>
  );
};

const options = [
  { key: "Janurary", text: "Janurary", value: "Janurary" },
  { key: "Feburary", text: "Feburary", value: "Feburary" },
  { key: "March", text: "March", value: "March" },
  { key: "April", text: "April", value: "April" },
  { key: "May", text: "May", value: "May" },
  { key: "June", text: "June", value: "June" },
  { key: "July", text: "July", value: "July" },
  { key: "August", text: "August", value: "August" },
  { key: "Septemeber", text: "Septemeber", value: "Septemeber" },
  { key: "Octember", text: "Octember", value: "Octember" },
  { key: "December", text: "December", value: "December" },
];

const DropdownExampleMultipleSelection = (props) => (
  <Dropdown
    onChange={props.onChange}
    placeholder="Select Month"
    fluid
    multiple
    selection
    options={options}
  />
);

export {
  OutlinedTextFields,
  InputPage,
  DropdownPage,
  DropdownExampleMultipleSelection,
};
