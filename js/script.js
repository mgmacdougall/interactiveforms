let nameField = document.querySelector('#name');
let occupationContainer = document.querySelector('.occupation');
let userTitleSelection = document.querySelector('#title');
let tShirtDesignSelection = document.querySelector('#design');
let tShirtColorSelect = document.querySelector('#color');
let tShirtColorSelectionOptions = document.getElementById('color');

let tShirtColorSelectionOptionsArray = Array.from(tShirtColorSelectionOptions.getElementsByTagName('option'));

const selectionOther = 'other';

window.addEventListener('load', (e) => {
	nameField.focus();
	hideOtherInput();
});

userTitleSelection.addEventListener('change', (e) => {
	e.preventDefault();
	let selection = e.target.value;
	if (selection === selectionOther) {
		displayOtherInput();
	} else {
		hideOtherInput();
	}
});

tShirtDesignSelection.addEventListener('change', (e) => {
	e.preventDefault();
	reset(); // reset the values before starting
	const tshirtData = [
		{ selection: '', disabledcolors: [] },
		{
			selection: 'js puns',
			disabledcolors: ['tomato', 'steelblue', 'dimgrey'],
		},
		{
			selection: 'heart js',
			disabledcolors: ['cornflowerblue', 'darkslategrey', 'gold'],
		},
	];
	let tShirtSelectionType = e.target.selectedIndex; // gets the selected index of the item selected
	invokeSelection(tshirtData[tShirtSelectionType].selection, tshirtData); // passes data to the invoke Selection
});

// Selects the drop down item with the data provided
function invokeSelection(option, data) {
	for (let item in data) {
		if (data[item].selection === option) {
			for (let color in tShirtColorSelectionOptionsArray) {
				console.log(tShirtColorSelectionOptionsArray[color].value);
				if (data[item].disabledcolors.includes(tShirtColorSelectionOptionsArray[color].value)) {
					tShirtColorSelectionOptionsArray[color].disabled = true;
				}
			}
		}
	}
}

// Reset function to reset all the values in the drop downs
function reset() {
	tShirtColorSelectionOptionsArray.forEach((v) => {
		console.log(v.disabled);
		if (v.value) {
			v.disabled = false;
		}
	});
}

function displayOtherInput() {
	occupationContainer.style.display = 'block';
}

function hideOtherInput() {
	occupationContainer.style.display = 'none';
}
