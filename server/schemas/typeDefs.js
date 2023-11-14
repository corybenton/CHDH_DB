const typeDefs = `
    type Member {
        memberName: [String]
        email: [String]
        memberYears: [Int]
        address: String
        agesOfKids: [Int]
        payer: Boolean
        notes: String
    }

    type Query {
        memberByEmail(email: String!): Member
        memberByName(name: String!): Member
    }
`;

module.exports = typeDefs;