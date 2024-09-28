import AccountMasterList from "./AccountMasterList";
import AccountMasterDues from "./AccountMasterDues";
import Tab from "../general_compenents/Tab";

function NavMaster() {
    return (
        <section>
            <Tab
                title={""}
                tabs={[
                    { name: "العملاء", content: <AccountMasterList /> },
                    { name: "المستحقات", content: <AccountMasterDues /> },
                ]}
            />
        </section>
    );
}

export default NavMaster;
