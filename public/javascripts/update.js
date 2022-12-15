let currentProduct = null;

document.getElementById("load").onclick = function () {
  const productId = document.getElementById("product-id").value;

  axios.get(`/api/products/${productId}`).then(({ data }) => {
    currentProduct = data;
    loadProduct(data);
  });
};

const form = document.querySelector("form")

form.addEventListener('submit', function(event){
  event.preventDefault()

  const productId = document.getElementById("product-id").value
  console.log(productId)
  const formData = new FormData(form)
  const newProduct = {
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    color: formData.get("color"),
    description: formData.get("description")
  }

  axios.patch(`/api/products/${productId}`, newProduct)
  .then(processResults)
})

function loadProduct(data) {
  document.getElementsByName("name")[0].value = data.name;
  document.getElementsByName("price")[0].value = data.price;
  document.getElementsByName("quantity")[0].value = data.quantity;
  document.getElementsByName("color")[0].value = data.color;
  document.getElementsByName("description")[0].value = data.description;
}

function processResults({ data }) {
  document.querySelector("form").reset();
  window.alert(`Product ${data.id} updated!`);
}
