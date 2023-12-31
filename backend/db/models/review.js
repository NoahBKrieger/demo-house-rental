

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId', onDelete: 'CASCADE', hooks: true
      })

      Review.belongsTo(models.User, {
        foreignKey: 'userId', onDelete: 'CASCADE', hooks: true
      })

      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true
      })

    }
  }
  Review.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Review text is required' },
        notContains: { args: '  ', msg: 'Review text is required' },
        validString(value) { if (typeof value != 'string') throw new Error('Review text is required') }

      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { args: true, msg: "Stars must be an integer from 1 to 5" },
        validNum(value) { if (value < 1 || value > 5) throw new Error("Stars must be an integer from 1 to 5") },
        validString(value) { if (typeof value != 'number') throw new Error('Stars must be an integer from 1 to 5') }
      }
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
