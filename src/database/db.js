const fs = require('fs/promises');
const path = require('path');

const filepath = path.join(__dirname, '..', 'db.json');


async function readFile() {
  try {
    const data = await fs.readFile(filepath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading db.json:', err);
    throw err;
  }
}


async function writeFile(data) {
  try {
    await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to db.json:', err);
    throw err;
  }
}


async function readFileWithDelay() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await readFile();
}


const db = {

  async findAll() {
    return await readFileWithDelay();
  },

  async findById(id) {
    const products = await readFileWithDelay();
    return products.find((p) => String(p.id) === String(id));
  },


  async create(productData) {
    const products = await readFile();
    const newId = products.length > 0 ? Math.max(...products.map((p) => Number(p.id) || 0)) + 1 : 1;
    const newProduct = {
      id: newId,
      ...productData
    };
    products.push(newProduct);
    await writeFile(products);
    return newProduct;
  },


  async update(id, updateData) {
    const products = await readFile();
    const index = products.findIndex((p) => String(p.id) === String(id));
    if (index === -1) {
      return null;
    }

    const updatedProduct = {
      ...products[index],
      ...updateData,
      id: products[index].id 
    };

    products[index] = updatedProduct;
    await writeFile(products);
    return updatedProduct;
  },

 
  async delete(id) {
    const products = await readFile();
    const index = products.findIndex((p) => String(p.id) === String(id));
    if (index === -1) {
      return null;
    }

    const [deletedProduct] = products.splice(index, 1);
    await writeFile(products);
    return deletedProduct;
  }
};

module.exports = db;
