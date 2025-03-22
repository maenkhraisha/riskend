import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import arrowDown from "../../assets/img/arrow_down.png";

function NavItems({ listItem }) {
    const [open, setOpen] = useState(false);
    return (
        <li>
            <NavLink
                onClick={() => setOpen(!open)}
                className={({ isActive }) =>
                    isActive && !listItem.children ? "activeRoute nav-btn" : "nav-btn"
                }
                to={listItem?.path}
            >
                <i className={listItem.icon}></i>
                <span>{listItem.title}</span>
                {listItem?.children && <i className="bi-chevron-down"></i>}
            </NavLink>
            <div className={open ? "nav-content open" : "nav-content"}>
                <ul>
                    {listItem.children &&
                        listItem.children.map((item, index) => (
                            <li key={index}>
                                <NavLink
                                    className={({ isActive }) =>
                                        isActive ? "activeRoute nav-btn" : "nav-btn"
                                    }
                                    to={item.path}
                                >
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}
                </ul>
            </div>
        </li>
    );
}

export default NavItems;
