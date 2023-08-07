import React, { useState, useEffect } from "react";
import {
  Alert,
  Box,
  Grid,
  LinearProgress,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { VTextField, VForm, useVForm, IVFormErrors } from "../../shared/forms";
import { LayoutBaseDePagina } from "../../shared/layouts";
import * as yup from "yup";

import ConfirmSenha from "../../shared/components/confirm-dialog/ConfirmSenha";
import { TaskService } from "../../shared/services/api/task/TaskService";
import { useAuthContext } from "../../shared/contexts";

interface IFormData {
  title: string;
  description: string;
  user_id: string;
}

const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  user_id: yup.string().required(),
});

export const DetalheDeTarefa: React.FC = () => {
  const { dadosUser } = useAuthContext();
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
  const [abrirNovo, setAbrirNovo] = useState(false);

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

      TaskService.getById(id).then((result) => {
        setIsLoading(false);

        if (result instanceof Error) {
          navigate("/tarefas");
        } else {
          setNome(result.title);
          formRef.current?.setData(result);
        }
      });
    } else {
      setAbrir(false),
        formRef.current?.setData({
          title: "",
          description: "",
        });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    const formData = {
      ...dados,
      user_id: dadosUser?.id,
    };

    formValidationSchema
      .validate(formData, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        if (id === "novo") {
          TaskService.create(dadosValidados).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              setIsMensagem("Tarefa Cadastrado com sucesso");
              handleClick();
              if (isSaveAndClose()) {
                navigate("/tarefas");
              }
            } else {
              setIsMensagem("Tarefa Cadastrado com sucesso");
              handleClick();
              navigate(`/tarefa/detalhe/${result}`);
            }
          });
        } else {
          TaskService.updateById({ id, ...dadosValidados }).then((result) => {
            setIsLoading(false);
            setIsMensagem("Tarefa Atualizado com sucesso");
            handleClick();
            if (result instanceof Error) {
              setIsMensagem("Tarefa Atualizado com sucesso");
            } else {
              if (isSaveAndClose()) {
                navigate("/tarefas");
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

  const handleDelete = (id: string) => {
    TaskService.deleteById(id).then((result) => {
      if (result instanceof Error) {
        //  alert(result.message);
      } else {
        navigate("/tarefas");
      }
    });
  };

  return (
    <LayoutBaseDePagina
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Novo"
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== "novo"}
          mostrarBotaoApagar={id !== "novo"}
          mostrarBotaoAbrir={id !== "novo" && abrir === true}
          mostrarBotaoFechar={id !== "novo" && abrir === false}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEVoltar={saveAndClose}
          aoClicarEmApagar={() => {
            setConfirmOpen(true), setconfirmID(id);
          }}
          aoClicarEmVoltar={() => navigate("/tarefas")}
          aoClicarEmNovo={() => navigate("/tarefas/detalhe/novo")}
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

      <ConfirmSenha
        title="Delete Tarefa?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={() => handleDelete(confirmID)}
      >
        Deseja excluir esta tarefa permanentemente?
      </ConfirmSenha>

      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
          justifyContent={"center"}
          alignContent={"center"}
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}

            <Grid item>
              <Typography variant="h6">Cadastrar Tarefa</Typography>
            </Grid>
            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography
                  sx={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  Titulo
                </Typography>

                <VTextField
                  placeholder={"Titulo"}
                  name="title"
                  type="text"
                  size="small"
                  disabled={
                    id !== "novo" ? isLoading || abrir : isLoading || abrirNovo
                  }
                  style={{
                    backgroundColor: abrir === true ? "#bfbcc752" : "",
                    width: "100%",
                  }}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography
                  sx={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    fontSize: "14px",
                  }}
                >
                  Descrição
                </Typography>

                <VTextField
                  placeholder={"Descrição"}
                  name="description"
                  multiline
                  size="small"
                  type="text"
                  disabled={
                    id !== "novo" ? isLoading || abrir : isLoading || abrirNovo
                  }
                  style={{
                    backgroundColor: abrir === true ? "#bfbcc752" : "",
                    width: "100%",
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
