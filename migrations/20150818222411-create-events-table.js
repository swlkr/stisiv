var migration = {
  up: `
    create table events (
      id uuid primary key default uuid_generate_v1mc(),
      data json,
      view varchar(100) not null,
      created_at timestamp without time zone default now()
    );
  `,
  down: `
    drop table events;
  `
};

module.exports = migration;
