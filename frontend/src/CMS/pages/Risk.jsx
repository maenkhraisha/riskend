import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import trash from "../../assets/img/trash.png";

function Risks() {
    const [risks, setRisks] = useState([]);
    const [openAddRisk, setOpenAddRisk] = useState(false);

    const [name, setName] = useState("");

    const axiosPrivate = useAxiosPrivate();

    const getRisks = async () => {
        try {
            const response = await axiosPrivate.get("/risk");

            setRisks(response.data.risks);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRisk = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete("/risk", {
                data: {
                    id: e.target.value,
                },
            });

            getRisks();
        } catch (error) {
            console.log(error);
        }
    };
    const addRisk = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post("/risk", {
                name: name,
            });
            getRisks();
            setName("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getRisks();
    }, []);

    return (
        <>
            {openAddRisk && (
                <div className="popup add-country">
                    <form className="popup__content">
                        <a className="popup__content-close" onClick={() => setOpenAddRisk(false)}>
                            &#x2715;
                        </a>
                        <div className="popup__content-inner">
                            <div className="input-group">
                                <label htmlFor="countryName">اسم المخاطرة</label>
                                <input
                                    type="text"
                                    name=""
                                    id="countryName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <button className="btn-yellow" onClick={(e) => addRisk(e)}>
                                إضافة
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <section className="container">
                <h2>قائمة المخاطر</h2>

                <button className="btn-yellow" onClick={() => setOpenAddRisk(true)}>
                    إضافه
                </button>

                <div className="line"></div>
                <ul className="items-list ">
                    <li className="countries-list">
                        <h2>اسم المخاطرة</h2>
                        <h2>حذف</h2>
                    </li>
                    {risks?.map((item, index) => (
                        <li className="countries-list" key={index}>
                            <h3>{item.name}</h3>
                            <button
                                className="btn-yellow"
                                onClick={(e) => deleteRisk(e)}
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

export default Risks;
