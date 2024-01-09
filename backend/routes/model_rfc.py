# Normal imports
from fastapi import APIRouter, Request


# Used to allow main.py to connect to routes, for cleaner code
router = APIRouter()


# Returns all customers
@router.get("/model_rfc")
async def predict():
    return {"message": "test"}
