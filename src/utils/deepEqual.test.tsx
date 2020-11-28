import * as React from 'react';
import deepEqual from './deepEqual';

describe('deepEqual', () => {
  it('should return false when two sets not match', () => {
    expect(
      deepEqual([{ test: '123' }, { test: '455' }, { test: '455' }], []),
    ).toBeFalsy();

    expect(
      deepEqual(
        [{ test: '123' }, { test: '455' }, { test: '455' }],
        [{ test: '123' }, { test: '455' }, { test: '455', test1: 'what' }],
      ),
    ).toBeFalsy();

    expect(deepEqual([{}], [])).toBeFalsy();

    expect(deepEqual([], [{}])).toBeFalsy();
    expect(deepEqual(new Date(), new Date('1999'))).toBeFalsy();
  });

  it('should return false when either type is primitive', () => {
    expect(deepEqual(null, [])).toBeFalsy();
    expect(deepEqual([], null)).toBeFalsy();
    expect(deepEqual({}, undefined)).toBeFalsy();
    expect(deepEqual(undefined, {})).toBeFalsy();
  });

  it('should skip JSX comparision', () => {
    expect(
      deepEqual({ test: <p>test</p> }, { test: <p>test</p> }),
    ).toBeTruthy();

    /* eslint-disable */
    expect(
      deepEqual(
        {
          test: {
            value: true,
            message: <p>Email can't be empty.</p>,
          },
        },
        {
          test: {
            value: true,
            message: <p>Email can't be empty.</p>,
          },
        },
      ),
    ).toBeTruthy();
    /* eslint-enable */
  });

  it('should return true when two sets matches', () => {
    expect(
      deepEqual([{ name: 'useFieldArray' }], [{ name: 'useFieldArray' }]),
    ).toBeTruthy();

    expect(
      deepEqual(
        [{ test: '123' }, { test: '455' }, { test: '455' }],
        [{ test: '123' }, { test: '455' }, { test: '455' }],
      ),
    ).toBeTruthy();

    expect(deepEqual({}, {})).toBeTruthy();

    expect(deepEqual([], [])).toBeTruthy();

    expect(
      deepEqual(
        [{ test: '123' }, { test: '455' }],
        [{ test: '123' }, { test: '455' }],
      ),
    ).toBeTruthy();

    expect(
      deepEqual(
        [
          {
            test: '123',
            nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }],
          },
          {
            test: '455',
            nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }],
          },
        ],
        [
          {
            test: '123',
            nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }],
          },
          {
            test: '455',
            nestedArray: [{ test: '123' }, { test: '455' }, { test: '455' }],
          },
        ],
      ),
    ).toBeTruthy();
  });
});