const { Members } = require('../models');

const resolvers = {
    Query: {
        memberByEmail: async (parent, { email }) => {
            return Members.findOne({ email: email });
        },
        memberByName: async (parent, { memberName }) => {
            return Members.findOne({ memberName: memberName });
        }
    }
}

module.exports = resolvers;