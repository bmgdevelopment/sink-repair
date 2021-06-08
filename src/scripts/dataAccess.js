const applicationState = {}; //temporary empty object that holds the user input prior to pressing the button and solidifying the request
const API = 'http://localhost:8088'; //weblink that hosts all the database.json information
const mainContainer = document.querySelector('#container'); //needed to target the main section if the DOM

export const fetchRequests = () => {
  return fetch(`${API}/requests`)
    .then(response => response.json()) //what's returned back from data is the response and then it's converted into json/parsing into our object
    .then(
      (serviceRequests) => {
        // Store the external state in application state
        applicationState.requests = serviceRequests;
      }
    );
};

export const getRequests = () => {
  return applicationState.requests.map(request => ({...request}))
};

//The POST method on any HTTP request means "Hey API!! 
// I want you to create something new!"
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            //sends dispatch event so all requests can be seen under 'Service Requests'
            mainContainer.dispatchEvent(new CustomEvent("stateChanged")) 
        })
}

//DELETE REQUEST FUNCTION BELOW
//The function whose responsiblity it is to initiate the fetch request for DELETE must 
//have the primary key sent to it as an argument.
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                console.log('A request has been deleted')
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// MAIN VERBIAGE FOR JSON: 
// get & fetch--retreive data from API; Please give me this resource.
// post--places new information; Please create something new. 
// delete--self explanatory; Please delete an existing.
// put--update & replace current existing information; Please modify an existing resource.
// mocking data -- copying info from API to local storage for no internet access