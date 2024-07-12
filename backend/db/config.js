const mongoose = require( 'mongoose'); 
mongoose
    .connect("mongodb://localhost:27017/DTune" )
    .then((x)=>{
      console.log("conected to mongo successfully");
    })
    .catch((err)=> {
        console.log("error while connecting to mongo");

    });


    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1cHRhIiwidXNlcklkIjoiNjY5MGY1MGY4ZjRiY2M5MDdhNzM3N2IxIiwiaWF0IjoxNzIwNzc1OTUxfQ.ennuGBrpXWrH7yRM_wujgQG_Otrr_qhiVBvPe5Us9RM