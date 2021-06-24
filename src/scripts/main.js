/* eslint-disable no-console */
import { SinkRepair } from './SinkRepair.js'; //holds the html to be rendered to the DOM
import { fetchRequests, fetchPlumbers, fetchCompletions } from './dataAccess.js';


const mainContainer = document.querySelector('#container');


const render = () => {
  fetchPlumbers().then(() => {
    fetchRequests().then(() => {
      fetchCompletions().then(() => {
        mainContainer.innerHTML = SinkRepair();
      });
    });
  });
};

render();
    
mainContainer.addEventListener('stateChanged', () => {
  console.log('State of data has changed. Regenerating HTML...');
  render();
}
);


