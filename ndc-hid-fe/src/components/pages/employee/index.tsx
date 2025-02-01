import React, {useEffect, useState}  from "react";
import EmployeeImage from "../../../assets/images/image_01.png"
import { getFromServer, patchToServer, postToServer } from "../../../globals/requests";
import "./emp.css"
import { BASE_URL } from "../../../globals/requests";
import {toast } from 'react-toastify';

const Employee: React.FC = () => {
    const emptyFormData = {
      id: null,
      card_number: "",
      card_id: "",
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
      department_id: "",
      designation: "",
      photo: "",
      active: null,
      is_photo:false
    }

    const [employees,setEmployees] = useState<any[]>([]);
    const [departments,setDepartments] = useState<any[]>([]);
    const [cards,setCards] = useState<any[]>([]);
    const [formData, setFormData] = useState({...emptyFormData})

    const showDetails = (i: number) => setFormData(employees[i]);

    const getEmployees = async()=> {
        const response = await getFromServer("/employee/view");
        if (response.status){setEmployees(response.data);toast.success("Checking")}
    }
    const getDpartment = async()=> {
        const response = await getFromServer("/employee/department-view");
        if (response.status){setDepartments(response.data);toast.error("Checking")}
    }
    const getCard = async()=> {
        const response = await getFromServer("/controller/cards");
        if (response.status){setCards(response.data);toast.success("Checking")}
    }
   const changeField = (event: React.ChangeEvent<HTMLInputElement>) => {
       setFormData((prevFormData) => ({
           ...prevFormData,
           [event.target.name]: event.target.value,
        }));
    }
   
    const saveData = async() =>{
        let response;
        if (formData.id){ response = await patchToServer(`/employee/view/${formData.id}/`,formData) }
        else{ response = await postToServer("/employee/view/",formData) }
        if (response.status == 200 || response.status == 201){
            console.log(response.data)
            getEmployees()
            setFormData({...emptyFormData})
        }
    }

    useEffect(()=>{getEmployees();getCard();getDpartment();},[])
    
    
  return (
    <div style={{ display: "flex", padding: "8px 16px 10px 16px", backgroundColor: "#f4f4f4" }} >
        <div className="sidebar">
            <div className="sidebar-heading">
                <h3>Employee Information</h3>
            </div>
            <div className="form-elements-groups">
            {/* <div className="form-element">
                <label htmlFor="cardNo">Card No.:</label>
                <input type="text" id="cardNo" value={formData.card_number} onChange={changeField}/>
            </div> */}
            <div className="form-element">
                <label htmlFor="cards">Card:</label>
                <select id="cards" name="card_id" value={formData.card_id}  onChange={changeField} >
                    {/* <option >{formData.card_number}</option> */}
                    {cards.map((card, i) => 
                        <option key={i} value={card?.id}>{card?.card_number}</option>
                    )}
                </select>
            </div>
            
            <div className="form-element">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={formData.name} name="name" onChange={changeField}/>
            </div>
            
            <div className="form-element">  
                <label htmlFor="cpfNo">CPF No :</label>
                <input type="text" id="cpfNo" value={formData.cpf_no}  name="cpf_no" onChange={changeField}/>
            </div>
            
            <div className="form-element">
                <label htmlFor="dob"  >Date of Birth :</label>
                <input type="date" id="dob" value={formData.dob}  name="dob" onChange={changeField}/>
            </div>
            
            <div className="form-element">
                <label htmlFor="bloodGroup">Blood Group:</label>
                <select id="bloodGroup" value={formData.blood_group}  name="blood_group" onChange={changeField}>
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
                <input type="date" id="doj" value={formData.date_of_joining} name="date_of_joining" onChange={changeField}/>
            </div>
            <div className="form-element">
                <label htmlFor="designation">Designation :</label>
                <select id="designation" value={formData.designation} name="designation" onChange={changeField}>
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
                <select id="designation" value={formData.level} name="level" onChange={changeField}>
                    <option value="MTS">MTS</option>
                    <option value="WG CDR">WG CDR</option>
                    <option value="SEA-I">SEA-I</option>
                    <option value="POAOF">POAOF</option>
                    <option value="LAM">LAM</option>
                    <option value="Joint Secretry">Joint Secretry</option>
                    <option value="SO(A)">SO(A)</option>
                    <option value="FGM">FGM</option>
                    <option value="LT COL">LT COL</option>
                    <option value="CAPT(IN)">CAPT(IN)</option>
                    <option value="ELECT(HS)">ELECT(HS)</option>
                    <option value="NB Sub">NB Sub</option>
                    <option value="ELECT(MCM)">ELECT(MCM)</option>
                    <option value="FGM(MCM)">FGM(MCM)</option>
                    <option value="Elericon">Elericon</option>
                    <option value="FGM MCM">FGM MCM</option>
                    <option value="MATE(SSK)">MATE(SSK)</option>
                    <option value="MES">MES</option>
                    <option value="Cleark">Cleark</option>
                    <option value="PPS">PPS</option>
                    <option value="SERGENT">SERGENT</option>
                    <option value="GNR(GD)">GNR(GD)</option>
                    <option value="POAF">POAF</option>
                    <option value="Staff Captain">Staff Captain</option>
                    <option value="ITS">ITS</option>
                    <option value="Indian Coast Guard">Indian Coast Guard</option>
                    <option value="IDAS">IDAS</option>
                    <option value="IDES">IDES</option>
                    <option value="IP&TAFS">IP&TAFS</option>
                    <option value="IFoS">IFoS</option>
                    <option value="IRSS">IRSS</option>
                    <option value="AFHQ-CS">AFHQ-CS</option>
                    <option value="DRDS">DRDS</option>
                    <option value="IAS">IAS</option>
                    <option value="OR MESS">OR MESS</option>
                    <option value="COMDT SECTT">COMDT SECTT</option>
                    <option value="OCC">OCC</option>
                    <option value="WO">WO</option>
                    <option value="JWO">JWO</option>
                    <option value="MCPOLOG(STD) II">MCPOLOG(STD) II</option>
                    <option value="LNK">LNK</option>
                    <option value="LS GS II">LS GS II</option>
                    <option value="SDS(Army II)">SDS(Army II)</option>
                    <option value="SKT">SKT</option>
                    <option value="NDC House">NDC House</option>
                    <option value="NDC OR Mess">NDC OR Mess</option>
                    <option value="SDS(CS)">SDS(CS)</option>
                    <option value="NDC Vet Canteen">NDC Vet Canteen</option>
                    <option value="NDC Off. Mess">NDC Off. Mess</option>
                    <option value="NDC Reception">NDC Reception</option>
                    <option value="NDC Library">NDC Library</option>
                    <option value="Univ Div">Univ Div</option>
                    <option value="Control Room">Control Room</option>
                    <option value="SDS(Navy)">SDS(Navy)</option>
                    <option value="GSO Systems">GSO Systems</option>
                    <option value="SDS(Air)">SDS(Air)</option>
                    <option value="RB">RB</option>
                    <option value="SDS(Army-III)">SDS(Army-III)</option>
                    <option value="SDS(FS)">SDS(FS)</option>
                    <option value="JDS Adm">JDS Adm</option>
                    <option value="SDS (Navy)">SDS (Navy)</option>
                    <option value="Secretary">Secretary</option>
                    <option value="DAA&QMG">DAA&QMG</option>
                    <option value="MI Room">MI Room</option>
                    <option value="DS Coord">DS Coord</option>
                    <option value="Dak Room">Dak Room</option>
                    <option value="AQ Sectt">AQ Sectt</option>
                    <option value="Accts">Accts</option>
                    <option value="SDS (Army-I)">SDS (Army-I)</option>
                    <option value="Commandant">Commandant</option>
                    <option value="Sweaper">Sweaper</option>
                    <option value="MT">MT</option>
                    <option value="JOINT SECRETARY">JOINT SECRETARY</option>
                    <option value="COL STAFF">COL STAFF</option>
                    <option value="CAPTAIN(IN)">CAPTAIN(IN)</option>
                    <option value="GNR(RST)">GNR(RST)</option>
                    <option value="MCPO II">MCPO II</option>
                    <option value="CHM">CHM</option>
                    <option value="SAG">SAG</option>
                    <option value="JT. Secy">JT. Secy</option>
                    <option value="JS(MEA)">JS(MEA)</option>
                    <option value="GD">GD</option>
                    <option value="CMDE">CMDE</option>
                    <option value="R & D">R & D</option>
                    <option value="DIRECTOR">DIRECTOR</option>
                    <option value="Research Coord">Research Coord</option>
                    <option value="CHIF">CHIF</option>
                    <option value="DIG">DIG</option>
                    <option value="Jt. Sec">Jt. Sec</option>
                    <option value="IG">IG</option>
                    <option value="IPS">IPS</option>
                    <option value="IRS">IRS</option>
                    <option value="JS">JS</option>
                    <option value="AIR CMDE">AIR CMDE</option>
                    <option value="CMDE NM">CMDE NM</option>
                    <option value="BRIG">BRIG</option>
                    <option value="N/A">N/A</option>
                    <option value="MAJ">MAJ</option>
                    <option value="LT GEN">LT GEN</option>
                    <option value="SUB(PA)">SUB(PA)</option>
                    <option value="CFN">CFN</option>
                    <option value="SAPEER">SAPEER</option>
                    <option value="MWO">MWO</option>
                    <option value="RFN">RFN</option>
                    <option value="PO GSI">PO GSI</option>
                    <option value="PO LOG(F&A)">PO LOG(F&A)</option>
                    <option value="LEMP">LEMP</option>
                    <option value="PO LOG(OC)">PO LOG(OC)</option>
                    <option value="Ms.">Ms.</option>
                    <option value="L LOG(OC)">L LOG(OC)</option>
                    <option value="PTR">PTR</option>
                    <option value="SUB">SUB</option>
                    <option value="DAFTRY">DAFTRY</option>
                    <option value="LA(AH)">LA(AH)</option>
                    <option value="L LOG(F&A)">L LOG(F&A)</option>
                    <option value="Grop-c">Grop-c</option>
                    <option value="CPO WTR">CPO WTR</option>
                    <option value="LH">LH</option>
                    <option value="POELA">POELA</option>
                    <option value="JSA">JSA</option>
                    <option value="PO">PO</option>
                    <option value="L LOG">L LOG</option>
                </select>
            </div>
            
            <div className="form-element">
                <label htmlFor="cards">Department:</label>
                <select id="cards" name="department_id" value={formData.department_id}  onChange={changeField} >
                    <option value="" > Select Department </option>
                    {departments.map((department, i) => 
                        <option key={i} value={department?.id}>{department?.name}</option>
                    )}
                </select>
            </div>
            
            <div className="form-element">
                <label htmlFor="phone">Dept. Phone No.:</label>
                <input type="text" id="phone" value={formData.phone_dept}  name="phone_dept" onChange={changeField}/>
            </div>
            
            <div className="form-element">
                <label htmlFor="mobile">Mobile No.:</label>
                <input type="text" value={formData.mobile_no}  name="mobile_no" onChange={changeField}/>
            </div>

            <div className="form-element">
                <label htmlFor="mobile">Address :</label>
                <input type="text" value={formData.address}  name="address" onChange={changeField}/>
            </div>

            <div className="form-element">
                <label htmlFor="mobile">Visible ID Marks.:</label>
                <input type="text" value={formData.marks}  name="marks" onChange={changeField}/>
            </div>
            
            </div>
              
            <div className="image-preview">
                <img src={formData?.is_photo?`${BASE_URL}/employee/emp-img/${formData.id}`:EmployeeImage} alt="Employee Photo"/>
            </div>

            <button onClick={()=>setFormData({...emptyFormData})} >RESET</button>
            <button onClick={saveData} > { formData.id?"Save":"Add New" } </button>
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
                      {/* <th>ADDRESS</th> */}
                      <th>DOJ</th>
                      <th>DEPARTMENT</th>
                      <th>DESIGNATION</th>
                      {/* <th>Action</th> */}
                  </tr>
              </thead>
              <tbody>
                {employees?.map((emp, i) =>
                  <tr  onClick={() => showDetails(i)}>
                      <td className="table-img" ><img src={ emp?.is_photo?`${BASE_URL}/employee/emp-img/${emp.id}`:EmployeeImage} alt="Photo" width="50" /></td>
                      <td>{emp.name}</td>
                      <td>{emp.card_number}</td>
                      <td>{emp. cpf_no}</td>
                      <td>{emp.mobile_no}</td>
                      {/* <td>{emp.address}</td> */}
                      <td>{emp.dob}</td>
                      <td>{emp.department_name}</td>
                      <td>{emp.designation}</td>
                      {/* <td><button onClick={() => showDetails(i)}>👁️</button></td> */}
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
