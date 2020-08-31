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
	reset(); // reset the values

	const selections = [
		{
			selection: 'js puns',
			disabledcolors: ['tomato', 'steelblue', 'dimgrey'],
		},
		{
			selection: 'heart js',
			disabledcolors: ['cornflowerblue', 'darkslategrey', 'gold'],
		},
	];
	let tShirtSelectionType = e.target.value;

	if (tShirtSelectionType === 'js puns') {
		for (let c in selections) {
			if (selections[c].selection === 'js puns') {
				for (let v in tShirtColorSelectionOptionsArray) {
					console.log(tShirtColorSelectionOptionsArray[v].value);
					if (selections[c].disabledcolors.includes(tShirtColorSelectionOptionsArray[v].value)) {
						tShirtColorSelectionOptionsArray[v].disabled = true;
					}
				}
			}
		}
	}

	// If sthirt value is "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
	else if (tShirtSelectionType === 'heart js') {
		for (let c in selections) {
			if (selections[c].selection === 'heart js') {
				for (let v in tShirtColorSelectionOptionsArray) {
					console.log(tShirtColorSelectionOptionsArray[v].value);
					if (selections[c].disabledcolors.includes(tShirtColorSelectionOptionsArray[v].value)) {
						tShirtColorSelectionOptionsArray[v].disabled = true;
					}
				}
			}
		}
	}
});

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
