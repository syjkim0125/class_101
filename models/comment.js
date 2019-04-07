module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('Comment', {
    writer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: "comment"
  });

  comment.associate = function(models) {
    comment.belongsTo(models.Post, {
      foreignKey: "post_id",
      targetKey: "id"
    })
    comment.belongsTo(models.User, {
      foreignKey: "user_id",
      targetKey: "id"
    })
  };

  return comment;
}
