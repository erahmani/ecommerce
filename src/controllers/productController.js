/* eslint-disable no-magic-numbers */
const Product = require('../models/product');

exports.createProduct = async(req, res)=> {
  try {
    // eslint-disable-next-line prefer-const
    let { name, price, description, category, extraAttributes } = req.body;
    category = category.toLowerCase();
    const product = new Product({name, price, description, category, extraAttributes});
    await product.save();
    return res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating product', error });
  }
};

exports.getAllProducts = async(req, res)=>{
  try {
    const products = await Product.find({}, '-__v').populate('category');
    return res.status(200).json(products ?? {});
  } catch (error) {
    return res.status(500).json({mssage: 'Error retreiving products', error});
  }
};

exports.getProductById = async(req, res)=>{
  try {
    const product = await Product.findById(req.params.id, '-__v -_id').populate('category');
    return res.status(200).json(product ?? {});
  } catch (error) {
    return res.status(500).json({mssage: 'Error retreiving product', error});
  }
};

exports.updateProduct = async(req, res)=>{
  try {
    // eslint-disable-next-line prefer-const
    let { name, price, description, category, extraAttributes} = req.body;
    category = category.toLowerCase();
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, category, extraAttributes},
      { projection:'-__v -_id', new:true, runValidators:true});
    if (!product) {
      return res.status(404).json({message:'Product not found'});
    }
    return res.status(200).json({message:'Product updated successfully', product});
  } catch (error) {
    return res.status(500).json({message: 'Error updating product', error});
  }
};

exports.deleteProduct = async(req, res) => {
  try {
    const product = Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({message:'Product not found'});
    }
    return res.status(204).json({message:'Product deleted successfully'});
  } catch (error) {
    return res.status(500).json({message: 'Error deleting product', error});
  }
};