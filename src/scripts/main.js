/* eslint-disable no-console */
import { SinkRepair } from './SinkRepair.js';
import { fetchRequests } from './dataAccess.js';


const mainContainer = document.querySelector('#container');


const render = () => {
  fetchRequests().then(
    () => {
      mainContainer.innerHTML = SinkRepair();
    }
  );
};

render();
    
mainContainer.addEventListener('stateChanged', () => {
  console.log('State of data has changed. Regenerating HTML...');
  render();
}
);


