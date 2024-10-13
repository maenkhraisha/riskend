import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function UsersList() {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();

    const getUsers = async () => {
        try {
            const response = await axiosPrivate.get("/auth/users");
            console.log(response.data);

            setUsers(response.data.users);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUsers();
    }, []);
    return (
        <section className="main">
            <div>
                <h1>المستخدمين</h1>
                <div className="users-list">
                    <ul>
                        <li>
                            <p>الاسم</p>
                            <p>البريد الالكتروني</p>
                            <p></p>
                        </li>
                        <div className="line"></div>
                        {users &&
                            users.map((item, index) => (
                                <li key={index}>
                                    <p>---</p>
                                    <p>---</p>
                                    <button>حذف</button>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default UsersList;
