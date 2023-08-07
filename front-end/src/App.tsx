import "./shared/forms/TraducoesYup";
import { AppRoutes } from "./routes";
import { Login, MenuLateral } from "./shared/components";
import { AuthProvider, DrawerProvider } from "./shared/contexts";

export function App() {
  return (
    <AuthProvider>
      <Login>
        <DrawerProvider>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </DrawerProvider>
      </Login>
    </AuthProvider>
  );
}
