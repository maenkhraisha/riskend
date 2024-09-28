import { Link } from "react-router-dom";
import arrowDown from "../../assets/img/arrow_down.png";
import { useState } from "react";

function DropDown({ text, id, content }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="dropdown ">
                <a className="dropdown__btn" id={id} onClick={() => setOpen(!open)}>
                    {text}
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
