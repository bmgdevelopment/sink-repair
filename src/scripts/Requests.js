import { deleteRequest, getRequests } from './dataAccess.js';

//Requests() is exported to SinkRepair and rendered to the DOM for users to see under Service Requests
export const Requests = () => {
  const requests = getRequests(); //getRequests() is a copy of the mapped array of the returned objects in totality

  //PRINTING ALL REQUESTS TO THE DOM INF0 👀: The embedded expression below includes the map method, the return statement and the join method
  let html = `
        <ul class='all__requests'>
            ${requests.map(request => { //DELETE BUTTON ADDED
    return `<li class="request">
    🛠 ${request.description}
    <button class='request__delete' id='request--${request.id}'>
    Delete
    </button>
    </li>`;
  }).join('')
}
        </ul>
    `;
  return html;
};

//EVENT LISTENER FOR DELETE CLICK EVENT AND DELETING ACCORDING TO THE ID
const mainContainer = document.querySelector('#container');

mainContainer.addEventListener('click', click =>{
  if (click.target.id.startsWith('request--')) {
    const [,requestId] = click.target.id.split('--');
    deleteRequest(parseInt(requestId));
  }
});