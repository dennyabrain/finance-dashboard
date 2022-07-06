"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Label.belongsTo(models.MentionedTweet);
    }
  }
  Label.init(
    {
      label: DataTypes.STRING,
      mentionedTweetId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Label",
    }
  );
  return Label;
};
