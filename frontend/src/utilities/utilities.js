
import { jwtDecode } from 'jwt-decode';



//checks if parts of form have not been filled out correctly
export function CheckEmpty(formData, type) {
  let requiredFields =[]

  if (type === 'station') {
    requiredFields = [
      'username',
      'channelName',
      'streamUrl',
      'email',
      'password',
    ];
  } else if (type === 'listener') {
    requiredFields = [
      'firstName',
      'lastName',
      'username',
      'email',
      'password',
    ];
  } else if (type === 'login') {
    requiredFields = [
      'username',
      'password'
    ];
  } else {
    requiredFields =[]
  }

  for (let field of requiredFields) {
    if (!formData[field]) {
        console.log(field)    
        return field;
    }
  }
  return null;
}

export function LogOut() {
  localStorage.removeItem('authToken');
}

export function checkToken() {
  const token = localStorage.getItem('authToken');
  if(token){
    return true;
  } else {
    return false;
  }
}

//captialize first letter
export function captializeWord(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getCurrentUser() {
  const authToken = localStorage.getItem('authToken');
  // do nothing if no valid token
  if(!authToken)
    return
  //return token
  return jwtDecode(authToken);
}

// send form data to backend for processing
export async function postData(url, data) {
  const response = await fetch (url, {
    method: 'POST',
    headers: {'content-type' : 'application/json'},
    body: JSON.stringify(data)
  });
  const json = await response.json();
  return { ok: response.ok, status: response.status, ...json };
}
