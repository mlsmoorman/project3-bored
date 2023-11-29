import tokenService from "./tokenService";

// C(R)UD Operation for Activities Model --- not yet working
async function index() {
    try {
        const response = await fetch ("api/activities", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + tokenService.getToken(),
            },
        })
        const data = await response.json();
        console.log("===========data===============", data);
   
        return data    
    } catch(err) {
        console.log(err);
    }
    
}

// (C)RUD Operation for Activities Model --- not yet working
async function create(activityData) {
    try {
        const response = await fetch("/api/activities", {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json', Authorization: "Bearer " + tokenService.getToken()}),
                body: JSON.stringify(activityData)
        })

        const data = await response.json();
        return data
    } catch(err) {
        console.log(err)
    } 
}

// CR(U)D Operation for Activities Model --- not yet working
async function update(activityId) {
    // api call / fetch request goes here

    try {
        const response = await fetch(`api/activities/${activityId}`, {
            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json', Authorization: "Bearer " + tokenService.getToken()}),
            body: JSON.stringify(activities)
        })
    const data = await response.json();
    return data
    } catch(err) {
        console.log(err)
    }
}


// ***************** DELETE THIS *****************
async function learning() {
    return fetch("api/acitivities", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + tokenService.getToken(),
        },
    })
    .then(responseFromTheServer => {
        return responseFromTheServer.json()
    })
    
}

export default {
    index,
    create,
    update,
    learning
}