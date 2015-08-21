var migration = {
  up: `
    create materialized view views.users as
    select distinct on (email)
      data->>'id' as id,
      data->>'email' as email,
      data->>'password' as password,
      data->>'confirmation_token' as confirmation_token,
      data->>'confirmed_at' as confirmed_at,
      data->>'created_at' as created_at
    from events
    where view = 'users'
    order by email, events.created_at desc;
  `,
  down: `
    drop materialized view views.users;
  `
};

module.exports = migration;
