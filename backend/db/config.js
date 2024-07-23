const mongoose = require( 'mongoose'); 


mongoose
    .connect("mongodb+srv://sirshivam25:IsjDNvpNvTLwk5bg@dtune.1lfadav.mongodb.net/?retryWrites=true&w=majority&appName=Dtune")
    .then((x)=>{
      console.log("conected to mongo successfully");
    })
    .catch((err)=> {
        console.log("error while connecting to mongo");
    });
    
    
    //new token
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNoaXZhQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY2OTM0ODY1NzkxOGIyOWYxZTk3NDA0NCIsImlhdCI6MTcyMDkyODM1N30.r5JJKVeEp-q41xRLn5oac978euJ45uEsUQ47Ub4Px2c