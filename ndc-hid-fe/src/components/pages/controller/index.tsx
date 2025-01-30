import {useEffect} from "react";
import { useSelector } from "react-redux";
import HIDImage from "../../../assets/images/hid_aero.png"
import "./controller.css"

const Controller = () => {
    const wsMessage = useSelector((state: any) => state.auth.wsMessage?.message?.CRT || null);
    useEffect(()=>{console.log("Shah Message",wsMessage)},[wsMessage])
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