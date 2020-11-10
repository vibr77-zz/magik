export default `
  type Room{
  	title: String!
  	floor: Floor!
  	floor_id: ID!
  	id: ID!
    type:String
	}

  type Query {
    Rooms(limit: Int): [Room]
  	Room(id: ID!): Room
  }

  type Mutation{
  	createRoom(title: String!,floor_id:ID):Room
  	updateRoom(id:ID!,title: String,floor_id:ID):Room
  	deleteRoom(id:ID!): DeleteResponse
  }
 
	type DeleteResponse {
    ok: Boolean!
  }

`;