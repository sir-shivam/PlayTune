const mongoose = require( 'mongoose'); 
mongoose
    .connect("mongodb://localhost:27017/DTune" )
    .then((x)=>{
      console.log("conected to mongo successfully");
    })
    .catch((err)=> {
        console.log("error while connecting to mongo");

    });
