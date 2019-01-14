const { DB, DB_PRODUCTION } = process.env;

const config = {
  production: {
    database: DB_PRODUCTION,
  },
  development: {
    database: DB,
  },
};

function get(env) {
  return config[env];
}

module.exports = get;
