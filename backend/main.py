from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.select_all_applications import router as select_all_applications
from api.preview_letter import router as preview_letter
from api.send_letter import router as main_letter
from api.dashboard import router as dashboard
from api.select_application_by_id import router as select_application_by_id
from api.get_queue import router as get_queue


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(select_all_applications)
app.include_router(preview_letter)
app.include_router(main_letter)
app.include_router(dashboard)
app.include_router(select_application_by_id)
app.include_router(get_queue)