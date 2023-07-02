import AppNavbar from "./components/AppNavbar";
import Home from "./components/Home";
import Search from "./components/Search";
import BookInfo from "./components/BookInfo";
import ReviewBook from "./components/ReviewBook";
import Contribute from "./components/Contribute";
import MyLists from "./components/MyLists"

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
          <Route path="/book-info/:bookid" element={<BookInfo />} />
          <Route path="/review-book/:bookid" element={<ReviewBook />} />
          <Route path="/contribute" element={<Contribute />} />
          <Route path="/my-lists" element={<MyLists />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;