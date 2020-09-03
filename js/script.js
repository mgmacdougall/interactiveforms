let nameField = document.querySelector('#name');
let occupationContainer = document.querySelector('.occupation');
let userTitleSelection = document.querySelector('#title');
let tShirtDesignSelection = document.getElementById('design');
let tShirtColorSelect = document.querySelector('#color');
let tShirtColorSelectionOptions = document.getElementById('color');

let registerForActivitiesContainer = document.querySelector('.activities');

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

//============== Payment information:   ==============//

let paymentDropDown = document.getElementById('payment');

paymentDropDown.addEventListener('change', (e) => {
	e.preventDefault();
	let selected = e.target.value;

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

// Resets the TShirt design drop down
function updateDesignDropDown() {
	let designThemeDefault = document.querySelector('#design').firstElementChild;
	let isHidden = designThemeDefault.hidden;
	isHidden ? (designThemeDefault.hidden = 'false') : (designThemeDefault.hidden = 'true');
}
