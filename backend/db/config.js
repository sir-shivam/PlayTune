const mongoose = require( 'mongoose'); 
mongoose
    .connect("mongodb://localhost:27017/DTune")
    .then((x)=> {
        console.log("connected to mongo !");
    })
    .catch((err)=> {
        console.log("error while connecting to mongo!");
    });

    



