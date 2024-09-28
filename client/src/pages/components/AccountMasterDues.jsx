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
            <div className="yellow-div">
                <div>
                    <span>الأجمالي</span>
                    <span>500 $</span>
                </div>
                <a className="btn-gray">سحب</a>
            </div>
            <ul className="table account-dues">
                <span></span>
                <span>الاسم</span>
                <span>المنصه</span>
                <span>رقم الحساب</span>
                <span>قيمة الاشتراك</span>
                <span>مدة الإشتراك</span>
                <span>الحالة</span>
                {clientAccounts.map((item, index) => (
                    <>
                        <span>{item.number}</span>
                        <span className="rounded-gray">{item.name}</span>
                        <span className="rounded-gray">{item.platform}</span>
                        <span className="rounded-gray">{item.accountNo}</span>
                        <span className="rounded-gray">{item.subscription_amount}</span>
                        <span className="rounded-gray">{item.subscription_period}</span>
                        <span className="rounded-gray">{item.status}</span>
                    </>
                ))}
            </ul>
        </>
    );
}

export default AccountMasterList;
