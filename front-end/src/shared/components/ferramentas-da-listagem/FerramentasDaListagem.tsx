import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/Search';

import { Environment } from "../../environment";

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;

  textoBotaoNovo?: string;
  aoClicarEmNovo?: () => void;
  mostrarBotaoNovo?: boolean;
  
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  textoDaBusca = '',
  mostrarInputBusca = false,
  aoMudarTextoDeBusca,
  aoClicarEmNovo,
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,

 
}) => {
  const theme = useTheme()

  return (
    <Box
      gap={1}
      marginRight={1}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
    >
      {
        mostrarInputBusca && (
          <TextField fullWidth sx={{ m: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            size="small"
            value={textoDaBusca}
            onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
            placeholder={Environment.INPUT_DE_BUSCA}
          />
        )
      }
      <Box flex={1} display="flex" justifyContent="end">
        <Box >
          {mostrarBotaoNovo && (<Button
            sx={{ margin: 1 }}
            color="primary"
            disableElevation
            variant="contained"
            endIcon={<Icon>add</Icon>}
            onClick={aoClicarEmNovo}
          >{textoBotaoNovo}</Button>)}
        </Box>
      </Box>     
    </Box>
  );
}