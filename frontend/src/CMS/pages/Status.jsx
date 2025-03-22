import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import EditStatus from "../components/EditStatus";
import EditStatusMaster from "../components/EditStatusMaster";

function Status() {
    const [status, setStatus] = useState([]);
    const [statusMaster, setStatusMaster] = useState([]);
    const [openAddStatus, setOpenAddStatus] = useState(false);
    const [openEditStatus, setOpenEditStatus] = useState(false);
    const [openAddStatusMaster, setOpenAddStatusMaster] = useState(false);
    const [openEditStatusMaster, setOpenEditStatusMaster] = useState(false);
    const [rowValues, setRowValues] = useState();
    const [rowValuesMaster, setRowValuesMaster] = useState();

    const [name, setName] = useState("");
    const [nameMaster, setNameMaster] = useState("");

    const axiosPrivate = useAxiosPrivate();

    const getStatus = async () => {
        try {
            const response = await axiosPrivate.get("/status");

            setStatus(response.data.status);
        } catch (error) {
            console.log(error);
        }
    };

    const getStatusMaster = async () => {
        try {
            const response = await axiosPrivate.get("/status-master");
            setStatusMaster(response.data.statusMaster);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteStatus = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete("/status", {
                data: {
                    id: e.target.getAttribute("data-id"),
                },
            });

            getStatus();
        } catch (error) {
            console.log(error);
        }
    };
    const deleteStatusMaster = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.delete("/status-master", {
                data: {
                    id: e.target.getAttribute("data-id"),
                },
            });

            getStatusMaster();
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

    const addStatusMaster = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post("/status-master", {
                name: nameMaster,
            });
            getStatusMaster();
            setNameMaster("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (e) => {
        setRowValues({
            id: e.target.getAttribute("data-id"),
            name: e.target.closest(".tr").childNodes[1].innerText,
            isdefault: e.target.closest(".tr").childNodes[0].childNodes[0].checked,
        });

        setOpenEditStatus(true);
    };

    const handleEditMaster = (e) => {
        setRowValuesMaster({
            id: e.target.getAttribute("data-id"),
            name: e.target.closest(".tr").childNodes[1].innerText,
            isdefault: e.target.closest(".tr").childNodes[0].childNodes[0].checked,
        });

        setOpenEditStatusMaster(true);
    };

    const handleColor = (e) => {
        console.log(e.target.value);
    };

    useEffect(() => {
        getStatus();
        getStatusMaster();
    }, []);

    return (
        <>
            {openEditStatus && (
                <EditStatus
                    defaultValues={rowValues}
                    setOpenEditStatus={setOpenEditStatus}
                    getStatus={getStatus}
                />
            )}
            {openEditStatusMaster && (
                <EditStatusMaster
                    defaultValuesMaster={rowValuesMaster}
                    setOpenEditStatusMaster={setOpenEditStatusMaster}
                    getStatusMaster={getStatusMaster}
                />
            )}
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

                            <div className="input-group">
                                <label htmlFor="statusName">اللون</label>
                                <input type="text" name="" id="statusName" onChange={handleColor} />
                            </div>
                            <div className="input-group">
                                <div>
                                    <input type="radio" name="defulat" id="accept" />
                                    <label htmlFor="accept">قبول</label>
                                </div>
                                <div>
                                    <input type="radio" name="reject" />
                                    <label htmlFor="reject">رفض</label>
                                </div>
                                <div>
                                    <input type="radio" name="defulat" />
                                    <label htmlFor="defualt_accept">الافتراضي</label>
                                </div>
                            </div>
                            <button className="btn-yellow" onClick={(e) => addStatus(e)}>
                                إضافة
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {openAddStatusMaster && (
                <div className="popup add-country">
                    <form className="popup__content">
                        <a
                            className="popup__content-close"
                            onClick={() => setOpenAddStatusMaster(false)}
                        >
                            &#x2715;
                        </a>
                        <div className="popup__content-inner">
                            <div className="input-group">
                                <label htmlFor="statusName">اسم الحالة</label>
                                <input
                                    type="text"
                                    name=""
                                    id="statusName"
                                    value={nameMaster}
                                    onChange={(e) => setNameMaster(e.target.value)}
                                />
                            </div>

                            <button className="btn-yellow" onClick={(e) => addStatusMaster(e)}>
                                إضافة
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <section>
                <div className="container">
                    <h2>حالات البروكر</h2>

                    <button className="btn-yellow" onClick={() => setOpenAddStatus(true)}>
                        إضافه حالة
                    </button>

                    <div className="line"></div>
                    <ul className="status-list ">
                        <li>
                            <h2>اللون</h2>
                            <h2>الافتراضي</h2>
                            <h2>قبول</h2>
                            <h2>رفض</h2>
                            <h2>اسم الحالة</h2>
                            <h2>حذف / تعديل</h2>
                        </li>
                        {status?.map((item, index) => (
                            <li className="tr" key={index}>
                                <div></div>
                                <span>
                                    <input
                                        hidden
                                        type="checkbox"
                                        name="isdefault"
                                        defaultChecked={item?.isdefault}
                                        checked={item?.isdefault}
                                    />
                                    {item?.isdefault ? (
                                        <i class="bi bi-check"></i>
                                    ) : (
                                        <i class="bi bi-x"></i>
                                    )}
                                </span>
                                <div></div>
                                <div></div>
                                <span>{item.name}</span>
                                <div>
                                    <i
                                        data-id={item._id}
                                        onClick={(e) => deleteStatus(e)}
                                        class="bi bi-trash-fill"
                                    ></i>
                                    <i
                                        data-id={item._id}
                                        onClick={(e) => handleEdit(e)}
                                        class="bi-pencil-square"
                                    ></i>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="container">
                    <h2>حالات الماستر</h2>

                    <button className="btn-yellow" onClick={() => setOpenAddStatusMaster(true)}>
                        إضافه حالة
                    </button>

                    <div className="line"></div>
                    <ul className="status-list ">
                        <li>
                            <h2>اللون</h2>
                            <h2>الافتراضي</h2>
                            <h2>قبول</h2>
                            <h2>رفض</h2>
                            <h2>اسم الحالة</h2>
                            <h2>حذف / تعديل</h2>
                        </li>
                        {statusMaster?.map((item, index) => (
                            <li className="tr" key={index}>
                                <div></div>
                                <span>
                                    <input
                                        hidden
                                        type="checkbox"
                                        name="isdefault"
                                        defaultChecked={item?.isdefault}
                                        checked={item?.isdefault}
                                    />
                                    {item?.isdefault ? (
                                        <i class="bi bi-check"></i>
                                    ) : (
                                        <i class="bi bi-x"></i>
                                    )}
                                </span>
                                <div></div>
                                <div></div>
                                <span>{item.name}</span>
                                <div>
                                    <i
                                        data-id={item._id}
                                        onClick={(e) => deleteStatusMaster(e)}
                                        class="bi bi-trash-fill"
                                    ></i>
                                    <i
                                        data-id={item._id}
                                        onClick={(e) => handleEditMaster(e)}
                                        class="bi-pencil-square"
                                    ></i>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Status;
