import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from "graphql"

const AuthInput = new GraphQLInputObjectType({
  name: "AuthInput",
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
})

export default AuthInput
