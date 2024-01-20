const typeDefs = ` 
    input MemberInput {
        memberName: [String]
        email: [String]
        memberYears: [Int]
        address: String
        agesOfKids: [Int]
        payer: Boolean
        notes: String
    }

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
        searchMember(searchInfo: [String]!): Member
    }

    type Mutation {
        modifyMember(searchInfo: [String]!, memberInfo: MemberInput!): Member
        createMember(memberInfo: MemberInput!): Member
    }
`;

module.exports = typeDefs;