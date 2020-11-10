export default `
  type Spell{
  	title: String!
  	description: String
  	spellCategory_id: ID
    spellCategory:SpellCategory
  	id: ID!
	}

  type Query {
    Spells(limit: Int): [Room]
  	Spell(id: ID!): Room
  }

  type Mutation{
  	createSpell(title: String!,spellcategory_id:ID):Spell
  	updateSpell(id:ID!,title: String):Spell
  	deleteSpell(id:ID!): DeleteResponse
  }
 
	type DeleteResponse {
    ok: Boolean!
  }

`;