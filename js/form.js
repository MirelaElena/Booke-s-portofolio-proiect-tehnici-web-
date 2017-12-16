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
        loadMessage();
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

function loadMessage() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("message").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "getMessage.txt", true);
    xhttp.send();
  }