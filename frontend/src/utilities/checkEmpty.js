
export default function CheckEmpty(formData, requiredFields) {
  for (let field of requiredFields) {
    if (!formData[field]) {
        console.log(field)    
        return field;
    }
  }
  return null;
}