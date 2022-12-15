document.getElementById("search").addEventListener('click', function(event){
  event.preventDefault()
  const productName = document.getElementById("search-terms").value
  const price = document.getElementById("price").value
  const color = document.getElementById("color").value
  
  axios.get(`/api/products/search?name=${productName}&price=${price}&color=${color}`)
  .then(showResults)
})



function showResults({ data }) {
  document.querySelector("h2").className = "hidden";

  const productList = document.getElementById("product-list");
  if (productList) {
    productList.remove();
  }

  if (data.length === 0) {
    document.querySelector("h2.hidden").className = "";
  }

  const template = document.querySelector("#list-result");
  const clone = template.content.cloneNode(true);

  const ul = clone.querySelector("ul");
  data.forEach((d) => {
    const li = clone.querySelector("li").cloneNode(true);
    const id = li.querySelector("#product-id");
    id.textContent = d.id;
    id.onclick = (e) => {
      document.getElementById("product-id").value = e.currentTarget.textContent;
    };
    li.querySelector("#product-name").textContent = d.name;
    li.querySelector("#product-price").textContent = d.price;

    ul.appendChild(li);
  });

  results.appendChild(clone);
}
