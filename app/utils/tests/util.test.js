import { createRequestTypes,
  REQUEST, FAILURE, SUCCESS,
  } from '../uitl';
import expect from 'expect';
describe(' util test', () => {
  it(' test types creator', () => {
    const base = 'FETCH_USERS';
    const expected = {
      REQUEST: `${base}_${REQUEST}`,
      FAILURE: `${base}_${FAILURE}`,
      SUCCESS: `${base}_${SUCCESS}`,
    };
    expect(createRequestTypes(base)).toEqual(expected);
  });
});

