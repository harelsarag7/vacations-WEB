import { useSelector } from "react-redux";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./Layout.css";
import Main from "./Main/Main";

function Layout(): JSX.Element {
    const userRedux = useSelector((state: any) => state.auth)

    return (
        <div className="Layout">
            {userRedux ?
			<Header/>
        : <></>}
            <Main/>
			{/* <Footer/> */}
        </div>
    );
}

export default Layout;
