import { Icon, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
  children: React.ReactNode;
  titulo?: string;
  barraDeFerramentas?: React.ReactNode;

}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      {!titulo ? <Box padding={0} display="flex" gap={1} alignItems="center" height={theme.spacing(smDown ? 0 : mdDown ? 0 : 0)}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          overflow="hidden"
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          variant={smDown ? 'h5' : mdDown ? 'h6' : 'h3'}
          
        >
          {titulo}
        </Typography>
      </Box> : <Box padding={0} display="flex" gap={1} alignItems="center" height={theme.spacing(smDown ? 6 : mdDown ? 12 : 12)}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          overflow="hidden"
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          variant={smDown ? 'h5' : mdDown ? 'h6' : 'h3'}
          sx={{fontWeight: 200, margin: 1, textAlign: 'center', fontSize: 38}}
        >
          {titulo}
        </Typography>
      </Box>}

      {barraDeFerramentas && (
        <Box>
          {barraDeFerramentas}
        </Box>
      )}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
}