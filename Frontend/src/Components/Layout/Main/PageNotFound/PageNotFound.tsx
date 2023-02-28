import "./PageNotFound.css";
import img from "../PageNotFound/404Transparent.png"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<div><h1> Page NOT Found</h1></div>
			<div><img src={img} alt="" /></div>
        </div>
    );
}

export default PageNotFound;
