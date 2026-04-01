from fastapi import APIRouter
from fastapi.responses import Response
from letter_template.render_letter import generate_letter_bytes

router = APIRouter()

@router.get("/letters/preview/{lead_id}")
def preview_letter(lead_id: str):
    pdf_bytes = generate_letter_bytes(lead_id)

    return Response(
        content=pdf_bytes,
        media_type="application/pdf"
    )