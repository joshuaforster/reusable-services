import requests
from dotenv import load_dotenv

load_dotenv()

def create_new_letter(file_url, file_url_signature, pdf_bytes):

    requests.put(file_url, data= pdf_bytes)

    payload = {
        'data': {
            'type': 'letters',
            'attributes': {
                'file_original_name': 'your_filename.pdf',
                'file_url': file_url,
                'file_url_signature': file_url_signature,
                'address_position': 'left',
                'auto_send': False
            }
        }
    }

    return payload
