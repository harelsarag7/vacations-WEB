
import { Route, Routes, useNavigate } from "react-router-dom";
import LikesChart from "./LikesChart/LikesChart";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import Blog from "./Blog/Blog";
import AboutPage from "./Home/AboutPage/AboutPage";
import Home from "./Home/Home";
import "./Main.css";
import PageNotFound from "./PageNotFound/PageNotFound";

function Main(): JSX.Element {


    return (
        <div className="Main">  
			<Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/blog" element={<Blog/>}></Route>
                <Route path="/likes" element={<LikesChart/>}></Route>
                <Route path="/about" element={<AboutPage/>}></Route>
                {/* <Route path="/createcard" element={<CreateCard/>}></Route>
                <Route path="/createcardsteps" element={<CreateCardSteps/>}></Route>
                <Route path="/card/:id" element={<CardTemplate/>}></Route> */}
                <Route path="/*" element={<PageNotFound/>}></Route>

                {/* <Route path="/allproducts" element={<AllProducts/>}></Route> */}
                {/* <Route path="/shoes" element="shoes"></Route> */}
                {/* <Route path="/clothes" element="clothes"></Route> */}
			</Routes>
        </div>
    );
}

export default Main;
