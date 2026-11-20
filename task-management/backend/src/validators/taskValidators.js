import { body, param } from 'express-validator';

const statuses = ['To Do', 'In Progress', 'Completed'];
const priorities = ['Low', 'Medium', 'High'];

export const taskIdValidator = [param('id').isMongoId().withMessage('A valid task ID is required')];

export const taskValidator = [
  body('title').trim().isLength({ min: 2, max: 120 }).withMessage('Title must be 2–120 characters'),
  body('description').optional({ nullable: true }).isString().isLength({ max: 2000 }).withMessage('Description must be at most 2000 characters'),
  body('status').optional().isIn(statuses).withMessage('Invalid task status'),
  body('priority').optional().isIn(priorities).withMessage('Invalid task priority'),
  body('dueDate')
    .isISO8601().withMessage('A valid due date is required')
    .bail()
    .custom(value => {
      const dueDate = new Date(value);
      const today = new Date();
      return dueDate.toISOString().slice(0, 10) >= today.toISOString().slice(0, 10);
    }).withMessage('Due date cannot be before today'),
  body('assignee').isMongoId().withMessage('A valid assignee is required')
];
