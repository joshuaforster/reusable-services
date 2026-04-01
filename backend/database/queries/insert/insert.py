from database.connection import query

def insert_leads(leads):
    
    sql = """
    INSERT INTO leads (
        source,
        external_id,
        address,
        description
    ) VALUES (%s, %s, %s, %s)
    """

    for lead in leads:
        params = [
            lead["source"],
            lead["external_id"],
            lead["address"],
            lead["description"],
        ]

        query(sql, params)

if __name__=="__main__":
    insert_leads()

