const mapProduct = {
    $project: {
        userId: 1,
        total: 1,
        products: {
            $map: {
                input: "$products",
                as: "product",
                in: {
                    _id: "$$product._id",
                    name: "$$product.name",
                    price: "$$product.price",
                    image: { $arrayElemAt: ["$$product.images", 0] },
                    quantity: "$$product.quantity",
                    discount: "$$product.discount",
                    soldQuantity: {
                        $let: {
                            vars: {
                                soldQuantities: "$items.soldQuantity",
                                productIndex: {
                                    $indexOfArray: ["$items.productId", "$$product._id"]
                                }
                            },
                            in: {
                                $arrayElemAt: ["$$soldQuantities", "$$productIndex"]
                            }
                        }
                    }
                }
            }
        }
    }
};

const pipe = (local, foreign) => [
    {
        $lookup: {
            from: "products",
            localField: local,
            foreignField: foreign,
            as: "products"
        }
    },
    mapProduct
];
module.exports = pipe;