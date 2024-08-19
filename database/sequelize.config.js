require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',  // Remplace par le mot de passe réel
    database: 'technical_test',
    logging: process.env.DEBUG_SEQUELIZE ? console.log : false,
  },
  test: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',  // Remplace par le mot de passe réel
    database: 'technical_test',
    logging: process.env.DEBUG_SEQUELIZE ? console.log : false,
  },
  production: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',  // Remplace par le mot de passe réel
    database: 'technical_test',
    logging: process.env.DEBUG_SEQUELIZE ? console.log : false,
  },
};
