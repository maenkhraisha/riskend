import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function BrokerModal({ setOpenUpdateBroker, defaultValues, getAccounts }) {
    const axiosPrivate = useAxiosPrivate();
    const [statuses, setStatuses] = useState([]);
    const [formData, setFormData] = useState(defaultValues);

    const getStatus = async () => {
        try {
            const response = await axiosPrivate.get("/status");
            setStatuses(response.data.status);
            if (defaultValues.status == undefined) {
                setFormData({
                    ...formData,
                    status: response.data.status[0]._id,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axiosPrivate.put("/broker-acc", {
                data: formData,
            });
            getAccounts();
            setOpenUpdateBroker(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setFormData({
            ...formData,
            id: defaultValues.id,
        });

        getStatus();
    }, []);

    return (
        <div
            className="modal"
            onClick={(e) => {
                if (e.target.className === "modal") setOpenUpdateBroker(false);
            }}
        >
            <div className="modal-content">
                <div className="modal-content__title">
                    <a onClick={() => setOpenUpdateBroker(false)}>&#x2715;</a>
                </div>
                <div className="modal-content__input">
                    <input hidden name="id" value={defaultValues.id} />

                    <div className="input-group">
                        <label htmlFor="accNo">رقم الحساب</label>
                        <input
                            type="text"
                            id="accNo"
                            name="accNo"
                            value={formData?.accNo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">كلمة السر</label>
                        <input
                            type="text"
                            id="password"
                            name="password"
                            value={formData?.password}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="server">السيرفر</label>
                        <input type="text" id="server" name="server" value={formData?.server} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="broker">البروكر</label>
                        <input type="text" id="broker" name="broker" value={formData?.broker} />
                    </div>
                    <div className="input-group">
                        <label>الحالة</label>
                        <select name="status" onChange={handleChange} value={formData?.status}>
                            {statuses &&
                                statuses.map((status, index) => (
                                    <option key={index} value={status?._id}>
                                        {status?.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <button onClick={handleUpdate} className="btn-yellow">
                        تعديل
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BrokerModal;
