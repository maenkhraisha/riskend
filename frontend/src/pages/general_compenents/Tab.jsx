import { useState } from "react";
import "./Tab.css";

function Tab({ title, tabs = {} }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const activateTab = (index) => {
        setActiveTabIndex(index);
    };
    return (
        <div className="tab">
            {title && <p className="tab-title">{title}</p>}
            <div className="tab-body">
                {Object.keys(tabs).length === 0 ? (
                    <div>no tabs</div>
                ) : (
                    <>
                        <div className="tab-body__btn">
                            {tabs.map((tab, index) => (
                                <label
                                    key={index}
                                    className={index === activeTabIndex ? "active-tab" : "tab"}
                                    onClick={() => activateTab(index)}
                                >
                                    {tab.name}
                                </label>
                            ))}
                        </div>
                        <div className="tab-body__content">{tabs[activeTabIndex].content}</div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Tab;
