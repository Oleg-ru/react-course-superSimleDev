import {Header} from "../components/Header.jsx";
import "./NotFoundPage.css"

export function NotFoundPage({cart}) {
    return (
        <>
            <Header cart={cart}/>

            <div className="not-found-page">
                <div
                    className="not-found-message"
                >Page not found</div>
                <img
                    className="not-found-img"
                    src="/Page-Not-Found.png"
                    alt="Not found page"
                />
            </div>
        </>

    );
}