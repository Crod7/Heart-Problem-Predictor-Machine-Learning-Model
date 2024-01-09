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
async def predict():
    # Features neccessary
    # obj    = model_RFC.predict(np.array([age, sex, chest pain, restingBloodPressure, chol, fbs, restecg, exang,oldpeak, slope, ca, thalium stress level])

    # This is what makes predictions
    age_value = 28
    sex_value = 0
    # 0-male 1-female
    chest_pain_value = 0
    # 0-3
    resting_blood_pressure_value = 150
    # 100-150
    chol_value = 100
    # 130-350
    fbs_value = 0
    # 0-1 Fasting Blood Sugar 1-above 120 mg/dl 0-below 120 mg/dl
    rest_ecg_value = 0
    # 0-1
    thalach_value = 100
    # 80-200
    exang_value = 0
    # 0-1
    oldpeak_value = 1.5
    # 0.0 - 3.5
    slope_value = 1
    # 0-2 Slope of the peak exercise ST segment: 0: Upsloping 1: Flat 2: Downsloping
    ca_value = 4
    # 0-4 Number of major vessels (0-4) colored by fluoroscopy
    thal_value = 0
    # 0-3

    new_data_point = np.array(
        [
            age_value,
            sex_value,
            chest_pain_value,
            resting_blood_pressure_value,
            chol_value,
            fbs_value,
            rest_ecg_value,
            thalach_value,
            exang_value,
            oldpeak_value,
            slope_value,
            ca_value,
            thal_value,
        ]
    )

    # Make some predictions
    pickle_y_preds = model_RFC.predict(new_data_point.reshape(1, -1)).tolist()

    pickle_y_prob = model_RFC.predict_proba(new_data_point.reshape(1, -1)).tolist()
    print(pickle_y_prob)
    print(pickle_y_preds)

    return {"message": pickle_y_preds, "probabilities": pickle_y_prob}
