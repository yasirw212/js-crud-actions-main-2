document.getElementById("delete").addEventListener('click', function(event){
  event.preventDefault()
  const productId = document.getElementById("product-id")
  axios.delete(`/api/products/${productId}`)
  .then(processResult)
})

function processResult() {
  window.alert("Product deleted!");
}
