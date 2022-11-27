import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useForm } from "react-hook-form";
import { loginIn } from "../bll/authSlices";
import { useAppDispatch } from "../../../common/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { Path } from "../../../common/enum/path";

type InputsType = {
  email: string;
  password: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<InputsType>({
    defaultValues: {
      email: "",
      password: ""
    },
    mode: "onChange"
  });

  const onSubmit = async (values: InputsType) => {
    dispatch(loginIn(values));
  };

  const toSignup = () => {
    return navigate(`${Path.Signup}`);
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
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              error={Boolean(errors.email?.message)}
              helperText={errors.email?.message}
              {...register("email", { required: "Enter your mail" })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              error={Boolean(errors.password?.message)}
              helperText={errors.password?.message}
              {...register("password", { required: "Specify password" })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isValid}
            >
              Login
            </Button>
          </form>
          <Grid>
            <Link variant="body2" onClick={toSignup}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
