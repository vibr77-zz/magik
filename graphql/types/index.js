import { mergeTypes } from 'merge-graphql-schemas';
import roomType from './roomType';
import floorType from './floorType';
import spellType from './spellType';
import spellCategoryType from './spellCategoryType';
 
const types = [
  floorType,
  roomType,
  spellType,
  spellCategoryType
];
 
export default mergeTypes(types);