import { param, query, ValidationChain } from 'express-validator';

export const idValidation: ValidationChain = param('id').isInt().withMessage('Wrong id format');

export const paginationQueryValidation: ValidationChain[] = [
  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('Page number must be positive')
    .default(1)
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('Page limit must be positive')
    .default(100)
    .toInt(),
];