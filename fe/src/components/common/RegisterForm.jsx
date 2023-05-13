import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import userApi from "../../api/modules/userApi";
import { setUser } from "../../redux/features/userSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import {
  Alert,
  Box,
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

const RegisterForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Username minimum 8 characters")
        .required("Username is required"),
      displayName: Yup.string()
        .min(8, "Name minimum 8 characters")
        .required("Name is required"),
      password: Yup.string()
        .min(8, "Password minimum 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Confirm password not match")
        .min(8, "Confirm password minimum 8 characters")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      const { response, err } = await userApi.register(values);
      setIsLoginRequest(false);

      if (response) {
        loginForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Login success");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box component="form" onSubmit={loginForm.handleSubmit}>
      <Stack spacing={3}>
        <FormControl
          variant="filled"
          fullWidth
          color="success"
          error={
            loginForm.touched.username &&
            loginForm.errors.username !== undefined
          }
        >
          <InputLabel>Username</InputLabel>
          <FilledInput
            type="text"
            name="username"
            value={loginForm.values.username}
            onChange={loginForm.handleChange}
            autoComplete="on"
          />
          <FormHelperText>
            {loginForm.touched.username && loginForm.errors.username}
          </FormHelperText>
        </FormControl>
        <FormControl
          variant="filled"
          fullWidth
          color="success"
          error={
            loginForm.touched.displayName &&
            loginForm.errors.displayName !== undefined
          }
        >
          <InputLabel>Name</InputLabel>
          <FilledInput
            type="text"
            name="displayName"
            value={loginForm.values.displayName}
            onChange={loginForm.handleChange}
            autoComplete="on"
          />
          <FormHelperText>
            {loginForm.touched.displayName && loginForm.errors.displayName}
          </FormHelperText>
        </FormControl>
        <FormControl
          variant="filled"
          fullWidth
          color="success"
          error={
            loginForm.touched.password &&
            loginForm.errors.password !== undefined
          }
        >
          <InputLabel>Password</InputLabel>
          <FilledInput
            type={showPassword ? "text" : "password"}
            name="password"
            value={loginForm.values.password}
            onChange={loginForm.handleChange}
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>
            {loginForm.touched.password && loginForm.errors.password}
          </FormHelperText>
        </FormControl>
        <FormControl
          variant="filled"
          fullWidth
          color="success"
          error={
            loginForm.touched.confirmPassword &&
            loginForm.errors.confirmPassword !== undefined
          }
        >
          <InputLabel>Confirm Password</InputLabel>
          <FilledInput
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={loginForm.values.confirmPassword}
            onChange={loginForm.handleChange}
            autoComplete="off"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>
            {loginForm.touched.confirmPassword &&
              loginForm.errors.confirmPassword}
          </FormHelperText>
        </FormControl>
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Register
      </LoadingButton>

      <Button
        size="large"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={() => switchAuthState()}
      >
        Login
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default RegisterForm;
