import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import trash from "../../assets/img/trash.png";

function Status() {
    const [status, setStatus] = useState([]);
    const [openAddStatus, setOpenAddStatus] = useState(false);

    const [name, setName] = useState("");

    const axiosPrivate = useAxiosPrivate();

    const getStatus = async () => {
        try {
            const response = await axiosPrivate.get("/status");

            setStatus(response.data.status);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteStatus = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete("/status", {
                data: {
                    id: e.target.value,
                },
            });
            console.log(response);

            getStatus();
        } catch (error) {
            console.log(error);
        }
    };
    const addStatus = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post("/status", {
                name: name,
            });
            getStatus();
            setName("");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStatus();
    }, []);

    return (
        <>
            {openAddStatus && (
                <div className="popup add-country">
                    <form className="popup__content">
                        <a className="popup__content-close" onClick={() => setOpenAddStatus(false)}>
                            &#x2715;
                        </a>
                        <div className="popup__content-inner">
                            <div className="input-group">
                                <label htmlFor="statusName">اسم الحالة</label>
                                <input
                                    type="text"
                                    name=""
                                    id="statusName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <button className="btn-yellow" onClick={(e) => addStatus(e)}>
                                إضافة حالة
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <section className="main">
                <h2>قائمة الحالات</h2>

                <button className="btn-yellow" onClick={() => setOpenAddStatus(true)}>
                    إضافه حالة
                </button>

                <div className="line"></div>
                <ul className="items-list ">
                    <li className="countries-list">
                        <h2>اسم الحالة</h2>
                        <h2>حذف</h2>
                    </li>
                    {status.map((item, index) => (
                        <li className="countries-list" key={index}>
                            <h3>{item.name}</h3>
                            <button
                                className="btn-yellow"
                                onClick={(e) => deleteStatus(e)}
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

export default Status;
