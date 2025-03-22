import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Period() {
    const [periods, setPeriods] = useState([]);
    const [openAddPeriod, setOpenAddPeriod] = useState(false);

    const [name, setName] = useState("");
    const [noOfDays, setNoOfDays] = useState("");

    const axiosPrivate = useAxiosPrivate();

    const getPeriods = async () => {
        try {
            const response = await axiosPrivate.get("/period");

            setPeriods(response.data.periods);
        } catch (error) {
            console.log(error);
        }
    };

    const deletePeriod = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete("/period", {
                data: {
                    id: e.target.value,
                },
            });

            getPeriods();
        } catch (error) {
            console.log(error);
        }
    };
    const addPeriod = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post("/period", {
                name: name,
                no_of_days: noOfDays,
            });
            getPeriods();
            setName("");
            setNoOfDays("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPeriods();
    }, []);

    return (
        <>
            {openAddPeriod && (
                <div className="popup add-country">
                    <form className="popup__content">
                        <a className="popup__content-close" onClick={() => setOpenAddPeriod(false)}>
                            &#x2715;
                        </a>
                        <div className="popup__content-inner">
                            <div className="input-group">
                                <label htmlFor="countryName">اسم الفترة</label>
                                <input
                                    type="text"
                                    name=""
                                    id="countryName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <label htmlFor="countryName">عدد الايام</label>
                                <input
                                    type="text"
                                    name=""
                                    id="no_of_days"
                                    value={noOfDays}
                                    onChange={(e) => setNoOfDays(e.target.value)}
                                />
                            </div>
                            <button className="btn-yellow" onClick={(e) => addPeriod(e)}>
                                إضافة
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <section className="container">
                <h2>قائمة الفترات</h2>

                <button className="btn-yellow" onClick={() => setOpenAddPeriod(true)}>
                    إضافه
                </button>

                <div className="line"></div>
                <ul className="items-list ">
                    <li className="period-list">
                        <h2>اسم الفترة</h2>
                        <h2>عدد الايام</h2>
                        <h2>حذف</h2>
                    </li>
                    {periods?.map((item, index) => (
                        <li className="period-list" key={index}>
                            <h3>{item.name}</h3>
                            <h3>{item?.no_of_days}</h3>
                            <button
                                className="btn-yellow"
                                onClick={(e) => deletePeriod(e)}
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

export default Period;
