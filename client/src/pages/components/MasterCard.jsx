import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function MasterCard({ master, number }) {
    const axiosPrivate = useAxiosPrivate();
    const [risk, setRisk] = useState("1");
    const [period, setPeriod] = useState("1m");
    const handleLinkAccount = async () => {
        const response = await axiosPrivate.post(`/link-acc`, {
            brokerId: number,
            masterId: master._id,
            risk: risk,
            period: period,
        });
    };

    return (
        <div className="master-card">
            <div className="master-card__title">
                <span>{master.cusId.name}</span>
                <img src={master.cusId.image} alt="" srcSet="" />
            </div>
            <div className="master-card__body">
                {/* <div>
                    <span>حساب البروكر</span>
                    <span> : {number}</span>
                </div>

                <div>
                    <span>حساب الماستر</span>
                    <span> : {master._id}</span>
                </div> */}

                <div>
                    <span>إقل راس مال :</span>
                    <span>{master.masterId.minCapital}</span>
                </div>
                <div>
                    <span>سنوات الخبرة :</span>
                    <span>5</span>
                    <span>سنوات</span>
                </div>
                <div>
                    <select name="risk" value={risk} onChange={() => setRisk()}>
                        <option value="3">مرتفع</option>
                        <option value="2">متوسط</option>
                        <option value="1">قليل</option>
                    </select>
                </div>
                <div>
                    <span>الفترة:</span>
                    <select name="period" value={period} onChange={() => setPeriod()}>
                        <option value="1d">يوم</option>
                        <option value="1w">اسبوع</option>
                        <option value="1m">شهر</option>
                        <option value="3m">ثلاثة اشهر</option>
                        <option value="6m">ستة اشهر</option>
                        <option value="1y">سنة</option>
                    </select>
                </div>
                <div>
                    <input type="checkbox" name="" id="vps" />
                    <label htmlFor="vps">إضافة خدمة الVPS </label>
                    <a>( تعرف عليها )</a>
                </div>
                <div>
                    <span>قيمة الإشتراك الشهري :</span>
                    <span>{master.masterId.minMonthlyProfit}</span>
                </div>
                <div className="master-card__body-btn">
                    <button onClick={handleLinkAccount} className="btn yellow">
                        اضف إلي السلة
                    </button>
                    <button onClick={handleLinkAccount} className="btn yellow">
                        التحويل مباشر
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MasterCard;
