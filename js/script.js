let nameField = document.querySelector('#name');
let occupationContainer = document.querySelector('.occupation');
let userTitleSelection = document.querySelector('#title');
let tShirtDesignSelection = document.getElementById('design');
let tShirtColorSelect = document.querySelector('#color');
let tShirtColorSelectionOptions = document.getElementById('color');
let registerForActivitiesContainer = document.querySelector('.activities');
let activitiesCostCheckboxes = document.querySelectorAll('.activities input');
let activitiesTitle = document.querySelector('.activities>legend');
let creditCardContainer = document.getElementById('credit-card');
let paymentDropDown = document.getElementById('payment');

// Fields input
let userField = document.getElementById('name');
let emailField = document.getElementById('mail');
let ccNum = document.getElementById('cc-num');
let zipCode = document.getElementById('zip');
let cvvContainer = document.getElementById('cvv');

let submitButton = document.querySelector("[type='submit']");
let tShirtColorSelectionOptionsArray = Array.from(tShirtColorSelectionOptions.getElementsByTagName('option'));

const selectionOther = 'other';
let formStateInvalidation = false; // Global to hold whether or not used to control blur events

//============== Window Event listener to set focus to Name field ==============//
window.addEventListener('load', (e) => {
	nameField.focus();
	hideOtherInput();
	hideColorDropDown();
	hideTShirtColorDropDownLabel();
	hideSelectPaymentMethod();
	setDefaultPaymentMethod('credit card');
});

//============== Script Section: Name Field ==============//
nameField.addEventListener('blur', (e) => {
	let name = e.target.value;
	name == '' ? isUserNameValid('User name is empty.') : isUserNameValid(`${name} not valid.`);
});

nameField.addEventListener('input', (e) => {
	let name = e.target.value;
	name == '' ? isUserNameValid() : isUserNameValid(`${name} not valid.`);
});

//============== Script Section: Email Field ==============//
emailField.addEventListener('blur', (e) => {
	let userEmail = e.target.value;
	userEmail == '' ? isEmailValid('Email cannot be empty.') : isEmailValid(`${userEmail} is not formatted correctly.`);
});

emailField.addEventListener('input', (e) => {
	let userEmail = e.target.value;
	userEmail == '' ? isEmailValid('Email cannot be empty.') : isEmailValid(`${userEmail} is not formatted correctly.`);
});

//============== Script Section: Job Role Selection ==============//
userTitleSelection.addEventListener('change', (e) => {
	e.preventDefault();
	let selection = e.target.value;
	if (selection === selectionOther) {
		displayOtherInput();
	} else {
		hideOtherInput();
	}
});

function displayOtherInput() {
	occupationContainer.style.display = 'block';
}

function hideOtherInput() {
	occupationContainer.style.display = 'none';
}

function hideColorDropDown() {
	tShirtColorSelectionOptions.style.display = 'none';
}

function hideTShirtColorDropDownLabel() {
	tShirtColorSelectionOptions.previousElementSibling.style.display = 'none';
}

function showColorDropDown() {
	tShirtColorSelectionOptions.style.display = 'block';
}

function showTShirtColorDropDownLabel() {
	tShirtColorSelectionOptions.previousElementSibling.style.display = 'inline-block';
}

//============== Script Section: T-Shirt Design control section ==============//
tShirtDesignSelection.addEventListener('change', (e) => {
	e.preventDefault();
	reset(); // reset the values before starting

	// display the colors selection
	showTShirtColorDropDownLabel();
	showColorDropDown();

	const tshirtData = [
		{ selection: 'Select Theme', disabledcolors: [], defaultColor: '' },
		{
			selection: 'js puns',
			disabledcolors: ['tomato', 'steelblue', 'dimgrey'],
			defaultColor: 'cornflowerblue',
		},
		{
			selection: 'heart js',
			disabledcolors: ['cornflowerblue', 'darkslategrey', 'gold'],
			defaultColor: 'tomato',
		},
	];
	let tShirtSelectionType = e.target.selectedIndex; // gets the selected index of the item selected
	invokeSelection(tshirtData[tShirtSelectionType].selection, tshirtData); // passes data to the invoke Selection

	let defaultSelection = tshirtData[tShirtSelectionType].defaultColor; // default selection
	setDefaultTshirtColorOption(defaultSelection);
	updateDesignDropDown();
});

// sets the default value displaying in the drop down selection
function setDefaultTshirtColorOption(color) {
	document.querySelector(`[value='${color}']`).selected = 'true'; // sets the default value
}

// Resets the TShirt design drop down
function updateDesignDropDown() {
	let designThemeDefault = document.querySelector('#design').firstElementChild;
	let isHidden = designThemeDefault.hidden;
	isHidden ? (designThemeDefault.hidden = 'false') : (designThemeDefault.hidden = 'true');
}

//============== Script Section: Activity registration  ==============//
registerForActivitiesContainer.addEventListener('click', (e) => {
	let checkBox = e.target;
	let name = checkBox.name;
	let data = checkBox.dataset;
	let date = data.dayAndTime;

	let allNodes = Array.from(document.querySelectorAll(`[data-day-and-time='${date}']`));
	for (let item in allNodes) {
		let checkboxName = allNodes[item].name;
		if (checkboxName !== name) {
			let checkboxToDisable = getCheckBox(checkboxName);
			toggleActivitiesCheckbox(checkboxToDisable);
		}
	}

	if (!formStateInvalidation) {
		isActivityValid();
	}

	updateActivitiesCost(); // update cost
});

function toggleActivitiesCheckbox(item) {
	return item.disabled ? enableCheckBox(item) : disableCheckBox(item);
}

function disableCheckBox(item) {
	item.parentNode.style.color = 'gray';
	item.disabled = true;
}

function enableCheckBox(item) {
	item.parentNode.style.color = 'black';
	item.disabled = false;
}

function getCheckBox(selector) {
	return registerForActivitiesContainer.querySelector(`[name="${selector}"]`);
}

// Selects the drop down item with the data provided
function invokeSelection(option, data) {
	for (let item in data) {
		if (data[item].selection === option) {
			for (let color in tShirtColorSelectionOptionsArray) {
				if (data[item].disabledcolors.includes(tShirtColorSelectionOptionsArray[color].value)) {
					tShirtColorSelectionOptionsArray[color].hidden = true;
				}
			}
		}
	}
}

//============== Script Section: Update Activities costs ==============//
function updateActivitiesCost() {
	createCostContainer();
	let total = calculateActivitesCost();
	updateTotalCosts(total);
}

function createCostContainer() {
	let activitiesFieldSet = document.querySelector('.activities'); // get the activites
	let container = document.createElement('div');
	container.id = 'currentCost';
	let costSpan = document.createElement('span');
	container.appendChild(costSpan);
	container.value = 'hidden';
	activitiesFieldSet.appendChild(container);
}

function updateTotalCosts(cost) {
	let currentActivitiesCost = document.getElementById('currentCost');
	let textField = currentActivitiesCost.firstElementChild;
	if (cost > 0) {
		textField.innerText = '$' + cost;
		currentActivitiesCost.hidden = false;
	} else {
		currentActivitiesCost.hidden = true;
	}
}

function calculateActivitesCost() {
	let totalCost = [...activitiesCostCheckboxes].reduce((_, activitiesItems) => {
		if (activitiesItems.checked) {
			let cost = parseInt(activitiesItems.dataset.cost);
			return (_ += cost);
		}
		return _;
	}, 0);

	return totalCost; // parsing to remove the leading 0 from string
}

//============== Payment information:   ==============//
paymentDropDown.addEventListener('change', (e) => {
	e.preventDefault();
	let selected = e.target.value;
	updatePaymentDropDown();
	formatPaymentSelection();
	activatePaymentSelection(selected);
});

function hideSelectPaymentMethod() {
	let selectPaymentMethod = document.querySelector('#payment').firstElementChild;
	selectPaymentMethod.hidden = true;
}

function activatePaymentSelection(selection) {
	let selectElements = {
		paypal: 'paypal',
		'credit card': 'credit-card',
		bitcoin: 'bitcoin',
	};

	for (let item in selectElements) {
		if (item === selection) {
			document.getElementById(selectElements[item]).hidden = false;
		} else {
			document.getElementById(selectElements[item]).hidden = true;
		}
	}
}

function setDefaultPaymentMethod(paymentMethod) {
	document.querySelector(`[value="${paymentMethod}"]`).selected = 'selected';
	activatePaymentSelection(paymentMethod);
}

// Updates the Payment Drop down 'Select Payment Method'
function updatePaymentDropDown() {
	let defaultPayment = document.querySelector('#payment').firstElementChild;
	let isHidden = defaultPayment.hidden;
	isHidden ? (defaultPayment.hidden = 'false') : (defaultPayment.hidden = 'true');
}

ccNum.addEventListener('blur', (e) => {
	if (formStateInvalidation) {
		validateCreditCardPaymentSection();
	}
});

ccNum.addEventListener('input', (e) => {
	let ccNumber = e.target.value;
	ccNumber == '' ? isCreditCardValid('Credit card cannot be blank') : isCreditCardValid(`${ccNumber} is not Valid`);
});

zipCode.addEventListener('blur', (e) => {
	if (formStateInvalidation) {
		validateCreditCardPaymentSection();
	}
});

zipCode.addEventListener('input', (e) => {
	let zipCode = e.target.value;
	zipCode < 5 ? isZipCodeValid('Zip Code cannot be blank') : isZipCodeValid(`${zipCode} is not Valid`);
});

cvvContainer.addEventListener('blur', (e) => {
	if (formStateInvalidation) {
		validateCreditCardPaymentSection();
	}
});

cvvContainer.addEventListener('input', (e) => {
	let cvvCode = e.target.value;
	cvvCode <= 3 ? isCVVCodeValid('CVV code cannot be blank') : isCVVCodeValid(`${cvvCode} is not Valid`);
});
//============== General Functions Section: Supporting functions  ==============//
// Resets the Page to default view
function reset() {
	tShirtColorSelectionOptionsArray.forEach((v) => {
		if (v.value) {
			v.hidden = false;
		}
		updateDesignDropDown();
	});
}

// ========= Form Validation section ========//
submitButton.addEventListener('click', (e) => {
	let userNameValid = isUserNameValid('Please enter a valid name.');
	let emailValid = isEmailValid();
	let activityValid = isActivityValid();
	let creditCardValid = true;
	if (isCCPaymentSelected()) {
		creditCardValid = validateCreditCardPaymentSection();
	}
	// this holds the current state of the validation
	formStateInvalidation = userNameValid && emailValid && activityValid && creditCardValid;
	if (formStateInvalidation === false) {
		e.preventDefault();
	}
});

function isUserNameValid(errMessage) {
	let isValidName = true;
	let isUserValid = validate(userField.value, /\w{1,}/gi);

	if (!isUserValid) {
		applyInvalidFieldFormat(userField, errMessage);
		isValidName = false;
	} else {
		removeInvalidFieldFormat(userField);
	}

	return isValidName;
}

function isEmailValid(errMessage = 'Invalid email') {
	let isValid = true;
	let isEmailValid = validate(emailField.value, /^\S+\@\S{1,}\.\S{2,}$/gi);
	if (!isEmailValid) {
		applyInvalidFieldFormat(emailField, errMessage);
		isValid = false;
	} else {
		removeInvalidFieldFormat(emailField);
	}
	return isValid;
}

function isActivityValid() {
	let isValid = true;
	let isActivitiesValid = validateActivities();
	if (!isActivitiesValid) {
		let messageTag = registerForActivitiesContainer.firstElementChild.firstElementChild;
		if (messageTag && messageTag.tagName === 'SPAN') {
			registerForActivitiesContainer.firstElementChild.firstElementChild.remove('span');
		}
		invalidFieldValidationLabelFormatter(registerForActivitiesContainer.firstElementChild); // this uses custom formatter bc of page structure
		invalidFieldValidationFormatter(activitiesTitle);
		updateWithWarningMessage(activitiesTitle, 'Please make a selection.');
		isValid = false;
	} else {
		let messageTag = registerForActivitiesContainer.firstElementChild.firstElementChild;
		if (messageTag && messageTag.tagName === 'SPAN') {
			registerForActivitiesContainer.firstElementChild.firstElementChild.remove('span');
		}
		validFieldLabelFormatter(registerForActivitiesContainer.firstElementChild); // this uses custom formatter bc of page structure
		validFieldFormatter(activitiesTitle);
	}
	return isValid;
}

function formatPaymentSelection() {
	removeInvalidFieldFormat(paymentDropDown);
	validFieldLabelFormatter(paymentDropDown.previousElementSibling);
	validFieldFormatter(paymentDropDown);
}

// credit card validations
function validateCreditCardPaymentSection() {
	removeInvalidFieldFormat(paymentDropDown);

	let isValidPaymentMethodSelected = isCCPaymentSelected();
	let isValid = false;

	if (isValidPaymentMethodSelected) {
		isValid = isCreditCardValid();
		isValid = isZipCodeValid();
		isValid = isCVVCodeValid();
	}

	return isValid;
}

// Credit card field validation
function isCreditCardValid(errMessage = 'Invalid Credit Card') {
	let isValidCreditCard = validCreditCardNumber();
	if (!isValidCreditCard) {
		removeInvalidFieldFormat(ccNum);
		applyInvalidFieldFormat(ccNum, errMessage);
	} else {
		removeInvalidFieldFormat(ccNum);
		isValid = true;
	}
	return isValidCreditCard;
}

// Zip code
function isZipCodeValid(errMessage = 'Invalid Zip Code') {
	let isZipValid = validZipCode();
	if (!isZipValid) {
		removeInvalidFieldFormat(zipCode);
		applyInvalidFieldFormat(zipCode, errMessage);
	} else {
		removeInvalidFieldFormat(zipCode);
	}
	return isZipValid;
}

// CVV
function isCVVCodeValid(errMessage = 'Invalid CVV code.') {
	let isCVVValid = validCVV();
	if (!isCVVValid) {
		removeInvalidFieldFormat(cvvContainer);
		applyInvalidFieldFormat(cvvContainer, errMessage);
	} else {
		removeInvalidFieldFormat(cvvContainer);
		isCVVValid = true;
	}
	return isCVVValid;
}

// validate the name field
function validate(field, validationCriteria) {
	let result = validationCriteria.test(field);
	return result;
}

function validateActivities() {
	let selections = [...activitiesCostCheckboxes].filter((item) => item.checked === true);
	return selections.length > 0;
}

function isCCPaymentSelected() {
	return paymentDropDown.value === 'credit card';
}

function isPayPalSelected() {
	return paymentDropDown.value === 'paypal';
}

function isBitCoinSelected() {
	return paymentDropDown.value === 'bitcoin';
}

function validCreditCardNumber() {
	if (creditCardContainer.hidden === false) {
		let number = convertToNumeric(ccNum.value);
		return (isCCValid = validate(number, /^([0-9]){13,16}$/));
	}
	return false;
}

function validZipCode() {
	if (creditCardContainer.hidden === false) {
		let zcode = convertToNumeric(zipCode.value);
		return (isZipValid = validate(zcode, /^([0-9]){5}$/));
	}
}

function validCVV() {
	if (creditCardContainer.hidden === false) {
		let cvvCode = convertToNumeric(cvv.value);
		return validate(cvvCode, /^([0-9]){3}$/);
	}
}

function convertToNumeric(value) {
	return parseInt(value) || 0;
}

function invalidFieldValidationFormatter(field) {
	field.style.border = '5px solid red';
}

function invalidFieldValidationLabelFormatter(label) {
	label.style.color = 'red';
	label.style.fontWeight = 'bold';
}

function validFieldFormatter(field) {
	if (field.style.border !== null) {
		field.style.border = null;
	}
}

function validFieldLabelFormatter(label) {
	if (label.style.fontWeight !== null) {
		label.style.fontWeight = null;
		label.style.color = null;
	}
}

function updateWithWarningMessage(object, text = 'Invalid selection.') {
	let messageSpan = document.createElement('span');
	object.style.width = '100%';
	messageSpan.innerText = `${text}`;
	messageSpan.style.fontWeight = 'normal';
	messageSpan.style.fontSize = 'initial';
	messageSpan.style.float = 'right';
	object.appendChild(messageSpan);
}

function updateCurrentText(object) {
	let arrSpan = object.firstElementChild;
	let currentText = object.innerText;
	if (arrSpan) {
		object.removeChild(arrSpan);
	} else {
		if (currentText.includes('**') || arrSpan) {
			object.innerText = currentText.split('**')[0];
		}
	}
}

// Formatter for the invalid inputs
function applyInvalidFieldFormat(field, errMessage = 'Invalid selection.') {
	removeInvalidFieldFormat(field);
	invalidFieldValidationLabelFormatter(field.previousElementSibling);
	invalidFieldValidationFormatter(field);
	updateWithWarningMessage(field.previousElementSibling, errMessage);
}

// formatter to remove the warning message
function removeInvalidFieldFormat(field) {
	updateCurrentText(field.previousElementSibling); // resets the value is set
	validFieldLabelFormatter(field.previousElementSibling);
	validFieldFormatter(field);
}
