'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      // Define associations here if necessary
    }
  }
  Event.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Event',
    }
  );
  return Event;
};
