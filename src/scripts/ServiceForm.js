import { sendRequest } from './dataAccess.js';

const mainContainer = document.querySelector('#container');

mainContainer.addEventListener('click', clickEvent => {
  if (clickEvent.target.id === 'submitRequest') {
    // Get what the user typed into the form fields
    const userDescription = document.querySelector('input[name=\'serviceDescription\']').value;
    const userAddress = document.querySelector('input[name=\'serviceAddress\']').value;
    const userBudget = document.querySelector('input[name=\'serviceBudget\']').value;
    const userDate = document.querySelector('input[name=\'serviceDate\']').value;

    // Make an object out of the user input
    //🤓 Where are the quotes around the key and value like in the database.json file?
    //🧠 When is the id created when the new object is created?
    const dataToSendToAPI = {
      description: userDescription,
      address: userAddress,
      budget: parseInt(userBudget), //needed to convert string into number/integer
      neededBy: userDate
    };
    // Send the data to the API for permanent storage; sendRequest() is in dataAccess.js
    sendRequest(dataToSendToAPI);
  }
});

export const ServiceForm = () => {
  let html = `
    <div class="field">
        <label class="label" for="serviceDescription">Description</label>
        <input type="text" name="serviceDescription" class="input" />
    </div>
    <div class="field">
        <label class="label" for="serviceAddress">Address</label>
        <input type="text" name="serviceAddress" class="input" />
    </div>
    <div class="field">
        <label class="label" for="serviceBudget">Budget</label>
        <input type="number" name="serviceBudget" class="input" />
    </div>
    <div class="field">
        <label class="label" for="serviceDate">Date needed</label>
        <input type="date" name="serviceDate" class="input" />
    </div>

    <button class="button" id="submitRequest">Submit Request</button>
`;
  return html;
};

