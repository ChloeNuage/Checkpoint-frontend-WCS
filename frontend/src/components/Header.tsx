import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

export function Header() {
   const navigate = useNavigate();
  return (
 <header
      className="header"
      style={{
        height: "300px",
        backgroundColor: "#fff",
        display: "flex",           
        alignItems: "center",     
        justifyContent: "center",  
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          height: "250px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      />
    </header>
  );
}
