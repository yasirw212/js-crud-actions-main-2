const form = document.querySelector("form")

form.addEventListener('submit', function(event){
  event.preventDefault()
  const formData = new FormData(form)

  const newProduct = {
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    color: formData.get("color"),
    description: formData.get("description")
  }

  axios.post(`/api/products`, newProduct)
  .then(processResults)
  .catch(errorHandlers)
  
})

function errorHandlers({response}){
  const errors = response.data
  const errorElements  = document.getElementsByClassName("error")
  console.log(errorElements)
  for (let i = 0; i < errors.length; i++){
    const {field, message} = errors[i]
    const element = document.getElementsByName(field)[0].nextElementSibling
    element.textContent = message
  }
}

function processResults({ data }) {
  document.querySelector("form").reset();
  window.alert(`${data.name} added with id: ${data.id}`);
}
