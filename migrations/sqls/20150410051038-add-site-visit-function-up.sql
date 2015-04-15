CREATE OR REPLACE FUNCTION sites_with_visit_count(user_id_parameter int)
RETURNS TABLE (
   id integer,
   url varchar,
   visit_count bigint
)
AS $$
BEGIN
    return query
    select sites.id, sites.url, count(site_id) as visit_count
    from visits
    join sites on sites.id = visits.site_id
    where sites.user_id = user_id_parameter
    group by sites.id, sites.url;
END;
$$ LANGUAGE plpgsql;
