var migration = {
  up: `
    create schema views;
  `,
  down: `
    drop schema views;
  `
};

module.exports = migration;
