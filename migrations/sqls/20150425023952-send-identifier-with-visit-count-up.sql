drop function sites_with_visit_count(int);

CREATE OR REPLACE FUNCTION sites_with_visit_count(user_id_parameter int)
RETURNS TABLE (
   id integer,
   url varchar,
   identifier varchar,
   visit_count bigint
)
AS $$
BEGIN
    return query
    select sites.id, sites.url, sites.identifier, count(site_id) as visit_count
    from sites
    left outer join visits on visits.site_id = sites.id
    where sites.user_id = user_id_parameter
    group by sites.id, sites.url
    order by sites.url;
END;
$$ LANGUAGE plpgsql;
