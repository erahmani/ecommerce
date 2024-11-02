const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config({path:`${__dirname}\\.env`});
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    servers:[
      {
        url: 'http://localhost:3000/'
      }
    ],
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API for managing users'
    }
  },
  apis: [`${__dirname}\\config\\*.js`]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log('Connected to MongoDB'))
  .catch(err=>console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Week 1 Setup' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
