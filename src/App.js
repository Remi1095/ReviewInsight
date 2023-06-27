import AppNavbar from "./components/AppNavbar";
import Home from "./components/Home";
import Search from "./components/Search";
import Contribute from "./components/Contribute";

/*
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/contribute" component={Contribute} />
        </Routes>*/

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <AppNavbar />
        <br />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/contribute" element={<Contribute />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;