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
        <>
            <ul>
                <li>
                    <p>الاسم</p>
                    <p>البريد الالكتروني</p>
                </li>
                {users &&
                    users.map((item, index) => (
                        <li key={index}>
                            <p>{item.username}</p>
                            <p>{item.email}</p>
                        </li>
                    ))}
            </ul>
        </>
    );
}

export default UsersList;
