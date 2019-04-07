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
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: "post"
  });

  post.associate = function(models) {
    post.hasMany(models.Comment)
    post.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id"
    })
  };

  return post;
}
