import fetch from 'cross-fetch';



 export default function getCurrentUser ()   {
    let user = {};
    user =  fetch(`http://localhost:5000/me`, {
            headers: {
                Authorization: `Bearer ${  localStorage.getItem('authToken')}`
            }
        })
            .then(
                response =>  response.json()
            )
            .then(json =>
            {
                user = JSON.stringify(json);
                return json;
            }).catch( err => {
                console.log(err)
              })
     return user;       
}

