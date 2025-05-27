

//checks if parts of form have not been filled out correctly
export default function CheckEmpty(formData, requiredFields) {
  for (let field of requiredFields) {
    if (!formData[field]) {
        console.log(field)    
        return field;
    }
  }
  return null;
}

