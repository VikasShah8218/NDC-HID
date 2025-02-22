import React , {useState,useRef}  from "react";
import EmployeeImage from "../../../assets/images/image_01.png"
import { getFromServer } from "../../../globals/requests";
import "./event-report.css"
import { BASE_URL } from "../../../globals/requests";
import { getAuthToken } from "../../../globals/auth";
import {toast } from 'react-toastify';

const EventReport: React.FC =  () => {
    const [employees,setEmployees] = useState<any[]>([]);
    const refs = {
        startDate1: useRef<HTMLInputElement>(null),
        endDate1: useRef<HTMLInputElement>(null),
    };

    const getEmployees = async()=> {
        if (!refs.startDate1.current?.value || !refs.endDate1.current?.value) { return }
        const sd = refs.startDate1.current.value
        const ed = refs.endDate1.current.value
        const resTasks = await getFromServer(`/reports/event-report?start_date=${sd}&end_date=${ed}`);
        if (resTasks.status){ 
            setEmployees(resTasks.data); 
            resTasks.data.length>0?toast.success("Employee Log Fetched"):toast.error("Record is Empty for this Date Range")
        }
        else{ toast.error("Something Went Wrong") }
        }
    const clickDownload = async()=> {
        if (!refs.startDate1.current?.value || !refs.endDate1.current?.value) { return }
        const sd = refs.startDate1.current.value
        const ed = refs.endDate1.current.value
        try {
            const response = await fetch(`${BASE_URL}`+`/reports/event-report?start_date=${sd}&end_date=${ed}&download=${true}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${getAuthToken()}`,
                },
            });
            if (response.ok) {
                const blob = await response.blob();
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = "Event Report";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                console.log("Something went wrong")
                toast.error("Something Went Wrong")
            }
        } catch (error) {
            console.log("Something went wrong")
            toast.error("Something Went Wrong")
        }
        }
    return (
        <>
        <div className="report-page">
            <div className="report-filter">
                <div className="search-by">
                    <select name="search-by" id="search-by">
                        <option value="1"> All </option>
                        <option value="2"> Name </option>
                        <option value="3"> Phone </option>
                    </select>
                </div>
                <div className="date-filter">
                    <label htmlFor="start-date">Start Date:</label>
                    <input type="datetime-local" id="start-date" ref={refs.startDate1} name="start-date" />
                </div>
                <div className="date-filter">
                    <label htmlFor="end-date">End Date:</label>
                    <input type="datetime-local" id="end-date" ref={refs.endDate1} name="end-date" />
                </div>
                <div className="parm-00">
                    <div className="parm-input">
                        <input type="text" name="parm-input" id="parm-input" />
                    </div>
                </div>
                <div className="report-btn">
                <button onClick={getEmployees} >Search </button>
                </div>
                <div className="report-btn">
                <button onClick={clickDownload}>Download</button>
                </div>
            </div>
            <div className="report-table">
                <div className="emp-table" style={{maxHeight:"71vh", overflow:"auto"}} >
                    <table>
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>name</th>
                                <th>Card</th>
                                <th>CPF</th>
                                <th>Location</th>
                                <th>Reder</th>
                                <th>Date Time</th>
                                <th>DEPARTMENT</th>
                                <th>DESIGNATION</th>
                            </tr>
                        </thead>
                        <tbody>
                        {employees?.map((emp,i) =>
                            <tr key={i}>
                                <td className="table-img" ><img src={ emp.employee.photo?`data:image/jpeg;base64,${emp.employee.photo}`:EmployeeImage} alt="Photo" width="50" /></td>
                                <td>{emp?.employee?.name}</td>
                                <td>{emp?.card?.card_number}</td>
                                <td>{emp?.employee?. cpf_no}</td>
                                <td>{emp?.reader?.location}</td>
                                <td>{emp?.reader?.name}</td>
                                <td>{emp?.created_on}</td>
                                <td>{emp?.employee?.department_name}</td>
                                <td>{emp?.employee?.designation}</td>
                                {/* <td><button onClick={() => showDetails(i)}>👁️</button></td> */}    
                            </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default EventReport