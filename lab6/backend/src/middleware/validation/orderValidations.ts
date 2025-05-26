import { body, query, ValidationChain } from 'express-validator';
import { OrderStatus } from '../../database/models/Order';

export const addOrderItemValidation: ValidationChain[] = [
  body('menuItemId')
    .notEmpty().withMessage('Menu item id is required')
    .isInt().withMessage('Wrong id format'),
  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isInt({ min: 1 }).withMessage('Amount must be positive number')
    .default(1)
    .toInt(),
];

export const updateOrderValidation: ValidationChain[] = [
  body('status')
    .optional()
    .isIn(Object.values(OrderStatus)).withMessage('Wrong status value'),
];

export const orderFiltersValidation: ValidationChain[] = [
  query('status')
    .optional()
    .isIn(Object.values(OrderStatus)).withMessage('Wrong status value'),
];