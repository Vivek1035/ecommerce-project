import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { sequelize } from './models/index.js';
import { Product } from './models/Product.js';
import { DeliveryOption } from './models/DeliveryOption.js';
import { CartItem } from './models/CartItem.js';
import { Order } from './models/Order.js';

import productRoutes from './routes/products.js';
import deliveryOptionRoutes from './routes/deliveryOptions.js';
import cartItemRoutes from './routes/cartItems.js';
import orderRoutes from './routes/orders.js';
import resetRoutes from './routes/reset.js';
import paymentSummaryRoutes from './routes/paymentSummary.js';

import { defaultProducts } from './defaultData/defaultProducts.js';
import { defaultDeliveryOptions } from './defaultData/defaultDeliveryOptions.js';
import { defaultCart } from './defaultData/defaultCart.js';
import { defaultOrders } from './defaultData/defaultOrders.js';

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- HEALTH CHECK ----------------
app.get('/health', (req, res) => res.send('OK'));

// ---------------- STATIC ----------------
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'dist')));

// ---------------- API ROUTES ----------------
app.use('/api/products', productRoutes);
app.use('/api/delivery-options', deliveryOptionRoutes);
app.use('/api/cart-items', cartItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reset', resetRoutes);
app.use('/api/payment-summary', paymentSummaryRoutes);

// ---------------- SPA FALLBACK ----------------
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html not found');
  }
});

// ---------------- ERROR HANDLER ----------------
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// ---------------- STARTUP ----------------
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    if (process.env.SEED_DB === 'true') {
      const productCount = await Product.count();
      if (productCount === 0) {
        const t = Date.now();

        await Product.bulkCreate(defaultProducts.map((p, i) => ({
          ...p, createdAt: new Date(t + i), updatedAt: new Date(t + i)
        })));

        await DeliveryOption.bulkCreate(defaultDeliveryOptions.map((o, i) => ({
          ...o, createdAt: new Date(t + i), updatedAt: new Date(t + i)
        })));

        await CartItem.bulkCreate(defaultCart.map((c, i) => ({
          ...c, createdAt: new Date(t + i), updatedAt: new Date(t + i)
        })));

        await Order.bulkCreate(defaultOrders.map((o, i) => ({
          ...o, createdAt: new Date(t + i), updatedAt: new Date(t + i)
        })));

        console.log('Default data inserted');
      }
    }

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Startup failed:', err);
    process.exit(1);
  }
}

startServer();
