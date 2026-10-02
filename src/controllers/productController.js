const productService = require('../services/productService');

const productController = {
  async getAllProducts(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      return res.status(200).json(products);
    } catch (err) {
      return next(err);
    }
  },
  async getProductById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (err) {
      return next(err);
    }
  },
  async createProduct(req, res, next) {
    try {
      const newProduct = await productService.createProduct(req.body);
      return res.status(201).json(newProduct);
    } catch (err) {
      return next(err);
    }
  },


  async updateProduct(req, res, next) {
    try {
      const updatedProduct = await productService.updateProduct(req.params.id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(updatedProduct);
    } catch (err) {
      return next(err);
    }
  },


  async patchProduct(req, res, next) {
    try {
      const updatedProduct = await productService.patchProduct(req.params.id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(updatedProduct);
    } catch (err) {
      return next(err);
    }
  },

  async deleteProduct(req, res, next) {
    try {
      const deletedProduct = await productService.deleteProduct(req.params.id);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (err) {
      return next(err);
    }
  }
};

module.exports = productController;
