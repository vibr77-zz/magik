// will import this named export into your test file:
export const mInfo = jest.fn();
export const mWarn = jest.fn();
export const mError= jest.fn();

const mock = jest.fn().mockImplementation(() => {
  return {
  	info: mInfo,
  	warn: mWarn,
  	error:mError
  };
});

export default mock;