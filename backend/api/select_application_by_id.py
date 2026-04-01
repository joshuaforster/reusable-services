from database.queries.select.select_application_by_id import select_application_by_id
from fastapi import APIRouter

router = APIRouter()

@router.get("/application/{id}")
def get_application(id):
    application = select_application_by_id(id)
    return application