import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import * as yup from "yup";
import { useAuthContext } from "../../contexts";
import logo from "../../../assets/logo.jpg";
import backgroundLogo from "../../../assets/background-login.jpg";
import { UserService } from "../../services/api/users/UserService";

const loginSchema = yup.object().shape({
  user: yup.string().required(),
  password: yup.string().required().min(5),
});

const cadastreseShema = yup.object().shape({
  email: yup.string().required().email(),
  user: yup.string().required(),
  password: yup.string().required().min(5),
});

interface ILoginProps {
  children: React.ReactNode;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [isCadastrese, setIsCadastrese] = useState(false);
  const [cadastreseMessage, setCadastreseMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [cadastrese, setCadastrese] = useState(false);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [open, setOpen] = useState(false);

  const cadastreseButton = () => {
    setIsCadastrese(!isCadastrese);
    setCadastrese(false);
  };
 
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const cadastreseSubmit = () => {
    setIsLoading(true);
    cadastreseShema
      .validate({ user, password, email }, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        UserService.create(dadosValidados).then(() => {
          setIsLoading(false);
          setCadastreseMessage("Cadastardo com sucesso!")
          cadastreseButton()
          setOpen(true);
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach((error) => {
          if (error.path === "user") {
            setUserError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }else if (error.path === "email") {
            setEmailError(error.message);
          }
        });
      });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    loginSchema
      .validate({ user, password }, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        login(dadosValidados.user, dadosValidados.password).then(() => {
          setIsLoading(false);         
        });
      })
      .catch((errors: yup.ValidationError) => {
        setIsLoading(false);
        errors.inner.forEach((error) => {
          if (error.path === "user") {
            setUserError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      });
  };

  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Feito com ❤️ pela "}
        <Link
          color="inherit"
          href="https://www.linkedin.com/in/agnaldocordeiro/"
        >
          AgnaldoCordeiro
        </Link>
        {" . "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  if (isAuthenticated) return <>{children}</>;

  return (  
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage: `url(${backgroundLogo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

<Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
  >
    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
      {cadastreseMessage}
    </Alert>
  </Snackbar>

      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Box
            component="img"
            alt="Logo"
            src={logo}
            width={"85px"}
            borderRadius={"50px"}
          />

          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: 200,
              margin: 1,
              textAlign: "center",
              fontSize: 28,
            }}
          >
            {isCadastrese === false
              ? "Acesse nossa plataforma"
              : "Cadastrar-se em nossa plataforma"}
          </Typography>
          {isCadastrese === false ? (
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                autoFocus
                label="Usuário"
                type="user"
                value={user}
                disabled={isLoading}
                error={!!userError}
                helperText={userError}
                onChange={(e) => setUser(e.target.value)}
                onKeyDown={(e) => setUserError("")}
              />

              <TextField
                margin="normal"
                fullWidth
                autoFocus
                label="Senha"
                type="password"
                value={password}
                disabled={isLoading}
                error={!!passwordError}
                helperText={passwordError}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => setPasswordError("")}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                endIcon={
                  isLoading ? (
                    <CircularProgress
                      variant="indeterminate"
                      color="inherit"
                      size={20}
                    />
                  ) : undefined
                }
                sx={{ mt: 3, mb: 2 }}
              >
                Acessar
              </Button>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="right"
                sx={{ my: 2 }}
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                  onClick={() => cadastreseButton()}
                >
                  Cadastrar-se
                </Link>
              </Stack>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          ) : cadastrese === false ? (
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                autoFocus
                label="E-mail"
                type="email"
                value={email}
                disabled={isLoading}
                error={!!emailError}
                helperText={emailError}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => setEmailError("")}
              />

              <TextField
                margin="normal"
                fullWidth
                autoFocus
                label="Usuario"
                type="user"
                value={user}
                disabled={isLoading}
                error={!!userError}
                helperText={userError}
                onChange={(e) => setUser(e.target.value)}
                onKeyDown={(e) => setUserError("")}
              />

              <TextField
                margin="normal"
                fullWidth
                autoFocus
                label="Senha"
                type="password"
                value={password}
                disabled={isLoading}
                error={!!passwordError}
                helperText={passwordError}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => setPasswordError("")}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={cadastreseSubmit}
                endIcon={
                  isLoading ? (
                    <CircularProgress
                      variant="indeterminate"
                      color="inherit"
                      size={20}
                    />
                  ) : undefined
                }
                sx={{ mt: 3, mb: 2 }}
              >
                Cadastrar
              </Button>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="right"
                sx={{ my: 2 }}
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                  onClick={() => setIsCadastrese(!isCadastrese)}
                >
                  Voltar a tela de login?
                </Link>
              </Stack>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          ) : (
            <Box sx={{ mt: 1 }}>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontWeight: 300,
                  margin: 1,
                  textAlign: "center",
                  fontSize: 28,
                  color: "green",
                }}
              >
                {cadastreseMessage}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="right"
                sx={{ my: 2 }}
              >
                <Link
                  variant="subtitle2"
                  underline="hover"
                  onClick={() => setIsCadastrese(!isCadastrese)}
                >
                  Voltar a tela de login?
                </Link>
              </Stack>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
   
  );
};
