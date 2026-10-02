const db = require('../database/db');

const productService = {

  async getAllProducts() {
    return await db.findAll();
  },


  async getProductById(id) {
    return await db.findById(id);
  },


  async createProduct({ name, price }) {
    if (!name || price === undefined) {
      const error = new Error('Product name and price are required');
      error.status = 400;
      throw error;
    }
    return await db.create({ name: String(name).trim(), price: Number(price) });
  },


  async updateProduct(id, { name, price }) {
    if (!name || price === undefined) {
      const error = new Error('Product name and price are required');
      error.status = 400;
      throw error;
    }
    return await db.update(id, { name: String(name).trim(), price: Number(price) });
  },


  async patchProduct(id, updateData) {
    const data = {};
    if (updateData.name !== undefined) {
      data.name = String(updateData.name).trim();
    }
    if (updateData.price !== undefined) {
      data.price = Number(updateData.price);
    }
    return await db.update(id, data);
  },

 
  async deleteProduct(id) {
    return await db.delete(id);
  }
};

module.exports = productService;
