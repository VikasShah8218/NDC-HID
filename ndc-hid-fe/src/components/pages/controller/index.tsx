import "./controller.css"
import HIDImage from "../../../assets/images/hid_aero.png"
const Controller = () => {
    return(
        <>
        <div className="controller-page">
            <div className="controller-grid">
                <div className="controller-card">
                    <div className="hid-image"> <img src={HIDImage} alt="" /> </div>
                    <div className="hid-details">
                        <div className="hid-detail">
                            <p>NDC Controller</p>
                        </div>
                        <div className="hid-detail">
                            <p>SCP</p>
                            <p>✅</p>
                        </div>
                        <div className="hid-detail">
                            <p>Driver</p>
                            <p>❌</p>
                        </div>
                        <div className="hid-detail"></div>
                    </div>
                </div>
            </div>

            <div className="controller-info">
                <p>Controller information here</p>
            </div>
        </div>
        </>
    )
}
export default Controller;