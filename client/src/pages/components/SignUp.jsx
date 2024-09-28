import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

import { useEffect, useState } from "react";

const BASE_URL = process.env.server_url;

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");

    const [country, setCountry] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdMatch, setPwdMatch] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [countries, setCountries] = useState([{}]);

    useEffect(() => {
        getCountries();
    }, []);

    const getCountries = async () => {
        try {
            const response = await axios.get("/country");

            setCountries(response.data.countries);
            setCountry(response.data.countries[0]._id);
        } catch (error) {
            console.log(error);
        }
    };

    const errorMessage = () => {
        return (
            error && (
                <div className="error-message">
                    <span>{error}</span>
                </div>
            )
        );
    };

    const successMessage = () => {
        return (
            success && (
                <div className="success-message">
                    <span>{success}</span>
                </div>
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pwd !== pwdMatch) {
            setError("Password not match");
            setTimeout(() => {
                setError("");
            }, 2000);
            return;
        }
        try {
            const response = await axios.post("/customer/signup", {
                name,
                email,
                telephone,
                pwd,
                country,
            });
            setSuccess("User Added Successfully");
            setTimeout(() => {
                setSuccess("");
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {errorMessage()}
            {successMessage()}
            <section className="signup">
                <div>
                    <h1>التسجيل</h1>
                    <h3>إهلا بك ! يرجى إدخال البيانات الصحيحة</h3>
                </div>
                <form className="input-form">
                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="الاسم الثلاثي"
                            autoComplete="false"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="email"
                            autoComplete="false"
                            placeholder="البريد الالكتروني"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            name="telephone"
                            autoComplete="true"
                            placeholder="رقم الهاتف"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <select
                            name="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            id="country"
                        >
                            {countries &&
                                countries.map((item, index) => (
                                    <option key={index} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            name="pwd"
                            placeholder="الرقم السري"
                            autoComplete="false"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            name="pwdConfirm"
                            placeholder="تاكيد الرقم السري"
                            autoComplete="false"
                            value={pwdMatch}
                            onChange={(e) => setPwdMatch(e.target.value)}
                        />
                    </div>

                    <div>
                        <input type="checkbox" name="" id="terms_and_condition" />
                        <label htmlFor="terms_and_condition">أوافق على الشروط والأحكام</label>
                    </div>
                    <button className="btn wide yellow" onClick={handleSubmit}>
                        تسجيل
                    </button>
                </form>
            </section>
        </>
    );
}

export default SignUp;
