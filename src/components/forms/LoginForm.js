import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";
import "./LoginForm.css";

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "#e50914",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#e50914",
    },
    "& .MuiInput-input": {
      color: "white",
      padding: "10px 0",
    },
    "& .MuiInput-formControl": {
      color: "white",
    },
    "& label": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
  },
});

function LoginForm({ onSubmit }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.email && input.password) {
      onSubmit(input);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="loginForm">
      <FormControl classes={classes} style={{ width: "250px" }}>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          required
          placeholder="Email"
          id="email"
          type="email"
          value={input.email}
          name="email"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl classes={classes} style={{ width: "250px" }}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          required
          placeholder="Password"
          id="password"
          type={showPassword ? "text" : "password"}
          value={input.password}
          name="password"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Visibility style={{ color: "white" }} />
                ) : (
                  <VisibilityOff style={{ color: "white" }} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        type="submit"
        style={{
          backgroundColor: "#e50914",
          color: "white",
          margin: "10px 0",
        }}
      >
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
