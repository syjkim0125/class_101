const models = require('../models');

const resolvers = {
  Query: {
    users: () => models.User.findAll(),
    user: (_, { id }) => models.User.findOne({where: {id: id}})
  }
};

export default resolvers;
