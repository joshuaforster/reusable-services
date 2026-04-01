import json
import requests
from dotenv import load_dotenv
from os import getenv


load_dotenv()

url = 'https://api.pingen.com/organisations/INSERT_YOUR_ORGANISATION_UUID_HERE/letters/INSERT_YOUR_LETTER_UUID_HERE/cancel'
access_token = 'INSERT_YOUR_ACCESS_TOKEN_HERE'

requests.patch(
    url,
    headers = {
        'Content-Type': 'application/vnd.api+json',
        'Authorization': 'Bearer {}'.format(access_token)
    })