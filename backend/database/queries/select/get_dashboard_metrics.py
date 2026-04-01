from database.connection import query

def get_dashboard_metrics():

    sql = """
        SELECT
            COUNT(*) AS total_letters,
            COALESCE(SUM(cost), 0) AS total_spend
        FROM letters
    """
    
    result = query(sql, fetch="one")
    return result

