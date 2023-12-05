import "./App.css";
import Header from "./Components/Header/Header";
import About from "./Pages/About/About";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Login from "./Pages/Login/Login";
import Movies from "./Pages/Movies/Movies";
import Signup from "./Pages/Signup/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Theatres from "./Pages/Theatres/Theatres";

import MovieSeatmap from "./Pages/MovieSeatMap/MovieSeatmap";
import TheatreDetails from "./Pages/TheatreDetails/TheatreDetails";
import MovieDetail from "./Pages/MovieDetails/MovieDetail";
import Configurations from "./Pages/Configurations/Configurations";
import OrderConfirmation from "./Pages/OrderConfirmation/OrderConfirmation";
import { useAppSelector } from "./state/hooks";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLogIn, setLogOut } from "./state/reducers/authReducer/authReducer";
import TicketDisplay from "./Pages/TicketDisplay/TicketDisplay";
import UserProfile from "./Pages/UserProfile/UserProfile";
import AddMovies from "./Pages/AddMovies/AddMovies";
import AddTheaters from "./Pages/AddTheaters/AddTheaters";
import AddShows from "./Pages/AddShows/AddShows";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector((state: any) => state.auth.isLoggedIn);

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (storedIsLoggedIn) {
      dispatch(setLogIn({}));
    } else {
      dispatch(setLogOut({}));
    }
  }, [dispatch]);

  return (
    <div className="bg-[#f9f9f9] w-[100vw]">
      <Header />
      <div className="w-[90%] m-auto p-4 bg-[#f9f9f9] h-[90vh]">
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />}></Route>
          {/* <Route
            path="/login"
            element={
              isLoggedIn === "true" ? <Login /> : <Navigate to="/movies" />
            }
          ></Route> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/movies/:id" element={<MovieDetail />}></Route>
          <Route path="/seatmap/:id" element={<MovieSeatmap />}></Route>
          <Route path="/theaters" element={<Theatres />}></Route>
          <Route path="/theaters/:id" element={<TheatreDetails />}></Route>
          <Route path="/configurations" element={<Configurations />}></Route>
          <Route path="/ticket" element={<TicketDisplay />}></Route>
          <Route path="/add-movie" element={<AddMovies />}></Route>
          <Route path="/add-theater" element={<AddTheaters />}></Route>
          <Route path="/add-show" element={<AddShows />}></Route>
          <Route
            path="/order-confirmation"
            element={<OrderConfirmation />}
          ></Route>
          <Route path="/profile" element={<UserProfile />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
