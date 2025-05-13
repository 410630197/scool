const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('university_db', 'root', 'melody', {
  host: 'localhost',
  port: 3307,
  dialect: 'mariadb',
  dialectOptions: {
    allowPublicKeyRetrieval: true,
    ssl: false
  }
});

sequelize.authenticate()
  .then(() => console.log('✅ Sequelize 成功連接'))
  .catch(err => console.error('❌ Sequelize 連接失敗：', err));
  
