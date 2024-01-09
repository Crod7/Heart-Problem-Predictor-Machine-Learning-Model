# Normal imports
import pickle
import numpy as np
from fastapi import APIRouter, Request


# Machine Learning Model
with open("./machineLearningModel/model_RFC.pk1", "rb") as file:
    model_RFC = pickle.load(file)

# Used to allow main.py to connect to routes, for cleaner code
router = APIRouter()


# Returns all customers
@router.get("/model_rfc")
async def predict(
    age: int,
    sex: int,  # 0-male 1-female
    chest_pain: int,  # 0-3
    resting_blood_pressure: int,  # 100-150
    chol: int,  # 130-350
    fbs: int,  # 0-1 Fasting Blood Sugar 1-above 120 mg/dl 0-below 120 mg/dl
    rest_ecg: int,  # 0-1
    thalach: int,  # 80-200
    exang: int,  # 0-1
    oldpeak: float,  # 0.0 - 3.5
    slope: int,  # 0-2 Slope of the peak exercise ST segment: 0: Upsloping 1: Flat 2: Downsloping
    ca: int,  # 0-4 Number of major vessels (0-4) colored by fluoroscopy
    thal: int,  # 0-3
):
    new_data_point = np.array(
        [
            age,
            sex,
            chest_pain,
            resting_blood_pressure,
            chol,
            fbs,
            rest_ecg,
            thalach,
            exang,
            oldpeak,
            slope,
            ca,
            thal,
        ]
    )

    # Make some predictions
    prediction = model_RFC.predict(new_data_point.reshape(1, -1)).tolist()

    probablitiy = model_RFC.predict_proba(new_data_point.reshape(1, -1)).tolist()

    return {"message": prediction, "probabilities": probablitiy}
