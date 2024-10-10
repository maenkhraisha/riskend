import { useEffect, useState } from "react";
import MasterCard from "./components/MasterCard";
import NavClient from "./components/NavClient";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function MasterConnect() {
    const axiosPrivate = useAxiosPrivate();
    const [masters, setMasters] = useState();

    const getMasters = async () => {
        const response = await axiosPrivate.get("master-acc/connect");
        setMasters(response.data.masters);
    };

    useEffect(() => {
        getMasters();
    }, []);

    return (
        <>
            <NavClient />
            <div className="master-cards">
                {masters &&
                    masters.map((master, index) => <MasterCard key={index} master={master} />)}
            </div>
        </>
    );
}

export default MasterConnect;
