
import requests
from dotenv import load_dotenv

load_dotenv()

def get_pingen_file_upload_details(access_token):

    url_file_upload = 'https://api-staging.pingen.com/file-upload'

    response = requests.get(url_file_upload, headers = {
        'Authorization': 'Bearer {}'.format(access_token)
    })

    data = response.json()

    data = data['data']
    file_url = data['attributes']['url']
    file_url_signature = data['attributes']['url_signature']

    return file_url, file_url_signature

