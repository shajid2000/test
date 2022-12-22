import React from "react";

// components 
import SignagesBody from "../components/categoryPages/Signages/SignagesBody";

const Signages = () => {

    const topView = () => {
        window.scrollTo({ top: 0 });
    }

    topView();

    return (
        <>
            <SignagesBody />
        </>
    )
};

export default Signages;