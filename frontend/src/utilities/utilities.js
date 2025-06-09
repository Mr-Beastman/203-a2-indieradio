

//checks if parts of form have not been filled out correctly
export function CheckEmpty(formData, type) {
  let requiredFields =[]

  if (type === 'artist') {
    requiredFields = [
      'firstName',
      'lastName',
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
