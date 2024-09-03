const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors =require("../middleware/catchAsyncError");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
// Create Product - Admin
exports.createProduct =catchAsyncErrors( async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

// Get All Products
exports.getAllProducts =catchAsyncErrors( async (req, res) => {
    const apiFeature = new ApiFeatures(Product.find(),req.query)
    const products =await Product.find();

    res.status(200).json({
        success: true,
        products
    });
});


// udpate  -- Admin function
exports.updateProduct  =catchAsyncError(async ( req , res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    product =await Product.findByIdAndUpdate(req.params.id,req.body,{
        new : true ,
        runValidators : true,
        useFindAndModify : false
    });
    
    res.status(200).json({
        success : true,
        product
    })
});

// next is middleware function provided by express 
exports.getProductDetails =catchAsyncError(async(req,res, next) =>{
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }
    res.status(200).json({
        success : true,
        product
    })


});
// delete product -- Admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHander("Product not found", 404));
    }

    await product.deleteOne();  // Use deleteOne instead of remove

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    });
}
);