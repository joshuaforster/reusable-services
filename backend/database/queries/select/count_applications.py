from database.connection import query

def count_applications(search: str, status: str):

    sql = """
        SELECT COUNT(*) AS total
        FROM applications
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

    search_term = f"%{search}%"

    result = query(sql, [search_term, search_term], fetch="one")

    return result["total"]