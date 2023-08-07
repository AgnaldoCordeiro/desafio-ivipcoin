import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField } from '@mui/material';
import React, { useState } from 'react';
import * as yup from 'yup'


interface IProps {
  children: React.ReactNode,
  title: string,
  open: boolean,
  setOpen: (props: any) => void,
  onConfirm: () => void,
}

const loginSchema = yup.object().shape({
  password: yup.string().required().min(5)
})



const ConfirmSenha = (props: IProps) => {

  const excluir = 'eventu17'
  const [isConfirme, setIsConfirme] = useState(false)


  const handleSubmit = () => {
    setIsLoading(true)
    loginSchema.validate({ password }, { abortEarly: false })
    if (excluir === password) {
      setIsLoading(false)
      setIsConfirme(true)
    } else {
      setIsLoading(false)
      setPasswordError("Senha Invalida")
    }



  }
  const { title, children, open, setOpen, onConfirm } = props
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      {isConfirme === false ? <>
        <DialogTitle id="confirm-dialog">Informe a Senha para continuar</DialogTitle>
        <DialogActions>
          <Box
            sx={{
              my: 1,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
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
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => setPasswordError('')}
            />

            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              endIcon={isLoading ? <CircularProgress variant='indeterminate' color='inherit' size={20} /> : undefined}
              sx={{ mt: 3, mb: 2 }}
            >
              Continuar
            </Button>
          </Box>
        </DialogActions>




      </> : <>
        <DialogTitle id="confirm-dialog">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => { setOpen(false), setIsConfirme(false) }}
            color="secondary"
          >
            No
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
            color="inherit"
          >
            Yes
          </Button>
        </DialogActions>
      </>},

    </Dialog>

  );
};

export default ConfirmSenha;