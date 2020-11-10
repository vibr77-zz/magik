export default `
  type Floor {
		title: String
		rooms: [Room]
		level: Int
		visible: Boolean
		activity: Boolean
		id: ID!
		type:String
	}

  type Query {
    Floors(limit: Int): [Floor]
  	Floor(id: ID!): Floor
  }
  
`;