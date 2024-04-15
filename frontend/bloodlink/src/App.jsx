import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="container">
      <Navbar />
      <div className="content">
        {" "}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
