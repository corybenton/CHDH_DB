const { Members } = require('../models');

const resolvers = {
    Query: {
        searchMember: async (parent, { searchInfo }) => {
            const [type, value] = searchInfo;
            return Members.findOne({ [type]: value });
        }
    },
    Mutation: {
        modifyMember: async (parent, { searchInfo, memberInfo }) => {
            const [type, value] = searchInfo;
        
            return Members.findOneAndReplace({ [type]: value}, memberInfo , { new: true });
        },
        createMember: async (parent, { memberInfo }) => {
            return Members.create(memberInfo);
        }
    }
}

module.exports = resolvers;