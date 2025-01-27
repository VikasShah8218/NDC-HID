import React from "react";
import "./EmployeeDetails.css";
import NDCImage from "../../../assets/images/image_01.png"
import HIDImage from "../../../assets/images/hid_aero.png"

interface EmployeeProps {
  imageSrc: string;
  employeeDetails: {
    cardNo: string;
    name: string;
    contactNo: string;
    userType: string;
    designation: string;
    department: string;
    accessGate: string;
    accessTime: string;
    floor: string;
  };
}
const employeeDetailss = {cardNo:"123",name:"Shah",contactNo:"45646",userType:"Bap",designation:"system",accessGate:"Apne waal"}

const EmployeeEventDetails: React.FC<EmployeeProps> = ({ imageSrc=NDCImage, employeeDetails=employeeDetailss }) => {
  return (
    <div className="employee-container">
        <div className="section-01">

        <div className="employee-image">
            <img src={imageSrc} alt={employeeDetails.name} />
        </div>
        <div className="employee-details">
            <h3>Employee Details</h3>
            <div className="event-em-detail">
                <p><strong>Card No:</strong> {employeeDetails.cardNo}</p>
                <p><strong>Name:</strong> {employeeDetails.name}</p>
                <p><strong>Contact No:</strong> {employeeDetails.contactNo}</p>
                <p><strong>User Type:</strong> {employeeDetails.userType}</p>
                <p><strong>Designation:</strong> {employeeDetails.designation}</p>
                <p><strong>Department:</strong> {employeeDetails.designation}</p>
                <p><strong>Access Gate:</strong> {employeeDetails.accessGate}</p>
                <p><strong>Access Time:</strong> {employeeDetails.accessGate}</p>
                <p><strong>Floor:</strong> {employeeDetails.accessGate}</p>
            </div>
        </div>
        </div>
        <div className="section-02">
            <div className="controller-detial">
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
                <div className="event-detail-cont">
                    <div className="cont-detail">
                        <div className="event-em-detail ext">
                            <p><strong>Controller :</strong> {employeeDetails.cardNo}</p>
                            <p><strong>Access Control Reader :</strong> {employeeDetails.name}</p>
                            <p><strong>Access Door :</strong> {employeeDetails.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default EmployeeEventDetails;
