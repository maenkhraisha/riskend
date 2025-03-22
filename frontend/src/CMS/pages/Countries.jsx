import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import trash from "../../assets/img/trash.png";

function Countries() {
    const [countries, setCountries] = useState([]);
    const [openAddCountry, setOpenAddCountry] = useState(false);

    const [name, setName] = useState("");

    const axiosPrivate = useAxiosPrivate();

    const getCountries = async () => {
        try {
            const response = await axiosPrivate.get("/country");

            setCountries(response.data.countries);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCountry = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete("/country", {
                data: {
                    id: e.target.value,
                },
            });

            getCountries();
        } catch (error) {
            console.log(error);
        }
    };
    const addCountry = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post("/country", {
                name: name,
            });
            getCountries();
            setName("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCountries();
    }, []);

    return (
        <>
            {openAddCountry && (
                <div className="popup add-country">
                    <form className="popup__content">
                        <a
                            className="popup__content-close"
                            onClick={() => setOpenAddCountry(false)}
                        >
                            &#x2715;
                        </a>
                        <div className="popup__content-inner">
                            <div className="input-group">
                                <label htmlFor="countryName">اسم الدولة</label>
                                <input
                                    type="text"
                                    name=""
                                    id="countryName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <button className="btn-yellow" onClick={(e) => addCountry(e)}>
                                إضافة دوله
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <section className="container">
                <h2>قائمة الدول</h2>

                <button className="btn-yellow" onClick={() => setOpenAddCountry(true)}>
                    إضافه دوله
                </button>

                <div className="line"></div>
                <ul className="items-list ">
                    <li className="countries-list">
                        <h2>اسم الدولة</h2>
                        <h2>حذف</h2>
                    </li>
                    {countries.map((item, index) => (
                        <li className="countries-list" key={index}>
                            <h3>{item.name}</h3>
                            <button
                                className="btn-yellow"
                                onClick={(e) => deleteCountry(e)}
                                value={item._id}
                            >
                                حذف
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default Countries;
