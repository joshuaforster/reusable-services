from database.connection import query

def select_application_by_id(application_id):

    sql = """
        SELECT
            applications.*,
            COUNT(letters.id) AS letter_count,
            COALESCE(SUM(letters.cost), 0) AS total_cost

        FROM applications

        LEFT JOIN letters
        ON letters.application_id = applications.id

        WHERE applications.id = %s

        GROUP BY
            applications.id,
            applications.reference,
            applications.address
    """

    params = [application_id]

    return query(sql, params, fetch="one")