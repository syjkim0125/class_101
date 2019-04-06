module.exports = function(sequelize, DataTypes) {
  const post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    writer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: "post"
  });
  return post;
}
