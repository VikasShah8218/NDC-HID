import React, {useEffect} from "react";
import "./EmployeeDetails.css";
import NDCImage from "../../../assets/images/image_01.png"
import HIDImage from "../../../assets/images/hid_aero.png"
import { useSelector } from "react-redux";

// interface EmployeeProps {
//     active: boolean,
//     address: string,
//     blood_group: string,
//     card_number: string,
//     cpf_no: string,
//     created_on: string,  
//     date_of_joining: string,  
//     department_name: string,
//     designation: string,
//     dob: string,
//     email: string,
//     id: BigInteger,
//     level: string,
//     marks: string,
//     mobile_no: string,
//     name: string,
//     phone_dept: string,
//     phone_ext: string,
//     phone_landline: string,
//     photo: string,
//     updated_on: string, 
//     image_key: string      
// }

const EmployeeEventDetails: React.FC = () => {
    const wsMessage = useSelector((state: any) => state.auth.wsMessage?.message?.EMP || null);

    useEffect(()=>{console.log("Shah Message",wsMessage)},[wsMessage])
    return (
        <div className="employee-container">
            <div className="section-01">

            <div className="employee-image">
                <img src={NDCImage} />
            </div>
            <div className="employee-details">
                <h3>Employee Details</h3>   
                <div className="event-em-detail">
                    <p><strong>Card No:</strong> {wsMessage?.employee?.card_number} </p>
                    <p><strong>Name:</strong> {wsMessage?.employee?.name} </p>
                    <p><strong>Contact No:</strong> {wsMessage?.employee?.mobile_no} </p>
                    <p><strong>Level :</strong> {wsMessage?.employee?.level} </p>
                    <p><strong>Designation:</strong> {wsMessage?.employee?.designation} </p>
                    <p><strong>Department:</strong> {wsMessage?.employee?.department_name} </p>
                    <p><strong>Access Gate:</strong> {wsMessage?.employee?.card_number} </p>
                    <p><strong>Access Time:</strong> {wsMessage?.time} </p>
                    <p><strong>Location :</strong> {wsMessage?.reader?.location} </p>
                </div>
            </div>
            </div>
            <div className="section-02">
                <div className="controller-detial">
                    <div className="controller-card">
                            <div className="hid-image"> <img src={HIDImage} alt="" /> </div>
                            <div className="hid-details">
                                <div className="hid-detail">
                                    <p>{wsMessage?.controller?.name}</p>
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
                    <div className="event-detail-cont">
                        <div className="cont-detail">
                            <div className="event-em-detail ext">
                                <p><strong>Controller :</strong> {wsMessage?.controller?.name}</p>
                                <p><strong>Access Control Reader :</strong> {wsMessage?.reader?.name}</p>
                                <p><strong>Access Location :</strong> {wsMessage?.reader?.location}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default EmployeeEventDetails;
