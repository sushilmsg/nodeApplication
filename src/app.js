 const express = require('express');
 const app = express();
 const port = process.env.PORT || 5000;

// app.use(express.json());
// require("../src/database/connection.js");
// const userRanking = require('../src/models/users');
//  const router = require('../src/routes/routes');
//  app.use(router);

app.get('/',(req, res)=>{
    res.send("Hello world");
});

app.listen(port,() =>{
    console.log(`This port is listen in ${port}`);
});





