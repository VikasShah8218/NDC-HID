import React, {useEffect, useState}  from "react";
import EmployeeImage from "../../../assets/images/image_01.png"
import { getFromServer } from "../../../globals/requests";
import "./emp.css"

const Employee: React.FC = () => {
  const [employees,setEmployees] = useState<any[]>([]);
  const getEmployees = async()=> {
    const resTasks = await getFromServer("/employee");
    if (resTasks.status){
      setEmployees(resTasks.data.results)
    }
    }

  useEffect(()=>{
    getEmployees();
  },[])

  const [formData, setFormData] = useState({
    id: null,
    card_number: "",
    cpf_no: "",
    name: "",
    marks: "",
    address: "",
    mobile_no: "",
    phone_landline: "",
    phone_dept: "",
    phone_ext: "",
    blood_group: "",
    dob: "",
    level: "",
    email: "",
    date_of_joining: "",
    department_name: "",
    designation: "",
    // photo: null,
    // active: false,
  })

  const showDetails = (i: number) => setFormData(employees[i]);
  const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }
  

  return (
      <div style={{ display: "flex", padding: "8px 16px 16px 16px", backgroundColor: "#f4f4f4" }} >
        <div className="sidebar">
            <div className="sidebar-heading">
                <h3>Employee Information</h3>
            </div>
            <div className="form-elements-groups">
            <div className="form-element">
                <label htmlFor="cardNo">Card No.:</label>
                <input type="text" id="cardNo" value={formData.card_number} onChange={changeField}/>
            </div>
            
            <div className="form-element">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={formData.name}/>
            </div>
            
            <div className="form-element">  
                <label htmlFor="cpfNo">CPF No :</label>
                <input type="text" id="cpfNo" value={formData.cpf_no}/>
            </div>
            
            <div className="form-element">
                <label htmlFor="dob">Date of Birth :</label>
                <input type="text" id="dob" value={formData.dob}/>
            </div>
            
            <div className="form-element">
                <label htmlFor="bloodGroup">Blood Group:</label>
                <select id="bloodGroup">
                    <option value={formData.blood_group} selected>{formData.blood_group}</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>
            
            <div className="form-element">
                <label htmlFor="doj">Date of Joining :</label>
                <input type="text" id="doj" value={formData.date_of_joining}/>
            </div>
            <div className="form-element">
                <label htmlFor="designation">Designation :</label>
                <select id="designation">
                    <option value={formData.designation} selected>{formData.designation}</option>
                    <option value="DGM">DGM</option>
                    <option value="SOFTWARE ENGG.">SOFTWARE ENGG.</option>
                    <option value="Corporal">Corporal</option>
                    <option value="Technical support">Technical support</option>
                    <option value="Dir(Research Coord)">Dir(Research Coord)</option>
                    <option value="SDS (NAVY)">SDS (NAVY)</option>
                    <option value="DIRECTOR(ADM)">DIRECTOR(ADM)</option>
                    <option value="SDS-A 3">SDS-A 3</option>
                    <option value="SDS (CS)">SDS (CS)</option>
                    <option value="OIC ARCHIVE">OIC ARCHIVE</option>
                    <option value="OIC UNN DIV">OIC UNN DIV</option>
                    <option value="Secretary">Secretary</option>
                    <option value="DY DIRECTOR">DY DIRECTOR</option>
                    <option value="DS (COORD)">DS (COORD)</option>
                    <option value="GSO (SYS)">GSO (SYS)</option>
                    <option value="SDS (Air)">SDS (Air)</option>
                    <option value="JDS (ADM)">JDS (ADM)</option>
                    <option value="ADM Officer">ADM Officer</option>
                    <option value="JE(CIV)">JE(CIV)</option>
                    <option value="Air India">Air India</option>
                    <option value="Private Secretary">Private Secretary</option>
                    <option value="Achive NCO">Achive NCO</option>
                    <option value="MT">MT</option>
                    <option value="SCD">SCD</option>
                    <option value="Acct. Clk.">Acct. Clk.</option>
                    <option value="GD">GD</option>
                    <option value="PA">PA</option>
                    <option value="DVR">DVR</option>
                    <option value="Guest Room">Guest Room</option>
                    <option value="CLK(SD)">CLK(SD)</option>
                    <option value="Off. Staff">Off. Staff</option>
                    <option value="CLERK">CLERK</option>
                    <option value="NUR. Asst.">NUR. Asst.</option>
                    <option value="SKT(WPN)">SKT(WPN)</option>
                    <option value="OCC">OCC</option>
                    <option value="AWW">AWW</option>
                    <option value="PS">PS</option>
                    <option value="Asstt. Cartographer">Asstt. Cartographer</option>
                    <option value="SDS(FS)">SDS(FS)</option>
                    <option value="PA To SDS(A)">PA To SDS(A)</option>
                    <option value="PA To SDS(A-2)">PA To SDS(A-2)</option>
                    <option value="PA to JDS(ADM)">PA to JDS(ADM)</option>
                    <option value="Office-in-charge">Office-in-charge</option>
                    <option value="SGT">SGT</option>
                    <option value="Tele Sec">Tele Sec</option>
                    <option value="JSA">JSA</option>
                    <option value="Sectt.">Sectt.</option>
                    <option value="1">1</option>
                    <option value="LH">LH</option>
                    <option value="DS">DS</option>
                    <option value="SSA">SSA</option>
                    <option value="MTS">MTS</option>
                    <option value="Uni Div">Uni Div</option>
                    <option value="CSD Canteen NCO">CSD Canteen NCO</option>
                    <option value="Raksha Bhawan">Raksha Bhawan</option>
                    <option value="MTD">MTD</option>
                    <option value="L LOG(STD)">L LOG(STD)</option>
                    <option value="L LOG(OC)">L LOG(OC)</option>
                    <option value="Sr. Sectl Asst">Sr. Sectl Asst</option>
                    <option value="SLIA">SLIA</option>
                    <option value="ASO">ASO</option>
                    <option value="Protocal">Protocal</option>
                    <option value="PPS">PPS</option>
                    <option value="LIO">LIO</option>
                    <option value="PO LOG(OC)">PO LOG(OC)</option>
                    <option value="PO">PO</option>
                    <option value="Recpt NCO">Recpt NCO</option>
                    <option value="WOIC (R&R)">WOIC (R&R)</option>
                    <option value="ADM Asst">ADM Asst</option>
                    <option value="SDS Army - 1">SDS Army - 1</option>
                    <option value="SDS Army - 2">SDS Army - 2</option>
                    <option value="SDS Army - 3">SDS Army - 3</option>
                    <option value="TRG CCK">TRG CCK</option>
                    <option value="Mess Waiter">Mess Waiter</option>
                    <option value="Haiwai Can. cook">Haiwai Can. cook</option>
                    <option value="Canteen Attendent">Canteen Attendent</option>
                    <option value="SO(Accts)">SO(Accts)</option>
                    <option value="SNCOIC IT Sec.">SNCOIC IT Sec.</option>
                    <option value="Lasker">Lasker</option>
                    <option value="Security">Security</option>
                    <option value="INF SOL">INF SOL</option>
                    <option value="PA to Rech Coord">PA to Rech Coord</option>
                    <option value="SDS (AIR) Sectt.">SDS (AIR) Sectt.</option>
                    <option value="OWE">OWE</option>
                    <option value="BUDDY">BUDDY</option>
                    <option value="MSN">MSN</option>
                    <option value="SNOCs IC">SNOCs IC</option>
                    <option value="WM">WM</option>
                    <option value="Chiff.">Chiff.</option>
                    <option value="House Keepar">House Keepar</option>
                    <option value="MT(DVR)">MT(DVR)</option>
                    <option value="SOL GD">SOL GD</option>
                    <option value="MS">MS</option>
                    <option value="Auto Tech. B">Auto Tech. B</option>
                    <option value="SKT">SKT</option>
                    <option value="PA to COMDT">PA to COMDT</option>
                    <option value="COMDT">COMDT</option>
                    <option value="SO to COMDT">SO to COMDT</option>
                    <option value="DAA & QMG">DAA & QMG</option>
                    <option value="STENO-D">STENO-D</option>
                    <option value="DVR MT">DVR MT</option>
                    <option value="N/A">N/A</option>
                    <option value="Course Member">Course Member</option>
                    <option value="Photographer">Photographer</option>
                    <option value="AA & QMG">AA & QMG</option>
                    <option value="GNR">GNR</option>
                    <option value="COMH">COMH</option>
                    <option value="CHM">CHM</option>
                    <option value="Comdt Sectt">Comdt Sectt</option>
                    <option value="JDS(R&R)">JDS(R&R)</option>
                    <option value="HAV">HAV</option>
                    <option value="NK">NK</option>
                    <option value="NDCH">NDCH</option>
                    <option value="SEP">SEP</option>
                    <option value="CFN">CFN</option>
                    <option value="Spr">Spr</option>
                    <option value="LD">LD</option>
                    <option value="SWR">SWR</option>
                    <option value="SIGMA">SIGMA</option>
                    <option value="MCPO LOG(STD)">MCPO LOG(STD)</option>
                    <option value="CPL">CPL</option>
                    <option value="L/NK">L/NK</option>
                    <option value="PO (GS)">PO (GS)</option>
                    <option value="PO (GW)">PO (GW)</option>
                    <option value="SIGMN">SIGMN</option>
                    <option value="NC(E)">NC(E)</option>
                    <option value="POELA">POELA</option>
                    <option value="CPO LOG(F&A)">CPO LOG(F&A)</option>
                    <option value="L LOG(F&A)">L LOG(F&A)</option>
                    <option value="LA(AH)">LA(AH)</option>
                    <option value="SUB">SUB</option>
                    <option value="PTR">PTR</option>
                    <option value="LEM(P)">LEM(P)</option>
                    <option value="PO LOG(F&A)">PO LOG(F&A)</option>
                    <option value="PO(GS)">PO(GS)</option>
                    <option value="RFN">RFN</option>
                    <option value="MWO">MWO</option>
                    <option value="MTS(S/W)">MTS(S/W)</option>
                    <option value="Canteen Clk">Canteen Clk</option>
                    <option value="L HAV">L HAV</option>
                    <option value="GNR(RST)">GNR(RST)</option>
                    <option value="MCPO II">MCPO II</option>
                    <option value="Nb Sub">Nb Sub</option>
                    <option value="DSV">DSV</option>
                    <option value="SKT(MT)">SKT(MT)</option>
                    <option value="SARGENT">SARGENT</option>
                    <option value="STENOGRAPHER">STENOGRAPHER</option>
                    <option value="ACCTS">ACCTS</option>
                    <option value="ARMY-II">ARMY-II</option>
                    <option value="TRG Section">TRG Section</option>
                    <option value="MES">MES</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Rech-Coord">Rech-Coord</option>
                    <option value="ARMY-I">ARMY-I</option>
                    <option value="AA&QQ Secc">AA&QQ Secc</option>
                    <option value="POAOF">POAOF</option>
                    <option value="DSC">DSC</option>
                    <option value="SDS(N) Sectt">SDS(N) Sectt</option>
                    <option value="L/HALL">L/HALL</option>
                    <option value="TTC">TTC</option>
                    <option value="COR SECTT">COR SECTT</option>
                </select>
            </div>
            
            <div className="form-element">
                <label htmlFor="level">Level:</label>
                <select id="designation">
                <option value={formData.level} selected>{formData.level}</option>
                </select>
            </div>
            
            <div className="form-element">
                <label htmlFor="department">Department:</label>
                <input type="text" id="department" disabled value={formData.department_name}/>
            </div>
            
            <div className="form-element">
                <label htmlFor="phone">Dept. Phone No.:</label>
                <input type="text" id="phone" value={formData.phone_dept}/>
            </div>
            
            <div className="form-element">
                <label htmlFor="mobile">Mobile No.:</label>
                <input type="text" id="mobile" value={formData.mobile_no}/>
            </div>

            <div className="form-element">
                <label htmlFor="mobile">Address :</label>
                <input type="text" id="mobile" value={formData.address}/>
            </div>

            <div className="form-element">
                <label htmlFor="mobile">Visible ID Marks.:</label>
                <input type="text" id="mobile" value={formData.marks}/>
            </div>
            
            </div>
              
            <div className="image-preview">
                <img src={EmployeeImage} alt="Employee Photo"/>
            </div>

            <button>RESET</button>
            <button>SAVE</button>
            <button>DELETE</button>
        </div>
        <div style={{flex:"3",paddingLeft:"16px"}} >
        <div className="emp-table" style={{maxHeight:"80vh", overflow:"auto"}} >
          <table>
              <thead>
                  <tr>
                      <th>Photo</th>
                      <th>name</th>
                      <th>Card</th>
                      <th>CPF</th>
                      <th>MOBILE</th>
                      <th>ADDRESS</th>
                      <th>DOJ</th>
                      <th>DEPARTMENT</th>
                      <th>DESIGNATION</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                {employees.map((emp, i) =>
                  <tr>
                      <td className="table-img" ><img src={EmployeeImage} alt="Photo" width="50" /></td>
                      <td>{emp.name}</td>
                      <td>{emp.card_number}</td>
                      <td>{emp. cpf_no}</td>
                      <td>{emp.mobile_no}</td>
                      <td>{emp.address}</td>
                      <td>{emp.dob}</td>
                      <td>{emp.department_name}</td>
                      <td>{emp.designation}</td>
                      <td><button onClick={() => showDetails(i)}>👁️</button></td>
                  </tr>
                  )}
              </tbody>
          </table>
        </div>
        </div>
        </div>
  );
};

export default Employee;
