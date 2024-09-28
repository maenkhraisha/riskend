import { useEffect, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import person from "../../assets/img/person.jpeg";
import loading from "../../assets/img/loading.gif";

import { v4 } from "uuid";
import { storage } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function PersonalInfo() {
    const { authCus } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [customer, setCustomer] = useState();
    const [countries, setCountries] = useState();

    const [imageUpload, setImageUpload] = useState(null);
    const [imgDefault, setImgDefault] = useState(person);

    const fileUploadRef = useRef();

    const [formData, setFormData] = useState({
        _id: authCus._id,
        name: "",
        telephone: "",
        country: "",
        gender: "",
        birthDate: "",
        image: "",
    });

    const handleFormData = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const getCustomers = async () => {
        try {
            const response = await axiosPrivate.get(`/customer/${authCus.id}`);
            const customer = response.data.customer;
            setCustomer(customer);

            setFormData({
                _id: authCus.id,
                country: customer.country._id,
                name: customer.name,
                telephone: customer.telephone,
                gender: customer.gender,
                birthDate: customer.birthDate,
                image: customer.image || person,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getCountries = async () => {
        try {
            const response = await axiosPrivate.get("/country");
            setCountries(response.data.countries);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.put("customer", formData);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputFile = () => {
        const uploadedFile = fileUploadRef.current.files[0];
        const cashedURL = URL.createObjectURL(uploadedFile);
        setImgDefault(cashedURL);
        setImageUpload(() => fileUploadRef.current.files[0]);
    };
    const handleUpload = () => {
        setImgDefault(loading);

        if (imageUpload == null) {
            setImgDefault(person);
            return;
        }

        const imageRef = ref(storage, `PersonalImage/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((res) => {
            getDownloadURL(res.ref).then((url) => {
                setImgDefault(url);

                setFormData({
                    ...formData,
                    ["image"]: url,
                });
            });
        });
    };

    useEffect(() => {
        handleUpload();
    }, [imageUpload]);

    useEffect(() => {
        getCountries();
        getCustomers();
    }, []);

    return (
        <section className="main ">
            <form className="flex-form update-customer">
                <div>
                    <div className="rounded-img">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                fileUploadRef.current.click();
                            }}
                        >
                            <img src={formData?.image} height={"150"} width={"150"} />
                            <i
                                className="bi-upload"
                                style={{ fontSize: "1rem", color: "white" }}
                            ></i>
                        </button>
                    </div>
                    <div>
                        {/* <button onClick={handleUpload}>upload</button> */}
                        <input type="file" onChange={handleInputFile} ref={fileUploadRef} hidden />
                    </div>
                </div>
                <div className="input-group">
                    <label htmlFor="name">الاسم</label>
                    <input
                        type="text"
                        name="name"
                        value={formData?.name}
                        onChange={handleFormData}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="name">الدولة</label>
                    <select name="country" value={formData?.country} onChange={handleFormData}>
                        {countries &&
                            countries.map((item, index) => (
                                <option key={index} value={item._id}>
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="name">رقم الهاتف</label>
                    <input
                        type="text"
                        name="telephone"
                        value={formData?.telephone}
                        onChange={handleFormData}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="name">الجنس</label>
                    <select name="gender" id="" value={formData.gender} onChange={handleFormData}>
                        <option key="1" value="male">
                            ذكر
                        </option>
                        <option key="2" value="female">
                            انثى
                        </option>
                    </select>
                </div>
                <div className="input-group">
                    <label htmlFor="name">تاريخ الميلاد</label>
                    <input
                        type="text"
                        name="birthDate"
                        autoComplete="true"
                        value={formData?.birthDate}
                        onChange={handleFormData}
                    />
                </div>
                <button className="btn btn-yellow" onClick={(e) => handleUpdate(e)}>
                    تعديل
                </button>
            </form>
        </section>
    );
}

export default PersonalInfo;
