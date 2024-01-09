# Imports
from fastapi import FastAPI, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware

# from routes import customers


# Init the server
app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Root Endpoint
@app.get("/", tags=["Main"])
async def get_customers():
    response = {"message": "hi"}
    return response


# Manages all Customer Endpoints, see customers.py in route folder
# app.include_router(customers.router, prefix="/api/customers")
