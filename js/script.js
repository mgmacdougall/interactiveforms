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

// Fields input
let userField = document.getElementById('name');
let emailField = document.getElementById('mail');
let ccNum = document.getElementById('cc-num');
let zipCode = document.getElementById('zip');
let cvvContainer = document.getElementById('cvv');

let submitButton = document.querySelector("[type='submit']");
let tShirtColorSelectionOptionsArray = Array.from(tShirtColorSelectionOptions.getElementsByTagName('option'));

const selectionOther = 'other';

//============== Window Event listener to set focus to Name field ==============//
window.addEventListener('load', (e) => {
	nameField.focus();
	hideOtherInput();
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
//============== Script Section: T-Shirt Design control section ==============//
tShirtDesignSelection.addEventListener('change', (e) => {
	e.preventDefault();
	reset(); // reset the values before starting
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

	// default selection:
	let defaultSelection = tshirtData[tShirtSelectionType].defaultColor;
	setDefaultTshirtColorOption(defaultSelection);
	updateDesignDropDown();
});

// sets the default value displaying in the drop down selection
function setDefaultTshirtColorOption(color) {
	document.querySelector(`[value='${color}']`).selected = 'true'; // sets the default value
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
let paymentDropDown = document.getElementById('payment');

paymentDropDown.addEventListener('change', (e) => {
	e.preventDefault();
	let selected = e.target.value;
	updatePaymentDropDown();

	// This is needed to replace the - in the in the event that the selection is missing a'-'
	let selectionItem = selected.replace(/\W+/, '-');

	let selectElements = {
		paypal: 'paypal',
		'credit-card': 'credit-card',
		bitcoin: 'bitcoin',
	};

	for (let item in selectElements) {
		if (selectElements[item] !== selectionItem) {
			document.getElementById(selectElements[item]).hidden = true;
		} else {
			document.getElementById(selectElements[item]).hidden = false;
		}
	}
});

// Updates the Payment Drop down 'Select Payment Method'
function updatePaymentDropDown() {
	let defaultPayment = document.querySelector('#payment').firstElementChild;
	let isHidden = defaultPayment.hidden;
	isHidden ? (defaultPayment.hidden = 'false') : (defaultPayment.hidden = 'true');
}

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
	let isFormValid = true;

	let isUserValid = validate(userField.value, /\w{1,}/gi);
	if (!isUserValid) {
		invalidFieldValidationLabelFormatter(userField);
		invalidFieldValidationFormatter(userField);
		isFormValid = false;
	} else {
		validFieldLabelFormatter(userField);
		validFieldFormatter(userField);
	}

	let isEmailValid = validate(emailField.value, /^\w{1,}\@\w{1,}\.\w{2,}/gi);
	if (!isEmailValid) {
		invalidFieldValidationLabelFormatter(emailField);
		invalidFieldValidationFormatter(emailField);
		isFormValid = false;
	} else {
		validFieldLabelFormatter(emailField);
		validFieldFormatter(emailField);
	}

	let isActivitiesValid = validateActivities();
	if (!isActivitiesValid) {
		activitiesTitle.style.fontWeight = 'bold';
		activitiesTitle.style.color = 'red';
		invalidFieldValidationFormatter(activitiesTitle);
		isFormValid = false;
	} else {
		activitiesTitle.style.fontWeight = null;
		activitiesTitle.style.color = null;
		validFieldFormatter(activitiesTitle);
	}

	let isValidCreditCard = validCreditCardNumber();
	if (!isValidCreditCard) {
		invalidFieldValidationLabelFormatter(ccNum);
		invalidFieldValidationFormatter(ccNum);
		isFormValid = false;
	} else {
		validFieldLabelFormatter(ccNum);
		validFieldFormatter(ccNum);
	}

	let isZipValid = validZipCode();
	if (!isZipValid) {
		invalidFieldValidationLabelFormatter(zipCode);
		invalidFieldValidationFormatter(zipCode);
		isFormValid = false;
	} else {
		validFieldLabelFormatter(zipCode);
		validFieldFormatter(zipCode);
	}

	let isCVVValid = validCVV();
	if (!isCVVValid) {
		invalidFieldValidationLabelFormatter(cvvContainer);
		invalidFieldValidationFormatter(cvvContainer);
		isFormValid = false;
	} else {
		validFieldLabelFormatter(cvvContainer);
		validFieldFormatter(cvvContainer);
	}

	if (isFormValid === false) {
		e.preventDefault();
	} else {
		e.preventDefault();
		console.log('Normally a post would happen here but swallowing for now');
	}
});

// validate the name field
function validate(field, validationCriteria) {
	let result = validationCriteria.test(field);
	return result;
}

function validateActivities() {
	let selections = [...activitiesCostCheckboxes].filter((item) => item.checked === true);
	[...activitiesCostCheckboxes].forEach((item) => console.log(item.checked === true));
	return selections.length > 0;
}

function validCreditCardNumber() {
	if (creditCardContainer.hidden === false && paymentDropDown.value === 'credit card') {
		let number = ccNum.value;
		return (isCCValid = validate(number, /\d{13,16}/));
	}
}

function validZipCode() {
	if (creditCardContainer.hidden === false) {
		let zcode = zipCode.value;
		return (isZipValid = validate(zcode, /\d{5}/));
	}
}

function validCVV() {
	if (creditCardContainer.hidden === false) {
		let cvvCode = cvv.value;
		return validate(cvvCode, /[0-9]{3}/);
	}
}

function invalidFieldValidationFormatter(field) {
	field.style.border = '5px solid red';
}

function invalidFieldValidationLabelFormatter(field) {
	let label = field.previousElementSibling;
	label.style.color = 'red';
	label.style.fontWeight = 'bold';
}

function validFieldFormatter(field) {
	if (field.style.border !== null) {
		field.style.border = null;
	}
}

function validFieldLabelFormatter(field) {
	let label = field.previousElementSibling;
	if (label.style.fontWeight !== null) {
		label.style.fontWeight = null;
		label.style.color = null;
	}
}

// Resets the TShirt design drop down
function updateDesignDropDown() {
	let designThemeDefault = document.querySelector('#design').firstElementChild;
	let isHidden = designThemeDefault.hidden;
	isHidden ? (designThemeDefault.hidden = 'false') : (designThemeDefault.hidden = 'true');
}
