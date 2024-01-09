import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';



interface PredictionResult {
    message: number[];
    probabilities: number[][];
}

const HeartDiseasePrediction: React.FC = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        age: 35,
        sex: 0,
        chest_pain: 0,
        resting_blood_pressure: 125,
        chol: 240,
        fbs: 0,
        rest_ecg: 0,
        thalach: 140,
        exang: 0,
        oldpeak: 2.0,
        slope: 0,
        ca: 0,
        thal: 0,
    });

    const [result, setResult] = useState<PredictionResult | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.valueAsNumber,
        });
    };

    const predict = async () => {
        dispatch(setLoadingScreen(true))

        try {
            const response = await axios.get<PredictionResult>('https://heart-ml-api.onrender.com/api/model_rfc', {
                params: formData,
            });

            setResult(response.data);
        } catch (error) {
            console.error('Error predicting:', error);
        }
        dispatch(setLoadingScreen(false))

    };

    useEffect(() => {
        const startServer = async () => {
            try {
                const response = await axios.get<PredictionResult>('https://heart-ml-api.onrender.com/');
                console.log('Server started: ', response)
            } catch (error) {
                console.error('Error starting server:', error);
            }
        }
        startServer();
    });

    return (
        <div>
            <h1>Heart Disease Prediction Form</h1>
            <div className='flex'>
                <div className='w-[50%] min-w-[600px]'>
                    <div className='py-1 px-2 flex'>
                        Age:
                        <input className='p-2 rounded-lg ml-auto' type="number" name="age" value={formData.age} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Sex (0-Male, 1-Female):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="sex" min="0" max="1" value={formData.sex} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Chest Pain (0-3):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="chest_pain" min="0" max="3" value={formData.chest_pain} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Resting Blood Pressure (100-150):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="resting_blood_pressure" min="100" max="150" value={formData.resting_blood_pressure} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Cholesterol (130-350):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="chol" min="130" max="350" value={formData.chol} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Fasting Blood Sugar (0 or 1):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="fbs" min="0" max="1" value={formData.fbs} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Rest ECG (0 or 1):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="rest_ecg" min="0" max="1" value={formData.rest_ecg} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Maximum Heart Rate (Thalach) (80-200):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="thalach" min="80" max="200" value={formData.thalach} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Exercise-Induced Angina (0 or 1):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="exang" min="0" max="1" value={formData.exang} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Oldpeak (0.0 - 3.5):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="oldpeak" step="0.1" min="0.0" max="3.5" value={formData.oldpeak} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Slope of the Peak Exercise ST Segment (0-2):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="slope" min="0" max="2" value={formData.slope} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Number of Major Vessels Colored by Fluoroscopy (0-4):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="ca" min="0" max="4" value={formData.ca} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        Thal (0-3):
                        <input className='p-2 rounded-lg ml-auto' type="number" name="thal" min="0" max="3" value={formData.thal} onChange={handleInputChange} />
                    </div>


                </div>
                <div>
                    <button className='border p-3 rounded-lg bg-green-700 font-bold' type="button" onClick={predict}>
                        Predict
                    </button>
                </div>
            </div>


            {result && (
                <div>
                    <h2>Result:</h2>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default HeartDiseasePrediction;
