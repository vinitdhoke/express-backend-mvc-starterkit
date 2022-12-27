import { check, validationResult } from "express-validator";

export const userSignupValidator = [
  check("username").not().isEmpty().withMessage("username is required"),
  check("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters"),
];
export const validateError = (req, res, next) => {
  const errors = validationResult(req).array();
  if (errors && errors.length > 0) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  } else {
    next();
  }
};
