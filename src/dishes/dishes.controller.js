const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
/*
{
  "data": [
    {
      "id": "d351db2b49b69679504652ea1cf38241",
      "name": "Dolcelatte and chickpea spaghetti",
      "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
      "price": 19,
      "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
    }
  ]
}
*/

// TODO
function create(req, res) {
  const { data: { obj } = {} } = req.body;
  const newDish = {
    id: nextId,
    name,
    description,
    price,
    image_url,
  };
  dishes.push(newDish);
  res.status(201).json({ data: newDish });
}

// Validation functions

function nameValidation(req, res, next) {
  const { data: { name } = {} } = req.body;

  if (name) {
    return next();
  }
  next({ status: 400, message: "Dish must include a name" });
}

function descriptionValidation(req, res, next) {
  const { data: { description } = {} } = req.body;

  if (description) {
    return next();
  }
  next({ status: 400, message: "Dish must include a description" });
}

function priceValidation(req, res, next) {
  const { data: { price } = {} } = req.body;

  if (price) {
    return next({ status: 400, message: "Dish must include a price" });
} else if (typeof data.price !== "number" || data.price < 1) {
    return next({
        status: 400,
        message: "Dish must have a price that is an integer greater than 0",
    });
}
return next();
}

function imageUrlValidation(req, res, next) {
  const { data: { image_url } = {} } = req.body;

  if (image_url) {
    return next();
  }
  next({ status: 400, message: "Dish must include a image_url" });
}

// DONE
function read(req, res) {
  const { dishId } = req.params;
  const dishFound = dishes.find((dish) => dish.id === dishId);
  res.json({ data: dishFound });
}

// TODO
function update(req, res) {
  // const foundUse = res.locals.use;
  const dishId = Number(req.params.dishId);
  const foundUse = dishes.find((dish) => dish.id === dishId);
  const { data: { text } = {} } = req.body;
  foundUse.text = text;
  res.json({ data: foundUse });
}

// DONE
function list(req, res) {
  res.json({ data: dishes });
}

module.exports = {
  create: [nameValidation, descriptionValidation,priceValidation,imageUrlValidation, create],
  read,
  update: [nameValidation, descriptionValidation,priceValidation,imageUrlValidation, update],
  list,
};
