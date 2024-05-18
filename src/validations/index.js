//tentar puxar as validações daqui, para não ficar desorganizado

const { body, validationResult } = require("express-validator");
const express = require("express");
const app = express();

app.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({
    min: 8,
  }),
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  }
);
