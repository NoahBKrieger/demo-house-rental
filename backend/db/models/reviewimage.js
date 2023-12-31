
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      ReviewImage.belongsTo(models.Review, {
        foreignKey: 'reviewId', onDelete: 'CASCADE', hooks: true
      })

    }
  }
  ReviewImage.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reviewId: DataTypes.INTEGER,
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Must be a url' },
        validString(value) { if (typeof value != 'string') throw new Error('Invalid type') }

      }
    },
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
