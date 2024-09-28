import person from "../../assets/img/person.jpeg";

function MasterCard() {
    return (
        <div className="master-card">
            <div className="master-card__title">
                <span>Faris ahmad</span>
                <img src={person} alt="" srcSet="" />
            </div>
            <div className="master-card__body">
                <div>
                    <span>إقل راس مال :</span>
                    <span>3000</span>
                </div>
                <div>
                    <span>سنوات الخبرة :</span>
                    <span>5</span>
                    <span>سنوات</span>
                </div>
                <div>
                    <select name="" id="">
                        <option value="none">حاسبة المخاطر</option>
                        <option value="height">مرتفع</option>
                        <option value="medium">متوسط</option>
                        <option value="low">قليل</option>
                    </select>
                </div>
                <div>
                    <input type="checkbox" name="" id="vps" />
                    <label htmlFor="vps">إضافة خدمة الVPS </label>
                    <a>( تعرف عليها )</a>
                </div>
                <div>
                    <span>قيمة الإشتراك الشهري :</span>
                </div>
                <div className="master-card__body-btn">
                    <a className="btn yellow">اضف إلي السلة</a>
                    <a className="btn yellow">التحويل مباشر</a>
                </div>
            </div>
        </div>
    );
}

export default MasterCard;
