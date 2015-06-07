CREATE OR REPLACE FUNCTION site_graph_data(site_id_parameter int, user_id_parameter int)
RETURNS TABLE (
   day text,
   visits bigint
)
AS $$
BEGIN
    return query
    with visit_dates as (
      select visits.created_at::date as day, visits.id as visits_id
      from visits
      join sites on sites.id = visits.site_id
      where visits.site_id = site_id_parameter and sites.user_id = user_id_parameter
    )
    select dates.day, count(visit_dates.visits_id) as visits
    from (
      select to_char((current_date - offs)::date, 'MM/DD') as day
        from generate_series(0, 14, 1) as offs
    ) dates
    left outer join visit_dates on to_char(visit_dates.day, 'MM/DD') = dates.day
    group by dates.day
    order by dates.day;
END;
$$ LANGUAGE plpgsql;
