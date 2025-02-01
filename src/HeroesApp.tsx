import { AuthProvider } from "./auth";
import { AppRouter } from "./router/AppRouter";

export default function HeroesApp() {
  return (
    <AuthProvider>
      <div className=" bg-slate-900 text-white min-h-dvh">
        <AppRouter />
      </div>
    </AuthProvider>
  );
}
