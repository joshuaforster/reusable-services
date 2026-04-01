import requests
from os import getenv
from dotenv import load_dotenv

load_dotenv()


def send_email(subject, html):
    url = "https://api.resend.com/emails"

    headers = {
        "Authorization": f"Bearer {getenv('RESEND_API_KEY')}",
        "Content-Type": "application/json"
    }

    data = {
        "from": getenv("EMAIL_FROM"),
        "to": getenv("EMAIL_TO"),
        "subject": subject,
        "html": html
    }

    response = requests.post(url, json=data, headers=headers)

    return response.json()