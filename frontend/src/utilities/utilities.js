

//checks if parts of form have not been filled out correctly
export function CheckEmpty(formData, requiredFields) {
  for (let field of requiredFields) {
    if (!formData[field]) {
        console.log(field)    
        return field;
    }
  }
  return null;
}

export async function postData(url, data) {
  const response = await fetch (url, {
    method: 'POST',
    headers: {'content-type' : 'application/json'},
    body: JSON.stringify(data)
  });
  return response.json()
}

