const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: 'Welcome to Week 1 Setup'});
});

app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})


