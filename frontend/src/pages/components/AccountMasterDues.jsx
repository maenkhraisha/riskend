function AccountMasterList() {
    const clientAccounts = [
        {
            number: "1",
            name: "خالد محمد",
            platform: "MT5",
            accountNo: "1343874",
            subscription_amount: "160 $",
            subscription_period: "يومين",
            status: "معالجة",
        },
        {
            number: "1",
            name: "خالد محمد",
            platform: "MT5",
            accountNo: "1343874",
            subscription_amount: "160 $",
            subscription_period: "يومين",
            status: "معالجة",
        },
        {
            number: "1",
            name: "خالد محمد",
            platform: "MT5",
            accountNo: "1343874",
            subscription_amount: "160 $",
            subscription_period: "يومين",
            status: "معالجة",
        },
    ];
    return (
        <>
            <ul className="table account-dues">
                <li>
                    <span>الاسم</span>
                    <span>تاريخ التسجيل</span>
                    <span>تاريخ الموافقة</span>
                    <span>رقم الحساب</span>
                    <span>قيمة الاشتراك</span>
                    <span>مدة الإشتراك</span>
                    <span>باقي</span>
                    <span>الحالة</span>
                </li>
                {clientAccounts.map((item, index) => (
                    <li>
                        <span className="rounded-gray">{item.name}</span>
                        <span className="rounded-gray">{item.accountNo}</span>
                        <span className="rounded-gray">{item.accountNo}</span>
                        <span className="rounded-gray">{item.subscription_amount}</span>
                        <span className="rounded-gray">{item.subscription_period}</span>
                        <span className="rounded-gray">{item.status}</span>
                        <span className="rounded-gray">{item.status}</span>
                        <span className="rounded-gray">{item.status}</span>
                    </li>
                ))}
            </ul>

            <div className="balance-div">
                <div>
                    <span>الرصيد الاجمالي</span>
                    <span>500 $</span>

                    <span>الرصيد المتوفر</span>
                    <span>500 $</span>
                </div>

                <a>سحب</a>
            </div>
        </>
    );
}

export default AccountMasterList;
