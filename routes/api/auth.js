const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");

const { auth: ctrl } = require("../../controllers");

const { joiRegisterSchema, joiLoginSchema } = require("../../models");

const router = express.Router();
router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.get("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));
router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
