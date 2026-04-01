import os
import psycopg
from psycopg.rows import dict_row
from dotenv import load_dotenv

load_dotenv()


def get_connection():
    return psycopg.connect(
        host=os.environ["DB_HOST"],
        port=os.environ["DB_PORT"],
        dbname=os.environ["DB_NAME"],
        user=os.environ["DB_USER"],
        # IMPORTANT: use dict_row so DB results come back as objects ({"address": ...})
        # instead of tuples ([..., ..., ...]) → required for frontend d.address to work
        row_factory=dict_row
    )



def fetch_result(cursor, fetch):
    if not cursor.description:
        return None

    if fetch == "one":
        return cursor.fetchone()

    if isinstance(fetch, int):
        return cursor.fetchmany(fetch)

    return cursor.fetchall()


def query(sql, params=None, fetch="all"):
    connection = get_connection()

    try:
        with connection.cursor() as cursor:
            cursor.execute(sql, params or [])

            result = fetch_result(cursor, fetch)

            connection.commit()

            return result

    finally:
        connection.close()