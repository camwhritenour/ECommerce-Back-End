const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    try {
      const dbCategoryData = await Category.findByPk(req.params.id, {
        include: [
          {
            model: Product,
            attributes: [
              'id',
              'product_name',
              'price',
              'stock',
            ],
          },
        ],
      });
      const category = dbCategoryData.get({ plain: true});
      res.status(200).json(category)
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

router.post('/', async (req, res) => {
  // create a new category
try {
  const newCategory = await Category.create(req.body)
  res.status(200).json(newCategory)
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {id: req.params.id}
    })
    res.status(200).json(updatedCategory)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const dbCategoryData = await Category.destroy( {
      where: {id: req.params.id}
    });

    res.status(200).json(dbCategoryData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
);

module.exports = router;
