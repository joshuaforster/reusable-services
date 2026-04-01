from database.connection import query

def update_lead_after_send(lead_id: int):

    sql = """
        UPDATE leads
        SET 
            letter_count = COALESCE(letter_count, 0) + 1,
            letter_cost = COALESCE(letter_cost, 0) + 1.2
        WHERE id = %s;
    """

    query(sql,[lead_id])
