import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function EditStatus({ setOpenEditStatus, defaultValues, getStatus }) {
    const axiosPrivate = useAxiosPrivate();
    const [formData, setFormData] = useState(defaultValues);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeCK = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked,
        });
    };

    const handleUpdate = async () => {
        try {
            const response = await axiosPrivate.put("/status", {
                data: formData,
            });

            getStatus();
            setOpenEditStatus(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setFormData({
            ...formData,
            name: defaultValues.name,
            isdefault: defaultValues.isdefault,
            id: defaultValues.id,
        });

        getStatus();
    }, []);

    return (
        <div
            className="modal"
            onClick={(e) => {
                if (e.target.className === "modal") setOpenEditStatus(false);
            }}
        >
            <div className="modal-content">
                <div className="modal-content__title">
                    <a onClick={() => setOpenEditStatus(false)}>&#x2715;</a>
                </div>
                <div className="modal-content__input">
                    <div className="input-group">
                        <label htmlFor="accNo">الاسم</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData?.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="isdefault"
                            name="isdefault"
                            value={formData?.isdefault}
                            onChange={handleChangeCK}
                            defaultChecked={formData?.isdefault}
                        />
                        <label htmlFor="isdefault">الافتراضي</label>
                    </div>

                    <button onClick={handleUpdate} className="btn-yellow">
                        تعديل
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditStatus;
