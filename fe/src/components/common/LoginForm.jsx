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

const LoginForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Username minimum 8 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(8, "Password minimum 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);

      const { response, err } = await userApi.login(values);
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
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>
            {loginForm.touched.password && loginForm.errors.password}
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
        Login
      </LoadingButton>

      <Button
        size="large"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={() => switchAuthState()}
      >
        Register
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

export default LoginForm;
