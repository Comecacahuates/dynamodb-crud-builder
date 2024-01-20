import uniform from '@stdlib/random/base/uniform';

export function generateRandomAlphanumericString(length: number): string {
  let randomString = '';

  while (randomString.length < length) {
    const randomNumber = uniform(0, 1);
    const randomCharacter = randomNumber.toString(36).slice(2);

    randomString += randomCharacter;
  }

  return randomString.substring(0, length);
}
