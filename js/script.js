let nameField = document.querySelector('#name');
let occupationContainer = document.querySelector('.occupation');
let userTitleSelection = document.querySelector('#title');
let tShirtDesignSelection = document.querySelector('#design');

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

	// These are the tshirt selections.
	const selections = [
		{
			selection: 'js puns',
			colors: ['cornflowerblue', 'darkslategrey', 'darkslategrey'],
		},
		{
			selection: 'heart js',
			colors: ['tomato', 'steelblue', 'dimgrey'],
		},
	];
	let tShirtSelectionType = e.target.value;

	// If tshirt value is Theme - JS Puns -> display Cornflower Blue," "Dark Slate Grey," and "Gold."
	if (tShirtSelectionType === 'js puns') {
		for (let c in selections) {
			if (selections[c].selection === 'js puns') {
				console.log(selections[c].colors);
			}
		}
	}

	// If sthirt value is "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
	if (tShirtSelectionType === 'heart js') {
		for (let c in selections) {
			if (selections[c].selection === 'heart js') {
				console.log(selections[c].colors);
			}
		}
	}

	// When a new Selection is made in the Design menu - then Both the color and and drop down menu is change
});

function displayOtherInput() {
	occupationContainer.style.display = 'block';
}

function hideOtherInput() {
	occupationContainer.style.display = 'none';
}
