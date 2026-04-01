import requests
import os
from dotenv import load_dotenv

load_dotenv()

def get_pingen_access_token():
    
    url = f"{os.getenv('PINGEN_BASE_URL')}/auth/access-tokens"

    data = {
        "grant_type": "client_credentials",
        "client_id": os.getenv("PINGEN_CLIENT_ID"),
        "client_secret": os.getenv("PINGEN_CLIENT_SECRET")
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }

    response = requests.post(url, data=data, headers=headers)

    if response.status_code != 200:
        raise Exception(f"Pingen auth failed: {response.text}")

    response_data = response.json()
    
    access_token = response_data.get("access_token")

    if not access_token:
        raise Exception("No access token returned")

    return access_token

if __name__ == "__main__":
    access_token = get_pingen_access_token()
    print(access_token)