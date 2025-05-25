import { body, ValidationChain } from 'express-validator';

export const createMenuItemValidation: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 30, min: 1 })
    .withMessage('Name must have 1-30 characters'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('image')
    .optional()
    .isURL()
    .withMessage('Wrong image URL format'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price cannot be negative'),
];

export const updateMenuItemValidation: ValidationChain[] = [
  body('name')
    .optional()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 30, min: 1 })
    .withMessage('Name must have 1-30 characters'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('image')
    .optional()
    .isURL()
    .withMessage('Wrong image URL format'),
  body('price')
    .optional()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price cannot be negative'),
];