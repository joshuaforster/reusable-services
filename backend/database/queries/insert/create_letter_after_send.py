from database.connection import query

def create_letter_after_send(application_id: str, pingen_id: str):

    sql_person = """
        SELECT person_id
        FROM application_people
        WHERE application_id = %s
        LIMIT 1;
    """

    result = query(sql_person, [application_id], fetch="one")
    person_id = result["person_id"]

    sql = """
        INSERT INTO letters (
            application_id,
            person_id,
            sequence_number,
            sent_at,
            cost,
            method,
            status,
            pingen_id
        )
        VALUES (
            %s,
            %s,
            (
                SELECT COALESCE(MAX(sequence_number), 0) + 1
                FROM letters
                WHERE application_id = %s
            ),
            NOW(),
            %s,
            %s,
            %s,
            %s
        );
    """

    query(sql,[application_id, person_id, application_id, 1.2, "post", "sent", pingen_id])