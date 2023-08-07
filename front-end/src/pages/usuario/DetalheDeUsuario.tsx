import {
  Alert,
  Box,
  Grid,
  LinearProgress,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import * as yup from "yup";
import { UserService } from "../../shared/services/api/users/UserService";

interface IFormData {
  email: string;
  password: string;
  user: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
  user: yup.string().required(),
});

export const DetalheDeUsuarios: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isMensagem, setIsMensagem] = useState("");

  const { id = "novo" } = useParams<"id">();

  const navigate = useNavigate();
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmID, setconfirmID] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [abrir, setAbrir] = useState(true);

  const handleClick = () => {
    setOpen(true);
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

  useEffect(() => {
    if (id !== "novo") {
      setIsLoading(true);

      UserService.getById(id).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          navigate("/");
        } else {
          setNome(result.user);
          formRef.current?.setData(result);          
        }
      });
    } else {
      setAbrir(false),
        formRef.current?.setData({
          email: "",
          password: "",
          user: "",
        });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === "novo") {
          UserService.create(dadosValidados).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              setIsMensagem("Usuário Cadastrado com sucesso");
              handleClick();
              if (isSaveAndClose()) {
                navigate("/");
              }
            } else {
              setIsMensagem("Usuário Cadastrado com sucesso");
              handleClick();
              navigate(`/usuarios/detalhe/${result}`);
            }
          });
        } else {
          UserService.updateById({ id, ...dadosValidados }).then((result) => {
            setIsLoading(false);
            setIsMensagem("Usuário Atualizado com sucesso");
            handleClick();
            if (result instanceof Error) {
              setIsMensagem("Usuário Atualizado com sucesso");
            } else {
              if (isSaveAndClose()) {
                navigate("/");
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

  return (
    <LayoutBaseDePagina    
      barraDeFerramentas={
        <FerramentasDeDetalhe
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={false}
          mostrarBotaoApagar={false}
          mostrarBotaoAbrir={abrir === true}
          mostrarBotaoFechar={abrir === false}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEVoltar={saveAndClose}
          aoClicarEmApagar={() => {
            setConfirmOpen(true), setconfirmID(id);
          }}
          aoClicarEmVoltar={() => navigate("/")}
          aoClicarEmFechar={() => setAbrir(true)}
          aoClicarEmAbrir={() => setAbrir(false)}
        />
      }
    >
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {isMensagem}
        </Alert>
      </Snackbar>

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Cadastrar Acesso</Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                <Typography
                  sx={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  Usuário
                </Typography>

                <VTextField
                  placeholder={"Usuário"}
                  name="user"
                  size="small"
                  disabled={isLoading || abrir}
                  style={{
                    backgroundColor: abrir === true ? "#bfbcc752" : "",
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                <Typography
                  sx={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  Email
                </Typography>

                <VTextField
                  placeholder={"Email"}
                  size="small"
                  name="email"
                  type="email"
                  disabled={isLoading || abrir}
                  style={{
                    backgroundColor: abrir === true ? "#bfbcc752" : "",
                  }}
                  autoFocus
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={4} md={3} lg={3} xl={3}>
                <Typography
                  sx={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  Senha
                </Typography>

                <VTextField
                  placeholder={"Senha"}
                  size="small"
                  name="password"
                  type="password"
                  disabled={isLoading || abrir}
                  style={{
                    backgroundColor: abrir === true ? "#bfbcc752" : "",
                  }}
                  autoFocus
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
