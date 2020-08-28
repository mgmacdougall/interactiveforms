let nameField = document.querySelector('#name');
let occupationContainer = document.querySelector('.occupation');
let userTitleSelection = document.querySelector('#title');

const selectionOther = 'other';

window.addEventListener('load', (e) => {
	nameField.focus();
	occupationContainer.style.display = 'none';
});

userTitleSelection.addEventListener('change', (e) => {
	e.preventDefault();
	let selection = e.target.value;
	if (selection === selectionOther) {
		displayOtherInput();
	}
});

function displayOtherInput() {
	occupationContainer.style.display = 'block';
}
