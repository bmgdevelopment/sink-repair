import { deleteRequest, getRequests, getPlumbers, getCompletions, saveCompletion } from './dataAccess.js';
// import { choosePlumber } from './Plumbers.js';

const mainContainer = document.querySelector('#container');


//SELECTS THE PLUMBER AND ASSIGNS THE REQUEST ID TO THE PLUMBER SELECTED
const choosePlumber = () => {

  const plumbers = getPlumbers();
  const requestList = getRequests();
  const completions = getCompletions();
  
  let completion;

  completion = completions.map(comp => {
    return comp;
  });

  // The value of each option in the select element has the primary 
  // key of the service request AND the primary key of the plumber delimited 
  // with 2 dashes. This is because you need to have both the request and the 
  // chosen plumber to mark a job complete.

  const foundRequest = requestList.find(request => {
    return request.id === 1;

    // 🙃 can i iterate? can i return x that is iterated to return request.id === x? 
    // 🤓 the below if statement says to point to id number 1 of list item id value and then return query selected class plumbers
    //which is the select element drop down. it is indexed at 0 then to enter the options elements, you must index
    //again through the options; index 0 is choose option element, index 1 is Maude and index 2 is Merle
    
    // if (document.getElementById("1").querySelectorAll(".plumbers")[0][1]) {
    //   return request;
    // }

    // DISCOVERY:
    //This code below points to the second select element on the page which is indexed at 1
    //and then the parentElement.id points to the list item's value!!! 
    //document.querySelectorAll(".plumbers")[1].parentElement.id 
    // "2"

    //DISCOVERY: 
    //  Below points to the select tag element class plumbers indexted at 0
    //but if a number iterated was there, it could iterate through the list items;
    //then the index would point to which list item is being referenced by using .parentElement.id
    //but the example below points to the select element, within a specific list item AND 
    //the selected plumber! 1 is Maude and 2 is Merle! 
    // document.querySelectorAll(".plumbers")[0][1]
    // <option id=​"plumbers" name=​"plumber" value=​"1--1">​Maude​</option>​


// if statement stating if maude is clicked within the select element indexed properly, 
// assign the found.request.id value to the select element's parentElement.id!!!

    // if (completion.length === 1) {
    //   return request.id === completion[0].requestId;
    // } else if (completion.length > 1) {
    //   let i=0;
    //   i++;
    //   return request.id === completion[i].requestId;
    // }
  });

  let html = '';

  let plumberList = plumbers.map(plumber => {
    return `<option id="plumber" name="plumber" value="${foundRequest.id}--${plumber.id}"/>${plumber.name}</option>`;
  });

  html += plumberList.join('');
  return html;

};


//CREATES THE COMPLETION OBJECT AND POSTS TO COMPLETION ARRAY API
mainContainer.addEventListener('change', (event) => {
  if (event.target.id === ('plumber')) {
    // event.target.preventDefault();
    const [requestIdFound, plumberIdFound] = event.target.value.split('--');
      
    let requestIdNum = parseInt(requestIdFound);
    let plumberIdNum = parseInt(plumberIdFound);

    const longDate = Date(Date.now());
    const dateSplitAtYear = longDate.split(' 2021 '); 
    const dateUponCompletion = dateSplitAtYear[0] + ', 2021'; 


    const completedRequest = {
      requestId : requestIdNum,
      plumberId : plumberIdNum,
      date_created : dateUponCompletion
    };

    /*
              Invoke the function that performs the POST request
              to the `completions` resource for your API. Send the
              completion object as a parameter.
           */
    if (requestIdFound > 0 && plumberIdFound > 0) {
      saveCompletion(completedRequest);
    }
 

  }
}
);

//Requests() is exported to SinkRepair and rendered to the DOM for users to see under Service Requests
export const Requests = () => {
  const requests = getRequests(); //getRequests() is a copy of the mapped array of the returned objects in totality

  //PRINTING ALL REQUESTS TO THE DOM INF0 👀: The embedded expression below includes the map method, the return statement and the join method
  let html = `
        <ul class='all__requests'>
            ${requests.map(request => { //DELETE BUTTON ADDED
    return `<li class="request" id="${request.id}">
    🛠 ${request.description}
    <select class="plumbers" id="plumbers">
  <option value="">Choose</option>
    ${choosePlumber()}
    </select>
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
mainContainer.addEventListener('click', click =>{
  if (click.target.id.startsWith('request--')) {
    const [,requestId] = click.target.id.split('--');
    deleteRequest(parseInt(requestId));
  }
});