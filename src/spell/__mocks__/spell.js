const mockedSpell = jest.genMockFromModule('../spell.js');
export default mockedSpell;



// will import this named export into your test file:
// export const mExecuteSingleSpellEntry = jest.fn();
// export const mExecuteSpell = jest.fn();
// export const mSetGlobalVariable=jest.fn();
// export const _mIterateSpell = jest.fn(() => {return true;});
// export const mLocalVariable=

// const mock = jest.fn().mockImplementation(() => {
//   return {
//   	executeSpell: mExecuteSpell,
//   	_iterateSpell: _mIterateSpell,
//   	executeSingleSpellEntry:mExecuteSingleSpellEntry,
//   	setGlobalVariable:mSetGlobalVariable,
//   	localVariable:mLocalVariable
//   };
// });

// export default mock;