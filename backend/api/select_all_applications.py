from fastapi import APIRouter
from database.queries.select.select_all_applications import select_all_applications
from database.queries.select.count_applications import count_applications
router = APIRouter()

@router.get("/applications")
def get_applications(query: str = "", page: int = 1, limit: int = 10, status: str = "", search: str ="",):
    applications = select_all_applications(search,page, limit, status)
    total = count_applications(query, status)
    return {
        "data": applications,
        "total": total
    }