var express = require("express");
var router = express.Router();

module.exports = function (db) {
  router.get("/products", function(req, res, next){
    res.status(200).send(db.get("products"))
  })

  router.get('/products/search', function(req, res, next){
    const productsArray = db.get("products")
    const name = req.query.name
    const price = Number(req.query.price)
    const color = req.query.color

    res.status(200).send(productsArray.filter(product => (color ? product.color.toLowerCase() == color.toLowerCase() : true) && (price ? price > product.price : true) && (name ? product.name.toLowerCase().indexOf(name.toLowerCase()) >= 0 : true)))
  })

  router.get("/products/:id", function(req, res, next){
    res.status(200).send(db.get("products").find(product => product.id == req.params.id))
  })

  router.post("/products", function(req, res, next){
    const newProduct = req.body
    let errors = []
    if(!req.body.name){
      errors.push({
        field: "name",
        error: "required",
        message: "Name is required"
      })
    }

    if(newProduct.price && isNaN(Number(newProduct.price))){
      errors.push({
        field: "price",
        error: "type",
        message: "Price must be a number"
      })
    }

    if(newProduct.name.length > 25){
      errors.push({
        field: "name",
        error: "length",
        message: "Name cannot be longer than 25 characters"
      })
    }
    if(errors.length){
        res.status(422).send(errors)
    } else {
      res.status(201).send(db.get("products").insert(req.body).write())
    }
  })

  router.delete("/products/:id", function(req, res, next){
    const index = db.get("products").findIndex(product => product.id == req.params.id)
    db.get("products").splice(index, 1).write()

    res.status(200).send(db.get("products"))
  })

  router.patch("/products/:id", function(req, res, next){
    db.get("products").find(product => product.id == req.params.id).assign(req.body).write()

    res.status(200).send(db.get("products"))
  })

  return router;
};
