function mapProduct(isSoldProduct) {
    return {
        $project: {
            userId: 1,
            total: 1,
            status: {
                $cond: {
                    if: isSoldProduct,
                    then: "$status",
                    else: "$$REMOVE",
                }
            },
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
                            $cond: {
                                if: isSoldProduct,
                                then: {
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
                                },
                                else: "$$REMOVE"
                            }
                        }
                    }
                }
            }
        }
    }
};


const pipe = (local, foreign, isSoldProduct = true) => [
    {
        $lookup: {
            from: "products",
            localField: local,
            foreignField: foreign,
            as: "products"
        }
    },
    mapProduct(isSoldProduct)
];
module.exports = pipe;