# interactiveforms
Project for interactive forms.

## Project Outline:
The project demonstrates how through js and dom manipulation it is possible to create an interactive form that provides:
- DOM Manipulation 
- Validation on submit, and in real time
- Utilizing event handlers to control the UI

## Areas of Interest:
1. On Load the cursor is placed in the User Name field
2. Job role drop down will display an 'Other' category when selected, otherwise it is hidden.
3. T-Shirt selection drop down will hide the 'color' field until the  user selects theme.
4. The Register for Activities:
  - Add a total cost value to the bottom of the container when a user selects an activity.
  - The total is updated in real time.  When the user selects or unselects an activity the cost is updated accordingly.
  - If the user does not select an activity, the user will be warned on form submission that the field is required.
5. Payment Information:
  - Credit Card is the default payment type that is shown by default, the other methods: PayPal amd Bitcoin are hidden on page load.
  - Each of the fields in the Credit Card section are checked in real time as well as on form submission.
6. Form validation:
  - On submission the following fields are validated as required: 
      - Name, Email (must be properly formatted)
      - One item in the 'Activites' is selected
      - and, the Credit Card details: Credit Card Number is between 13 and 16 numbers long, the Zip Code is 5 numbers long, and the CVV is 3 numbers long
  - Validation messages for each of the required fields is displayed if there is invalid entry.
  - On an empty form sumbission all required fields will be highlighted as invalid with a message.
