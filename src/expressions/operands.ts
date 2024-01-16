import { type Operand } from './types.js';

export function isOperandLiteral(operand: Operand): boolean {
  return typeof operand === 'string';
}
