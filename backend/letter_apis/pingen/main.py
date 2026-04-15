from letter_apis.pingen.api_calls.get_pingen_access_token import get_pingen_access_token
from letter_apis.pingen.api_calls.get_pingen_file_upload_details import get_pingen_file_upload_details
from letter_apis.pingen.api_calls.create_new_letter import create_new_letter
from letter_apis.pingen.api_calls.send_created_letter import send_created_letter
from letter_template.render_letter import generate_letter_bytes
from os import getenv

def send_to_api(application_id: str):

    base_url = getenv("PINGEN_BASE_URL")
    org_id = getenv("PINGEN_ORG_ID")
    url_letters = f"{base_url}/organisations/{org_id}/letters"

    pdf_bytes = generate_letter_bytes(application_id)
    access_token = get_pingen_access_token()

    file_url, file_url_signature = get_pingen_file_upload_details(access_token)

    payload = create_new_letter(file_url, file_url_signature, pdf_bytes)

    response = send_created_letter(url_letters, payload, access_token)
    return response

if __name__=="__main__":
    send_to_api()
 