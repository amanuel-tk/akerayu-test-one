const product = require('../model/productModel');
const asyncHandler = require('express-async-handler');

const getSearch = asyncHandler(async (req, res) => {
  const lng = parseFloat(req.query.currentPostion.lng);
  const lat = parseFloat(req.query.currentPostion.lat);
  // console.log(lat)
  const page = req.query.currentPostion.page || 1;
  let sort = req.query.currentPostion.sort;
  let sortBy =-1;
  // console.log(sort)
  if (sort === "Price1") {
    sort = "price"
    sortBy=1
  }
  else if (sort === "Price2") {
    sort = "price"
    sortBy=-1
  }
  else if (sort === "Date1") {
    sort = "createdAt"
    sortBy=1
  }
  else if (sort === "Date2") {
    sort = "createdAt"
    sortBy=-1
  }
  else {
    sort = "title"
    sortBy=-1
  }
  let defaultRadius = 10;

  // Use the default radius initially


  if (req.query.currentPostion.childData) {
    const { valueRadius } = req.query.currentPostion.childData;
    if (valueRadius) {
      defaultRadius = valueRadius
    }

  }
  // console.log(defaultRadius)
  const filter = {
    status: 'published',
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], defaultRadius / 3959],
      },
    },
  };

  if (req.query.currentPostion.childData) {
    // console.log(req.query.currentPostion.childData)
    const { propertyFor, valueRadius, homeType, value, bathroom, bedroom, selectedCheckboxes } = req.query.currentPostion.childData;

    // Include additional filters based on childData
    if (homeType && homeType.length > 0 && homeType.includes('all')) {
      // Do nothing, no need to filter by homeType
    } else if (homeType && homeType.length > 0) {
      // Include products where at least one selected homeType matches
      filter.homeType = { $in: homeType };
    }

    if (propertyFor && propertyFor.toLowerCase() !== 'all') {
      // console.log(propertyFor)
      filter.propertyFor = propertyFor.toLowerCase();
    }

    if (value && value.length === 2 && value.every(v => v !== null)) {
      filter.price = { $gte: value[0], $lte: value[1] };
    }

    if (bathroom && bathroom.toLowerCase() !== 'all') {
      filter.bathRoom = { $gte: bathroom };
    }

    if (bedroom && bedroom.toLowerCase() !== 'all') {
      filter.bedRoom = { $gte: bedroom };
    }

    if (selectedCheckboxes && selectedCheckboxes.length > 0) {
      // Assuming utility is the field you want to filter based on checkboxes
      filter.utility = { $in: selectedCheckboxes };
    }


  }

  const productsPerPage = 10;

  try {
    const totalCount = await product.countDocuments(filter);

    // Perform the paginated query with applied filters
    const result = await product
      .find(filter)
      .sort({ [sort]: sortBy })
      .skip((page - 1) * productsPerPage)
      .limit(productsPerPage);

    const priceStats = await product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          maxPrice: { $max: '$price' },
          minPrice: { $min: '$price' },
        },
      },
    ]);

    // Extract maxPrice and minPrice from the aggregation result
    const { maxPrice, minPrice } = priceStats[0] || { maxPrice: null, minPrice: null };

    res.json({
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / productsPerPage),
      results: result,
      minPrice,
      maxPrice
    });

  } catch (error) {
    console.error("Error in GeoSpatial query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  getSearch,
};
