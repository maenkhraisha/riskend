import { Link } from "react-router-dom";
import NavClient from "./components/NavClient";
import useAuth from "../hooks/useAuth";

import useAxiosPrivate from "../hooks/useAxiosPrivate";

import img1 from "../assets/img/home/1.png";
import img2 from "../assets/img/home/2.png";
import img3 from "../assets/img/home/3.png";
import img4 from "../assets/img/home/4.png";
import img5 from "../assets/img/home/5.png";
import { useState } from "react";

function Home() {
    const { authCus } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [countries, setCountries] = useState();

    const getCountries = async () => {
        const response = await axiosPrivate.get(`/country`);
        setCountries(response.data.countries);
    };
    return (
        <>
            <div className="app">
                <h1>v 2</h1>
                <button className="btn yellow" onClick={getCountries}>
                    country list
                </button>
                <ul>
                    {countries &&
                        countries.map((country, index) => <li key={index}>{country.name}</li>)}
                </ul>
                <section className="content">
                    {authCus && <NavClient />}
                    {!authCus && (
                        <div className="home-page">
                            <Link to="/loginSignup" className="btn yellow">
                                تسجيل الدخول
                            </Link>
                            <div>
                                <img src={img1} alt="" srcSet="" />
                                <img src={img2} alt="" srcSet="" />
                                <img src={img3} alt="" srcSet="" />
                                <img src={img4} alt="" srcSet="" />
                                <img src={img5} alt="" srcSet="" />
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
}

export default Home;
