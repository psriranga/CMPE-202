import "./App.css";
import Header from "./Components/Header/Header";
import About from "./Pages/About/About";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Login from "./Pages/Login/Login";
import Movies from "./Pages/Movies/Movies";
import Signup from "./Pages/Signup/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Theatres from "./Pages/Theatres/Theatres";

import MovieSeatmap from "./Pages/MovieSeatMap/MovieSeatmap";
import TheatreDetails from "./Pages/TheatreDetails/TheatreDetails";
import MovieDetail from "./Pages/MovieDetails/MovieDetail";
import Configurations from "./Pages/Configurations/Configurations";
import Checkout from "./Pages/Checkout/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation/OrderConfirmation";

function App() {
  return (
    <div>
      <Header />
      <div className="w-[60%] m-auto p-4">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/movies/:id" element={<MovieDetail />}></Route>
          <Route path="/seatmap" element={<MovieSeatmap />}></Route>
          <Route path="/theatres" element={<Theatres />}></Route>
          <Route path="/theatres/:id" element={<TheatreDetails />}></Route>
          <Route path="/configurations" element={<Configurations />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route
            path="/order-confirmation"
            element={<OrderConfirmation />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
