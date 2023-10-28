const { Members } = require('../models');

const resolvers = {
    Query: {
        members: async => {
            return Members.find();
        },
    }
}

module.exports = resolvers;