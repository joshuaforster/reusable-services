from database.connection import query

def get_queue():
    sql = """
        SELECT 
            applications.id,
            applications.address,
            applications.reference,
            MAX(letters.sequence_number) AS last_sequence,
            MAX(letters.sent_at) AS last_sent
        FROM applications
        LEFT JOIN letters 
        ON letters.application_id = applications.id
        GROUP BY applications.id
        HAVING 
            MAX(letters.sequence_number) IS NULL
            OR (
                MAX(letters.sequence_number) < 3
                AND MAX(letters.sent_at) < NOW() - INTERVAL '7 days'
            );
    """

    return query(sql)