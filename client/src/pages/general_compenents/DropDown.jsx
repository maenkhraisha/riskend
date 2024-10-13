import { Link } from "react-router-dom";
import arrowDown from "../../assets/img/arrow_down.png";
import { useState } from "react";

function DropDown({ userName, userImage, id, content }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="dropdown ">
                <a className="dropdown__btn" id={id} onClick={() => setOpen(!open)}>
                    <img className="dropdown__btn-user-image" src={userImage} alt="" srcset="" />
                    <span>{userName}</span>
                    <img className="dropdown__btn-img" src={arrowDown} alt="" srcSet="" />
                </a>
                {open && (
                    <ul className="dropdown__content">
                        {content.map((item) => (
                            <Link key={item.key} to={item.to}>
                                {item.name}
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default DropDown;
