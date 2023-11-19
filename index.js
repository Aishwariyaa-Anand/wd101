let regform = document.getElementById("reg-form");
const dobin = document.getElementById('dob');

dobin.addEventListener('input', (event) => {
    const dob = new Date(event.target.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age > 18 && age < 55) {
        dobin.setCustomValidity('');
    }
    else{
        dobin.setCustomValidity('Date of birth should be between ages 18 and 55.');
    }
});

const getdetails = ()=>{
    let det = localStorage.getItem("userdet");
    if(det){
        det = JSON.parse(det);
    }
    else{
        det = [];
    } 
    return det;
}
let data = getdetails();

const showdetails =()=>{
    const det = getdetails();
    const tableentries = det.map((entry)=>{
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passCell = `<td>${entry.pass}</td>`;
        const dobCell = `<td>${entry.dob_}</td>`;
        const acceptTermsCell = `<td>${entry.check}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const tab = 
    `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>dob</th>
            <th>accepted terms?</th>
        </tr>${tableentries}
    </table>`;

    let fdet = document.getElementById("userdet");
    fdet.innerHTML = tab;
}
const saveform = (event)=>{
    event.preventDefault();
    const name = document.getElementById("name").value; 
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const dob_ = document.getElementById("dob").value;
    const check = document.getElementById("acceptTerms").checked;
    const entry = {
        name,
        email,
        pass,
        dob_,
        check
    }
    data.push(entry);
    localStorage.setItem("userdet",JSON.stringify(data));
    showdetails();
}

regform.addEventListener("submit",saveform); 

showdetails();