const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//routes
const contactRoutes = require('./routes/contact');

//DB connection
mongoose.connect('mongodb://localhost:27017/phonebook', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
})
.then(()=> {
    console.log('DB Connected');
})
.catch((err)=> {
    console.log(err)
});

//my route
app.use('/api', contactRoutes);


const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=> {
    console.log(`app is running on PORT ${PORT}`);
})