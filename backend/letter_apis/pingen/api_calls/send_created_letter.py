import json
import requests
from dotenv import load_dotenv


load_dotenv()

def send_created_letter(url_letters, payload, access_token):
    response = requests.post(
        url_letters,
        json=payload,
        headers={
            'Content-Type': 'application/vnd.api+json',
            'Authorization': f'Bearer {access_token}'
        }
    )

    response_data = response.json()

    letter_id = response_data["data"]["id"]

    return letter_id