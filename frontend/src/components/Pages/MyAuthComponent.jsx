// // src/MyAuthComponent.js
// import { useGoogleApi } from 'react-gapi'


// const Start = (gapi) => {
  
//   // 2. Initialize the JavaScript client library.
//   gapi.client.init({
//     'apiKey': 'AIzaSyBaraHY2B0lV4zY5dRPVzAo3vmINCXAk0Y',
//     // clientId and scope are optional if auth is not required.
//     'clientId': '40437059847-laiqou1tu207lp45j76b99r10lb63s4f.apps.googleusercontent.com',
//     'scope': 'profile',
//   }).then(function() {
//     // 3. Initialize and make the API request.
//     return gapi.client.request({
//       'path': 'https://people.googleapis.com/v1/people/me?requestMask.includeField=person.names',
//     })
//   }).then(function(response) {
//     console.log(response.result);
//   }, function(reason) {
//     console.log('Error: ' + reason.result.error.message);
//   });
// };

// export function MyAuthComponent() {
  
//   const gapi = useGoogleApi({
//   scopes: [
//     'profile',
//   ],
// })
// console.log(gapi)
//   gapi.load('client', Start(gapi));
//   return (
//     <></>
//   )
// }

// export default MyAuthComponent

// 1. Load the JavaScript client library.


// src/MyAuthComponent.js
import { useGoogleApi } from 'react-gapi'

export function MyAuthComponent() {
  const gapi = useGoogleApi({
    // 'apiKey':'AIzaSyBaraHY2B0lV4zY5dRPVzAo3vmINCXAk0Y',
    scopes: [
      'profile',
    ],
  })

  const auth = gapi?.auth2.getAuthInstance()

  return <div>{
    !auth
      ? <span>Loading...</span>
      : auth?.isSignedIn.get()
        ? `Logged in as "${auth.currentUser.get().getBasicProfile().getName()}"`
        : <button onClick={() => auth.signIn()}>Login</button>
  }</div>
}