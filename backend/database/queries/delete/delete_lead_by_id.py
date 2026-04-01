from database.connection import query

def delete_lead(lead_id):

    DELETE_LEAD = """
        DELETE FROM leads
        WHERE id = %s
    """

    query(DELETE_LEAD, [lead_id])

if __name__ == "__main__":
    delete_lead(1)