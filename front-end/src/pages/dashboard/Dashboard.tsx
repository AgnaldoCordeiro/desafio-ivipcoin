import { FerramentasDaListagem, FerramentasDeDetalhe } from "../../shared/components";
import { useAuthContext } from "../../shared/contexts";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { Box, Typography } from "@mui/material";



export const Dashboard = () => {

  const { dadosUser} = useAuthContext()


  return (
    <LayoutBaseDePagina
      titulo=''
      >
       <Box width='100%' display='flex'>  
       <Typography>{dadosUser?.id}</Typography>
       
       </Box>
    </LayoutBaseDePagina>
  );
}