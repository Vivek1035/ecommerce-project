import { Header } from "../components/Header";
import './PageNotFound.css';

export function PageNotFound() {
    return (
        <>
            <title>404 Page Not Found</title>
            <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
            <Header/>
            <div className="not-found-message">
                Error 404 ... Page Not Found
            </div>
        </> 
    );
}