const express = require("express");
const router = new express.Router();

// Register

router.post("/User/insert", (req, res) => {
    const username = req.body.username;
    Customer.findOne({ username: username })
      .then((user_data) => {
        if (user_data != null) {
          res.json({ msg: "User already exists" });
          return;
        }
      })
      .catch();

    const email = req.body.email;
    const phone = req.body.phone;
    const age = req.body.age;
    const date = req.body.date;
    const gender = req.body.gender;
    const password = req.body.password;
    const address = req.body.address;
    
  
    bcryptjs.hash(password, 10, (e, hashed_pw) => {
      const data = new user_model({
        username: username,
        email: email,
        phone: phone,
        date: date,
        password: hashed_pw,
        age: age,
        gender: gender,
        address:address
      });
  
      data
        .save()
        .then(() => {
          res.json({ msg: "Registered" });
        })
        .catch((e) => {
          res.json({ e });
        });
    });
  });

  router.post("/User/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    Customer.findOne({ username: username })
      .then((user_data) => {
        if (user_data == null) {
          res.json({ msg: " Invalid User" });
          return;
        }
        bcryptjs.compare(password, user_data.password, (e, result) => {
          if (result == false) {
            res.json({msg: " Invalid Credentials"});
            return;
          }
          // it creates token for login user
          // the token stores the logged in user id
          const token = jwt.sign({ userId: user_data._Id }, "softwarica");
          res.json({ token: token });
  
          // Now every thing is valid..........
          // console.log("validdd");
        });
      })
      .catch();
  });

  
router.delete("/comment/delete", auth.userGuard, (req, res) => {
    res.json({ msg: "Deleted" });
  });
  
  router.put("/comment/delete", auth.userGuard, (req, res) => {
    res.json({ msg: "Updated" });
  });
  module.exports = router


// router.post("/user/register",(req, res)=>{


// })

// login

// router.post("/user/login",(req, res)=>{

// })

// //update

// router.put("/user/update", auth.staffGuard, (req,res)=>{

// })

