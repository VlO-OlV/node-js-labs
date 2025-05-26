import { param, query, ValidationChain } from 'express-validator';
import { OrderStatus } from '../../database/models/Order';

export const idValidation: ValidationChain = param('id').isInt().withMessage('Wrong id format');

export const paginationQueryValidation: ValidationChain[] = [
  query('page')
    .optional()
    .default(1)
    .toInt()
    .isInt({ min: 1 }).withMessage('Page number must be positive number'),
  query('limit')
    .optional()
    .default(8)
    .toInt()
    .isInt({ min: 1 }).withMessage('Page limit must be positive number'),
  query('filter')
    .optional()
    .isIn(Object.values(OrderStatus)).withMessage('Wrong status value'),
];