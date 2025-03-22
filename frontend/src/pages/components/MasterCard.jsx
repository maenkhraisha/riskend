import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function MasterCard({ master, number }) {
    const axiosPrivate = useAxiosPrivate();
    const [risk, setRisk] = useState("");
    const [risks, setRisks] = useState([]);
    const [period, setPeriod] = useState("");
    const [periods, setPeriods] = useState([]);
    const handleLinkAccount = async () => {
        try {
            const response = await axiosPrivate.post(`/link-acc`, {
                brokerId: number,
                masterId: master._id,
                risk: risk,
                period: period,
                price: master.masterId.customerSubscr,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getRisks = async () => {
        try {
            const response = await axiosPrivate.get(`/risk`);
            setRisks(response.data.risks);
            setRisk(response.data.risks[0]._id);
        } catch (error) {
            console.log(error);
        }
    };
    const getPeriods = async () => {
        try {
            const response = await axiosPrivate.get(`/period`);
            setPeriods(response.data.periods);
            setPeriod(response.data.periods[0]._id);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getRisks();
        getPeriods();
    }, []);

    return (
        <div className="master-card">
            <div className="master-card__title">
                <span>{master.cusId.name}</span>
                <img src={master.cusId.image} alt="" srcSet="" />
            </div>
            <div className="master-card__body">
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
                        {risks && risks.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <div>
                    <span>الفترة:</span>
                    <select name="period" value={period} onChange={() => setPeriod()}>
                        {periods &&
                            periods?.map((item) => <option value={item.id}>{item?.name}</option>)}
                    </select>
                </div>
                <div>
                    <input type="checkbox" name="" id="vps" />
                    <label htmlFor="vps">إضافة خدمة الVPS </label>
                    <a>( تعرف عليها )</a>
                </div>
                <div>
                    <span>قيمة الإشتراك الشهري :</span>
                    <span>{master.masterId.customerSubscr}</span>
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
