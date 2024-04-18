import randomstring from 'randomstring';

export function generateRandomAlphanumericString(length: number): string {
  return randomstring.generate({ length });
}
