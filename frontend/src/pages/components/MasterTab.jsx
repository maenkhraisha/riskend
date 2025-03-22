import AccountLinkList from "./AccountLinkList";
import AccountMasterDues from "./AccountMasterDues";
import Tab from "../general_compenents/Tab";
import AccountMaster from "./AccountMaster";

function NavMaster() {
    return (
        <section>
            <Tab
                title={""}
                tabs={[
                    { name: "العملاء", content: <AccountLinkList /> },
                    { name: "المستحقات", content: <AccountMasterDues /> },
                    { name: "حسابات الماستر", content: <AccountMaster /> },
                ]}
            />
        </section>
    );
}

export default NavMaster;
