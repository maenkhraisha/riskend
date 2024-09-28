function AccountMasterList() {
    const clientAccounts = [
        {
            number: "1",
            name: "خالد محمد",
            platform: "MT5",
            accountNo: "1343874",
            broker: "Vantage",
            plan: "مخاطرة عالية",
            subscription_period: "يومين",
            status: "معالجة",
        },
        {
            number: "2",
            name: "Jalal",
            platform: "MT5",
            accountNo: "1343874",
            broker: "Vantage",
            plan: "مخاطرة متوسطه",
            subscription_period: "خمس ايام",
            status: "يعمل",
        },
        {
            number: "3",
            name: "Ahmad",
            platform: "MT5",
            accountNo: "1343874",
            broker: "Vantage",
            plan: "مخاطرة منخفضة",
            subscription_period: "يوم واحد",
            status: "متوقف",
        },
    ];
    return (
        <>
            <ul className="table account-master">
                <span></span>
                <span>الاسم</span>
                <span>المنصه</span>
                <span>رقم الحساب</span>
                <span>البروكر</span>
                <span>الخطة</span>
                <span>مدة الإشتراك</span>
                <span>الحالة</span>
                {clientAccounts.map((item, index) => (
                    <>
                        <span>{item.number}</span>
                        <span className="rounded-gray">{item.name}</span>
                        <span className="rounded-gray">{item.platform}</span>
                        <span className="rounded-gray">{item.accountNo}</span>
                        <span className="rounded-gray">{item.broker}</span>
                        <span className="rounded-gray">{item.plan}</span>
                        <span className="rounded-gray">{item.subscription_period}</span>
                        <span className="rounded-gray">{item.status}</span>
                    </>
                ))}
            </ul>
        </>
    );
}

export default AccountMasterList;
