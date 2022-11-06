import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  SigninFormValues,
  signinValidationSchema,
} from "../../../validation/signinValidation";
import { useSigninMutation } from "../../../store/api/authApi";
import { Paths } from "../../../routes";

const SigninForm: FC = () => {
  const [signin, { isLoading }] = useSigninMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SigninFormValues>({
    mode: "onBlur",
    resolver: yupResolver(signinValidationSchema),
  });
  const navigate = useNavigate();

  const signinHandler = async (values: SigninFormValues) => {
    await signin(values);
    reset();
    navigate(Paths.ROOMS);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(signinHandler)}>
      <TextField
        label="Email"
        type="email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Password"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button
        type="submit"
        disabled={isLoading}
        endIcon={isLoading && <CircularProgress size="1rem" color="inherit" />}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SigninForm;
