import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext, useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";
import {
  DetalheDeTarefa,
  DetalheDeUsuarios,
  ListagemDeTarefas,
} from "../pages";

export function AppRoutes() {
  const { setDrawerOptions } = useDrawerContext();
  const { dadosUser } = useAuthContext();

  const id = dadosUser?.id;

  useEffect(() => {
    {
      setDrawerOptions([
        
        {
          label: "Minhas Tarefas",
          icon: "task",
          path: "/tarefas",
        },
        {
          label: "Meu Perfil",
          icon: "person",
          path: `/usuarios/detalhe/${id}`,
        },
      ]);
    }
  }, []);

  return (
    <Routes>
     

      <Route path="/usuarios/detalhe/:id" element={<DetalheDeUsuarios />} />

      <Route path="/tarefas" element={<ListagemDeTarefas />} />
      <Route path="/tarefas/detalhe/:id" element={<DetalheDeTarefa />} />

      <Route path="*" element={<Navigate to={"/tarefas"} />} />
    </Routes>
  );
}
