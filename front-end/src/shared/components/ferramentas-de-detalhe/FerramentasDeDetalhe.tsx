import { Box, Button, Divider, Icon, Paper, Skeleton, Typography, useMediaQuery, useTheme } from "@mui/material"

interface IFerramentasDeDetalheProps {
  textoBotaoNovo?: string;

  mostrarBotaoVotar?: boolean;
  mostrarBotaoAbrir?: boolean;
  mostrarBotaoFechar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoSalvar?: boolean;
  mostrarBotaoSalvarEVoltar?: boolean;


  mostrarBotaoFecharCarregando?: boolean;
  mostrarBotaoVotarCarregando?: boolean;
  mostrarBotaoAbrirCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;
  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoSalvarEVoltarCarregando?: boolean;


  aoClicarEmNovo?: () => void;
  aoClicarEmFechar?: () => void;
  aoClicarEmAbrir?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
  aoClicarEmSalvarEVoltar?: () => void;

}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
  textoBotaoNovo = 'Novo',

  mostrarBotaoVotar = true,
  mostrarBotaoNovo = true,
  mostrarBotaoApagar = true,
  mostrarBotaoSalvar = true,
  mostrarBotaoAbrir = true,
  mostrarBotaoSalvarEVoltar = false,
  mostrarBotaoFechar = false,




  mostrarBotaoVotarCarregando = false,
  mostrarBotaoNovoCarregando = false,
  mostrarBotaoApagarCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoAbrirCarregando = false,
  mostrarBotaoSalvarEVoltarCarregando = false,
  mostrarBotaoFecharCarregando = false,

  aoClicarEmFechar,
  aoClicarEmAbrir,
  aoClicarEmNovo,
  aoClicarEmVoltar,
  aoClicarEmApagar,
  aoClicarEmSalvar,
  aoClicarEmSalvarEVoltar,


}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {(mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando) && (
        <Button
          color="primary"
          disableElevation
          variant="contained"
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow='ellipsis' overflow="hidden">
            Salvar
          </Typography>
        </Button>
      )}
      {mostrarBotaoSalvarCarregando && (
        <Skeleton width={110} height={60} />

      )}
      {(mostrarBotaoAbrir && !mostrarBotaoAbrirCarregando) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>note_alt</Icon>}
          onClick={aoClicarEmAbrir}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow='ellipsis' overflow="hidden">
            Abrir
          </Typography>
        </Button>
      )}
      {mostrarBotaoAbrirCarregando && (
        <Skeleton width={110} height={60} />

      )}
      {(mostrarBotaoFechar && !mostrarBotaoFecharCarregando) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>cancel</Icon>}
          onClick={aoClicarEmFechar}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow='ellipsis' overflow="hidden">
            Fechar
          </Typography>
        </Button>
      )}
      {mostrarBotaoFecharCarregando && (
        <Skeleton width={110} height={60} />
      )}

      {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvarEVoltar}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow='ellipsis' overflow="hidden">
            Salvar e voltar
          </Typography>
        </Button>
      )}
      {(mostrarBotaoSalvarEVoltarCarregando && !smDown && !mdDown) && (
        <Skeleton width={180} height={60} />
      )}
      {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow='ellipsis' overflow="hidden">
            Apagar
          </Typography>
        </Button>
      )}
      {mostrarBotaoApagarCarregando && (
        <Skeleton width={110} height={60} />
      )}
      {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarEmNovo}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow='ellipsis' overflow="hidden">
            {textoBotaoNovo}
          </Typography>
        </Button>
      )}
      {(mostrarBotaoNovoCarregando && !smDown) && (
        <Skeleton width={110} height={60} />
      )}     

      {mostrarBotaoVotar && (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvarEVoltar || mostrarBotaoSalvar ) && (
        <Divider variant='middle' orientation='vertical' />
      )}
      {(mostrarBotaoVotar && !mostrarBotaoVotarCarregando) && (
        <Button
          color="primary"
          disableElevation
          variant="outlined"
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoClicarEmVoltar}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow='ellipsis' overflow="hidden">
            Voltar
          </Typography>
        </Button>
      )}
      {mostrarBotaoVotarCarregando && (
        <Skeleton width={110} height={60} />
      )}




    </Box>
  )
}