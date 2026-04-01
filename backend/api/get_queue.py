from fastapi import APIRouter
from database.queries.select.get_dashboard_metrics import get_dashboard_metrics
from database.queries.select.get_queue import get_queue

router = APIRouter()
@router.get("/queue")
def queue():
    results = get_queue()
    return {"data": results}