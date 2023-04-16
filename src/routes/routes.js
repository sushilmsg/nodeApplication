const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const router = new express.Router();
const userRanking = require("../models/users");
const jwt = require("jsonwebtoken");

const secretkey = "secrectkey";

//login api

router.post('/login', (req, res) => {
   const user = {
      id: 1,
      name: "sushil",
      email: "sushil@gmail.com"
   }
   jwt.sign({ user }, secretkey, { expiresIn: '30000s' }, (err, token) => {
      res.json({
         token
      })
   });
});

router.post('/profile',verifytoken,(req,res)=>{
  jwt.verify(req.token,secretkey,(err,authData)=>{   
   if(err){
      res.send({result:"invalid token"})
   }else{
      res.send({
         message: "profile access",
         authData
      });      
   }

  });


});

function verifytoken(req,res,next){
const bearerHeader =req.headers['authorization'];
 if(typeof bearerHeader !=='undefined'){
    const bearer= bearerHeader.split(" ");
   const token  =bearer[1];
   req.token=token;
   next(); 
     
 }else{
   res.send({ token:"Token is not Valid"});
 }

}


//create api 
router.post('/user', async(req, res) => {   
         try {
            const addUserRecord = new userRanking(req.body)
            console.log(req.body);
            const insertuser = addUserRecord.save();
            res.status(201).send(insertuser);      
         } catch (e) {
            res.status(400).send(e);
         }   
});

//List all api

router.get('/list', async (req, res) => {
   try {
      const userlist = await userRanking.find({}).sort({ 'ranking': 1 });
      res.status(200).send(userlist);

   } catch (e) {
      res.status(400).send(e);
   }

});


//Get by user id for api

router.get('/edit/:id', async (req, res) => {
   try {
      const _id = req.params.id;
      const editlist = await userRanking.find({ _id });
      res.status(201).send(editlist);
   } catch (e) {
      res.status(400).send(e);
   }

});

//we will handle patch request of id

router.patch('/edit/:id', async (req, res) => {
   try {
      const _id = req.params.id;
      const updatelist = await userRanking.findByIdAndUpdate(_id, req.body, { new: true });
      res.status(201).send(updatelist);
   }

   catch (e) {
      res.status(400).send(e);
   }

});

//delete record

router.delete('/delete/:id', async (req, res) => {
   try {
      const updatelist = await userRanking.findByIdAndDelete(req.params.id);
      res.status(201).send(updatelist);
   }
   catch (e) {
      res.status(500).send(e);
   }

});

module.exports = router;

