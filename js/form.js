// useful functions
function createDiv(id, text, elem){
    var div = document.createElement('div');
    div.setAttribute('id', id);
    div.setAttribute("style", "color: red;");
    div.innerHTML = text;
    document.getElementById(elem).appendChild(div);
}

function modifyDiv(id, newText){
    div = document.getElementById(id);
    div.innerHTML = newText;
}

function divExists(id){
    div = document.getElementById(id);
    if(div==null)
        return false;
    else 
        return true;
}

function getText(id){
    return document.getElementById(id).getAttribute('text');
}

function deleteNode(id){
    var el = document.getElementById(id);
    if(el)
        el.remove();
}

// verify form

function verifyForm(){
    var em = verifyString('an email', 'wrong-email', 'email-row', 'emailaddress');
    var fn = verifyString('the first name', 'wrong-firstname', 'firstname-row', 'firstname');
    var ln = verifyString('the last name', 'wrong-lastname', 'lastname-row', 'lastname');

    var city = verifySelect('a city', 'wrong-city', 'city-row', 'city', 'Select a city');
    var month = verifySelect('a month', 'wrong-month', 'date-row', 'month', 'Month');
    var day = verifySelect('a day', 'wrong-day', 'date-row', 'day', 'Day')

    var number = verifyNumber();

    console.log(em + ''+ fn +''+ ln +''+ city +''+ month  +''+ day +''+ number);

    if(em == true && fn == true && ln == true && city == true && month == true && day == true && number == true)
        if(document.getElementById('appointmentOption').value == 'New')
            saveAppointment();
        else if (document.getElementById('appointmentOption').value == 'Modify last appointment.')
            modifyLastAppointment();
    
    if (document.getElementById('appointmentOption').value == 'Delete last appointment.')
            deleteLastAppointment();
}

function verifySelect(input, id, fatherElem, elem, defaultValue){

    var e = document.getElementById(elem);
    var element = e.options[e.selectedIndex].text;

    text = 'You have to enter ' +  input + '!';

    if(element == defaultValue){
        if(divExists(id))
            if(getText(id) == text)
                return false;
            else if(getText(id) != text){
                modifyDiv(id, text);
                return false;
            }
            createDiv(id, text, fatherElem);
            return false;  
    }
    deleteNode(id);
    return true;
}

function verifyString(input, id, fatherElem, elem, defaultValue) {
    var element = document.getElementById(elem).value;

    if(element==null || element==""){
        text = 'You have to enter ' +  input + '!';
        if(divExists(id))
            if(getText(id) == text)
                return false;
            else if(getText(id) != text){
                modifyDiv(id, text);
                return false;
            }
        createDiv(id, text, fatherElem);
        return false;
    }
    else if(element.length < 5){
        text = 'You have to enter ' + input + ' with at least 5 characters!';
        if(divExists(id))
            if(getText(id) == text)
                return false;
            else if(getText(id) != text){
                modifyDiv(id, text);
                return false;
            }
        createDiv(id, text, fatherElem);
        return false;
    }
    else if(element.length > 20){
        text = 'You have to enter ' + input + ' with at less than 20 characters!';
        if(divExists(id))
            if(getText(id) == text)
                return false;
            else if(getText(id) != text){
                modifyDiv(id, text);
                return false;
            }
        createDiv(id, text, fatherElem);
        return false;
    }
    else {
        deleteNode(id);
        return true;
    }
}


function verifyNumber(){
    id = 'wrong-number';
    fatherElem = 'telephone-row';

    var number = document.getElementById('contactnumber').value;

    if(number==null || number==""){
        text = 'You have to enter telephone number!';
        if(divExists(id))
            if(getText(id) == text)
                return false;
            else if(getText(id) != text){
                modifyDiv(id, text);
                return false;
            }
            createDiv(id, text, fatherElem);
    }
    else if(number.length != 10 ){
        text = 'You have to enter a valid telephone number!';
        if(divExists(id))
            if(getText(id) == text)
                return false;
            else if(getText(id) != text){
                modifyDiv(id, text);
                return false;
            }
        createDiv(id, text, fatherElem);
        return false;
    }
    else {
        deleteNode(id);
        return true;
    }
}

// Ajax
// Get
appId=1;

function getAppointments() {
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost:3000/appointments";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            dogs = JSON.parse(this.responseText);
            showAppointments(dogs);
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function showAppointments(appointments) {

    appointments.forEach(function (appointment) {

        var ul = document.createElement('ul');
        ul.setAttribute('id', 'Details of appointment ' + appointment.id);
        document.getElementById('lista').appendChild(ul); 

        for (property in appointment) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(appointment[property]));
            li.setAttribute('id', property);
            if(property == 'id')
                appId = appointment[property];
            ul.appendChild(li);
        }

    })
}

 getAppointments();

//post
function saveAppointment() {
    var appointment = {};
    appointment.id = appId+1;
    appointment.email = document.getElementById('emailaddress').value;
    appointment.firstname = document.getElementById('firstname').value;
    appointment.lastname = document.getElementById('lastname').value;
    appointment.city = document.getElementById('city').value;
    appointment.month = document.getElementById('month').value;
    appointment.day = document.getElementById('day').value;
    appointment.contactnumber = document.getElementById('contactnumber').value;
    if(document.getElementById('graduation').checked == true)
        appointment.event = 'graduation';
    else if(document.getElementById('marriage').checked == true)
        appointment.event = 'marriage';
    else if(document.getElementById('birth').checked == true)
        appointment.event = 'birth';
    else appointment.event = 'other';

    var json = JSON.stringify(appointment);

    var url = "http://localhost:3000/appointments";
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var appointments = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            console.table(appointments);
        } else {
            console.error(appointments);
        }
    }
    xhr.send(json);
}

//put
function modifyLastAppointment() {

    var appointment = {};
    appointment.id = appId;
    appointment.email = document.getElementById('emailaddress').value;
    appointment.firstname = document.getElementById('firstname').value;
    appointment.lastname = document.getElementById('lastname').value;
    appointment.city = document.getElementById('city').value;
    appointment.month = document.getElementById('month').value;
    appointment.day = document.getElementById('day').value;
    appointment.contactnumber = document.getElementById('contactnumber').value;
    if(document.getElementById('graduation').checked == true)
        appointment.event = 'graduation';
    else if(document.getElementById('marriage').checked == true)
        appointment.event = 'marriage';
    else if(document.getElementById('birth').checked == true)
        appointment.event = 'birth';
    else appointment.event = 'other';

    var json = JSON.stringify(appointment);
    var url = "http://localhost:3000/appointments";
    var xhr = new XMLHttpRequest();
    console.log(appId);
    xhr.open("PUT", url+'/' + appId, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var appointment = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(appointment);
        } else {
            console.error(appointment);
        }
    }
    xhr.send(json);
}

//delete
function deleteLastAppointment(number) {
    var url = "http://localhost:3000/appointments";

    var xhr = new XMLHttpRequest();
    console.log(appId);
    xhr.open("DELETE", url + '/' + appId, true);
    xhr.onload = function () {
        var appointments = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(appointments);
        } else {
            console.error(appointments);
        }
    }
    xhr.send(null);
}