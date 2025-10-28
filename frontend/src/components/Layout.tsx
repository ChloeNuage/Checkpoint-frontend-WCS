import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function PageLayout() {
  return (
    <div className="page-layout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
