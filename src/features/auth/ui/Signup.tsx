import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useAppDispatch, useAppSelector } from "../../../common/hooks/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUser } from "../bll/authSlices";
import { Path } from "../../../common/enum/path";
import { selectorUserAuthName } from "../bll/authSelectors";

type InputsType = {
  name: string;
  email: string;
  password: string;
};

export const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector(selectorUserAuthName);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<InputsType>({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    mode: "onChange"
  });

  const onSubmit = async (values: InputsType) => {
    dispatch(createUser(values));
  };

  if (isAuth) {
    return <Navigate to={Path.Users} />;
  }

  const toLogin = () => {
    return navigate(`${Path.Login}`);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  label="User Name"
                  error={Boolean(errors.name?.message)}
                  helperText={errors.name?.message}
                  {...register("name", { required: "Enter user name." })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                  type="email"
                  {...register("email", { required: "Enter your mail" })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  error={Boolean(errors.password?.message)}
                  helperText={errors.password?.message}
                  {...register("password", { required: "Enter your password" })}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Sign Up
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick={toLogin}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
