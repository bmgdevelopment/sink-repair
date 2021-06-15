// 1️⃣ the consts are defined for use within this module

const applicationState = {}; //temporary empty object that holds the user input prior to pressing the submit request button and solidifying the request
const API = 'http://localhost:8088'; //weblink that hosts all the database.json information
const mainContainer = document.querySelector('#container'); //needed to target the main section if the DOM


// 2️⃣ const fetchRequests() is used to return the requests array via the API link using the fetch method
// 3️⃣ After the fetch method retrieves the requests array, the then method takes the response parameter and 
//submits the requests array as the argument. .then() attaches callbacks for the resolution and/or rejection of the Promise.
// 4️⃣ the response (requests array) is converted into json using method .json()
// 5️⃣ .then() method is used next to create another parameter which is serviceRequests and the response.json() conversion
//is submitted as an argument
// 6️⃣ the empty obj applicationState now has a key created called "requests" and the key is the argument.
//In this case, the argument passed for this argument is the response.json() array data
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

// 7️⃣ const getRequests() is used to return the empty state obj's requests DATA?? 
// then the requests data is converted into a copied array with each objects keys and values
// this is later imported into Request.js
export const getRequests = () => {
  return applicationState.requests.map(request => ({...request}))
};

//The POST method on any HTTP request means "Hey API!! I want you to create something new!"
// 8️⃣ the const sendRequest uses the parameter of userServiceRequest.
// a const fetchOptions is defined and holds instructions to post the sent request
// NEED MORE INFO 👀
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest) //.stringify - Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
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
//
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