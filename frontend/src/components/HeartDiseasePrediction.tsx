import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingScreen } from '@/src/store/loadingScreenSlice';



interface PredictionResult {
    message: string[];
    probabilities: string[];
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

    const [result, setResult] = useState<PredictionResult | null | string>(null);

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
            console.log(response.data)
            // Parse the response data before setting it in the state
            setResult({
                message: response.data.message,
                probabilities: response.data.probabilities
            });
        } catch (error) {
            console.error('Error predicting:', error);
        }
        dispatch(setLoadingScreen(false))

    };

    useEffect(() => {
        const startServer = async () => {
            try {
                const serverStart = await axios.get<PredictionResult>('https://heart-ml-api.onrender.com/');
                console.log('Server started: ', serverStart)
            } catch (error) {
                console.error('Error starting server:', error);
            }
        }
        startServer();
    });

    return (
        <div>
            <div className='text-5xl text-center p-6 font-extrabold'>Heart Disease Prediction Model</div>
            <div className='flex px-10'>
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
                <div className='w-full flex items-center justify-center px-10'>
                    <div className='bg-blue-900 p-10 rounded-xl'>
                        <div className='text-3xl font-extrabold py-4'>Model's Prediction</div>
                        {result && (
                            <div>

                                {typeof result === 'string' ? (
                                    <div>{result}</div>
                                ) : (
                                    <div>
                                        <div className='py-4'>
                                            <div className='font-bold'>Result:</div>

                                            <div className={`${Number(result.message) === 0 ? "text-green-400" : "text-red-500"} text-md font-bold`}>
                                                {Number(result.message) === 0 ? "You most likley don't have heart related problems." : "You likley have heart related problems."}
                                            </div>
                                        </div>
                                        <div>
                                            <div className='font-bold'>Probabilities:</div>
                                            {result && (
                                                <div>
                                                    {result.probabilities.map((probability, index) => (
                                                        <div>
                                                            {probability ? (
                                                                probability.toString().split('.').pop()?.trim().length === 1
                                                                    ? `This probablity that you have heart disease is ${probability.toString().split('.').pop()?.trim()}0%`
                                                                    : `This probablity that you have heart disease is ${probability.toString().split('.').pop()?.trim()}%.`
                                                            ) : (
                                                                'N/A'
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                )}
                            </div>
                        )}
                        <div className='py-10'>
                            <button className='border py-3 px-8 rounded-lg bg-green-600 font-bold' type="button" onClick={predict}>
                                Predict
                            </button>
                        </div>
                    </div>
                </div>

            </div>



        </div>
    );
};

export default HeartDiseasePrediction;
