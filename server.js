const express = require('express');
const productRoutes = require('./src/routes/productRoutes');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());


app.use('/products', productRoutes);


app.get('/', (req, res) => {
  res.json({ message: 'ASD Workshop - Product API with Caching' });
});


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;