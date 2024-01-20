import { describe, it, expect, beforeEach } from '@jest/globals';
import { generateRandomAlphanumericString } from '../../src/utils/strings.js';

describe('random alphanumeric string', () => {
  type TestCase = {
    scenarioDescriptions: string;
    length: number;
  };

  const testCases: Array<TestCase> = [
    {
      scenarioDescriptions: 'given length 10',
      length: 10,
    },
    {
      scenarioDescriptions: 'given length 20',
      length: 20,
    },
  ];

  describe.each(testCases)('$scenarioDescriptions', ({ length }) => {
    describe('when generating a random alphanumeric string', () => {
      let randomString: string;

      beforeEach(() => {
        randomString = generateRandomAlphanumericString(length);
      });

      describe('each time', () => {
        const tenTimes = Array.from({ length: 10 });

        it.each(tenTimes)(
          `should return a string with length ${length}`,
          () => {
            expect(randomString.length).toBe(length);
          },
        );

        it.each(tenTimes)(
          'should return a string with only alphanumeric characters',
          () => {
            expect(randomString).toMatch(/^[a-z0-9]+$/);
          },
        );
      });
    });
  });
});
