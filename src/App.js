import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";
import "./styles.css";

export default function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
    </div>
    </BrowserRouter>
  );
}
