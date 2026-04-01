from database.connection import query

def update_lead_description(lead_id, new_description):

    UPDATE_LEAD_DESCRIPTION = """
        UPDATE leads
        SET description = %s
        WHERE id = %s
    """

    query(
        UPDATE_LEAD_DESCRIPTION,
        [new_description, lead_id]
    )

if __name__ == "__main__":
    update_lead_description(1, "Updated job description")