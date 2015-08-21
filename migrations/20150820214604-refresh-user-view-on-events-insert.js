var migration = {
  up: `
    create function events_insert()
      returns trigger
      security definer
      language plpgsql
    as $$
    begin
      refresh materialized view views.users;
      return new;
    end;
    $$;

    create trigger events_insert after insert on events
      for each row execute procedure events_insert();
  `,
  down: `
    drop trigger events_insert on events;
    drop function events_insert();
  `
};

module.exports = migration;
