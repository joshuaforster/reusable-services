from fastapi import APIRouter
from database.queries.select.get_dashboard_metrics import get_dashboard_metrics

router = APIRouter()

@router.get("/dashboard")
def get_dashboard():
    result = get_dashboard_metrics()

    return {
        "total_spend": result["total_spend"],
        "total_letters": result["total_letters"],
    }