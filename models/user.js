module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define("User", {
    name: {
      field: "user_name",
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false
    }
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: "user"
  });

  user.associate = function(models) {
    user.hasMany(models.Post);
    user.hasMany(models.Comment);
  };
  return user;
}
