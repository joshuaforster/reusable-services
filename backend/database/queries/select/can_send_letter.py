from database.connection import query

def can_send_letter(application_id: str):

    sql = """
        SELECT 
            MAX(sequence_number) AS last_sequence,
            MAX(sent_at) AS last_sent
        FROM letters
        WHERE application_id = %s;
    """

    result = query(sql, [application_id], fetch="one")

    last_sequence = result["last_sequence"]
    last_sent = result["last_sent"]

    if last_sequence is None:
        return True

    if last_sequence >= 3:
        return False

    if last_sent is None:
        return True

    from datetime import datetime, timedelta

    return last_sent < datetime.now() - timedelta(days=7)