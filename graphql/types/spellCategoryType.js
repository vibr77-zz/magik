export default `
  type SpellCategory{
  	title: String!
  	description: String
  	spells:[Spell]
  	id: ID!
	}

  type Query {
    SpellCategories(limit: Int): [SpellCategory]
  	SpellCategory(id: ID!): SpellCategory
  }

  type Mutation{
  	createSpellCategory(title: String!):SpellCategory
  	updateSpellCategory(id:ID!,title: String):SpellCategory
  	deleteSpellCategory(id:ID!): DeleteResponse
  }
 
	type DeleteResponse {
    ok: Boolean!
  }

`;