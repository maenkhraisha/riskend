import React from "react";
import MasterCard from "./components/MasterCard";
import NavClient from "./components/NavClient";

function MasterConnect() {
    return (
        <>
            <NavClient />
            <div className="master-cards">
                <MasterCard />
                <MasterCard />
                <MasterCard />
                <MasterCard />
            </div>
        </>
    );
}

export default MasterConnect;
