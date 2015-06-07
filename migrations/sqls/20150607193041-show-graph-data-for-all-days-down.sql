CREATE OR REPLACE FUNCTION site_graph_data(site_id_parameter int, user_id_parameter int)
RETURNS TABLE (
   day text,
   visits bigint
)
AS $$
BEGIN
    return query
    select
      to_char(visits.created_at::date, 'MM/DD') as day,
      count(visits.id) as visits
    from sites
    left outer join visits on visits.site_id = sites.id
    where
      sites.id = site_id_parameter and
      sites.user_id = user_id_parameter and
      visits.created_at > (CURRENT_TIMESTAMP - INTERVAL '14 days')
    group by visits.created_at::date
    order by visits.created_at::date;
END;
$$ LANGUAGE plpgsql;
