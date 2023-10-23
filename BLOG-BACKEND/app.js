const express=require('express');
const mongoose=require('mongoose');
const app=express();
const dbConfig = require('./config/database.config.js');
const bodyParser = require('body-parser');
const cors = require('cors');


const port = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


/* connecting to the database */
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });


// Defining routes
const authRouter = require('./routes/authRoute.js'); 
const userRouter = require('./routes/userRoute.js'); 
const blogRouter = require('./routes/blogRoute.js'); 

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(3000,()=>{
    console.log(`Server is running on port ${port}`);
})