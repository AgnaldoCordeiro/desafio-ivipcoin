import { Alert, Icon,tableCellClasses, IconButton, LinearProgress, Pagination, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components"
import ConfirmSenha from "../../shared/components/confirm-dialog/ConfirmSenha";
import { Environment } from "../../shared/environment";
import { useDebounce } from "../../shared/hooks";
import { LayoutBaseDePagina } from "../../shared/layouts"
import { styled } from '@mui/material/styles';
import { IListagemTasks, TaskService } from "../../shared/services/api/task/TaskService";
import { useAuthContext } from "../../shared/contexts";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#CFD5EA",
    color: '#000',
    fontWeight: 300,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 200,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const ListagemDeTarefas: React.FC = () => {
  const { dadosUser} = useAuthContext()
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce()
  const navigate = useNavigate()

  const [rows, setRows] = useState<IListagemTasks[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmID, setconfirmID] = useState('')

  const [open, setOpen] = useState(false);
  const [isMensagem, setIsMensagem] = useState('');




  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const busca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);


  const pagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true)

    debounce(() => {
      TaskService.getAll(pagina, busca, dadosUser?.id)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message);
          } else {
            setRows(result.data)           
            setTotalCount(result.totalCount)
          }

        });

    });
  }, [busca, pagina]);


  const handleDelete = (id: string) => {
    TaskService.deleteById(id)
      .then(result => {
        setIsMensagem('Tarefa Deletada com sucesso');
        handleClick()

        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows(oldRows => {
            return [
              ...oldRows.filter(oldRow => oldRow.id !== id)
            ]
          });
        }
      })

  }


  return (
    <LayoutBaseDePagina
      titulo='Listagem de Tarefas'
      barraDeFerramentas={<FerramentasDaListagem
        mostrarInputBusca
        textoDaBusca={busca}
        textoBotaoNovo='Novo'
        aoClicarEmNovo={() => navigate('/tarefas/detalhe/novo')}
        aoMudarTextoDeBusca={texto => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
      />}
    >

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
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

      <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Ações</StyledTableCell>
              <StyledTableCell>Titulo</StyledTableCell>
              <StyledTableCell>Descrição</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {rows.map(row => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="left">
                  <IconButton size="small" onClick={() => { setConfirmOpen(true), setconfirmID(row.id) }}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton size="small" onClick={() => navigate(`/tarefas/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell>{row.description}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && (
            <caption>{Environment.LISTAGEM_VAZIA}</caption>
          )}


          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={pagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>

    </LayoutBaseDePagina>
  )
}