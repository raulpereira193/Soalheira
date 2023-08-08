// form.js
const formId = "save-form-arena"; // ID of the form
const url = location.href; //  href for the page
//const formIdentifier = `${url} ${formId}`; // Identifier used to identify the form
const formIdentifier = `${formId}`; // Identifier used to identify the form
const saveButton = document.querySelector("#save"); // select save button
const loadButton = document.querySelector("#load"); // select load button
const showButton = document.querySelector("#show"); // select show button
const submitButton = document.querySelector("#submit"); // select submit button
const alertBox = document.querySelector(".alert"); // select alert display div
let form = document.querySelector(`#${formId}`); // select form
let formElements = form.elements; // get the elements in the form

/**
 * This function gets the values in the form
 * and returns them as an object with the
 * [formIdentifier] as the object key
 * @returns {Object}
 */
const getFormData = () => {
    let data = { [formIdentifier]: {} };
    for (const element of formElements) {
        if (element.name.length > 0) {
            data[formIdentifier][element.name] = element.value;
        }
    }
    return data;
};

const getFormData2 = () => {
    let data = {};
    for (const element of formElements) {
        if (element.name.length > 0) {
            data[element.name] = element.value;
        }
    }
    return data;
};

saveButton.onclick = event => {
    event.preventDefault();
    data = getFormData();
    localStorage.setItem(formIdentifier, JSON.stringify(data[formIdentifier]));
    const message = "Form draft has been saved!";
    displayAlert(message);
};

loadButton.onclick = event => {
    event.preventDefault();
    populateForm();
}

showButton.onclick = event => {
    event.preventDefault();
    loadData();

}

submitButton.onclick = event => {
    event.preventDefault();
    data = getFormData2();
    console.log(data);
    SaveDataToLocalStorage(data);
}

/**
 * This function displays a message
 * on the page for 1 second
 *
 * @param {String} message
 */
const displayAlert = message => {
    alertBox.innerText = message;
    alertBox.style.display = "block";
    setTimeout(function () {
        alertBox.style.display = "none";
    }, 1000);
};

//localStorage.getItem(dataObj);
const loadData = () => {
    let data = JSON.parse(localStorage.getItem("form2"))
    console.log(data)
    let tableData2 = data.map(user => (
        `
      <tr>
        <td>${user.arena}</td>
        <td>${user.dataIn}</td>
        <td>${user.dataFin}</td>
        <td>${user.price}</td>
        <td style="color: #e75e8d;">${user.estado}</td>
      </tr>
    `
    )).join('');

    let tbody = document.querySelector('#tbbody2');
    tbody.innerHTML = tableData2;

}

function SaveDataToLocalStorage(data) {
    let a = [];
    // Parse the serialized data back into an aray of objects
    a = JSON.parse(localStorage.getItem("form2")) || [];
    console.log(a)
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    // Alert the array value
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem("form2", JSON.stringify(a));
}

/**
 * This function populates the form
 * with data from localStorage
 *
 */
const populateForm = () => {
    if (localStorage.key(formIdentifier)) {
        const savedData = JSON.parse(localStorage.getItem(formIdentifier)); // get and parse the saved data from localStorage
        for (const element of formElements) {
            if (element.name in savedData) {
                element.value = savedData[element.name];
            }
        }
        const message = "Form has been refilled with saved data!";
        displayAlert(message);
    }
};