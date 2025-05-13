// orm.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('university_db', 'root', 'melody', {
  host: 'localhost',
  port: 3307,
  dialect: 'mariadb',
  dialectOptions: {
    allowPublicKeyRetrieval: true,
    ssl: false
  }
});

module.exports = { sequelize, DataTypes };
