from database.connection import query

def select_all_applications(search, page, limit, status):

    offset = (page - 1) * limit

    sql = """
        SELECT
            applications.id,
            applications.reference,
            applications.address,
            applications.postcode,
            COUNT(letters.id) AS letter_count,
            COALESCE(SUM(letters.cost), 0) AS total_cost

        FROM applications

        LEFT JOIN letters
        ON letters.application_id = applications.id

        WHERE (
            applications.address ILIKE %s
            OR applications.reference ILIKE %s
        )
    """

    if status == "queue":
        sql += """
        AND applications.id NOT IN (
            SELECT application_id FROM letters
        )
        """

    elif status == "history":
        sql += """
        AND applications.id IN (
            SELECT application_id FROM letters
        )
        """

    sql += """
        GROUP BY
            applications.id,
            applications.reference,
            applications.address

        ORDER BY applications.received_date DESC

        LIMIT %s OFFSET %s
    """

    search_term = f"%{search}%"

    params = [search_term, search_term, limit, offset]

    return query(sql, params)