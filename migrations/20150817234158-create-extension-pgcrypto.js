var migration = {
  up: `
    create extension "uuid-ossp";
  `,
  down: `
    drop extension "uuid-ossp";
  `
};

module.exports = migration;
