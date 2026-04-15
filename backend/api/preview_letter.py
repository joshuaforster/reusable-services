from fastapi import APIRouter
from fastapi.responses import Response
from letter_template.render_letter import generate_letter_bytes

router = APIRouter()

@router.get("/letters/preview/{application_id}")
def preview_letter(application_id: str):
    pdf_bytes = generate_letter_bytes(application_id)

    return Response(
        content=pdf_bytes,
        media_type="application/pdf"
    )