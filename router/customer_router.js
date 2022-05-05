const bcryptjs = require("bcryptjs");
const express = require("express");
const customer_model = require("../model/customer_model");
const router = new express.Router();
const Customer = require("../model/customer_model");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");


router.post("/Customer/insert", (req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phone = req.body.phone;
  const email = req.body.email;
  Customer.findOne({ email: email })
    .then((cust_data) => {
      if (cust_data != null) {
        res.json({ msg: "Email already exists" });
        return;
      }
    })
    .catch();

  const age = req.body.age;
  const date = req.body.date;
  const gender = req.body.gender;
  const password = req.body.password;

  bcryptjs.hash(password, 10, (e, hashed_pw) => {
    const data = new customer_model({
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      date: date,
      password: hashed_pw,
      age: age,
      gender: gender,
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

// for login
router.post("/Customer/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Customer.findOne({ email: email })
    .then((cust_data) => {
      if (cust_data == null) {
        res.json({ msg: " Invalid Email" });
        return;
      }
      bcryptjs.compare(password, cust_data.password, (e, result) => {
        if (result == false) {
          res.json({msg: " Invalid Credentials"});
          return;
        }
        // it creates token for login user
        // the token stores the logged in user id
        const token = jwt.sign({ cutomerId: cust_data._Id }, "softwarica");
        res.json({ token: token });

        // Now every thing is valid..........
        // console.log("validdd");
      });
    })
    .catch();
});

router.delete("/comment/delete", auth.customerGuard, (req, res) => {
  res.json({ msg: "Deleted" });
});

router.put("/comment/delete", auth.customerGuard, (req, res) => {
  res.json({ msg: "Updated" });
});

module.exports = router;
