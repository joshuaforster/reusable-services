from fastapi import APIRouter
from letter_apis.pingen.main import send_to_api
from database.queries.insert.create_letter_after_send import create_letter_after_send
from database.queries.select.can_send_letter import can_send_letter

router = APIRouter()

@router.post("/send_letter/{application_id}")
def send_letter(application_id: str):

    if not can_send_letter(application_id):
        return {"error": "Not ready to send yet"}

    response = send_to_api(application_id)

    if not response or "id" not in response:
        return {"error": "Pingen failed"}

    pingen_id = response

    create_letter_after_send(application_id, pingen_id)

    return {"status": "ok"}