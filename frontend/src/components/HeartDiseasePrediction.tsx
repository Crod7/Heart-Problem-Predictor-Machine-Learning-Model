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
            console.log('Warming up server')
            try {
                const serverStart = await axios.get<PredictionResult>('https://heart-ml-api.onrender.com/');
                console.log('Server done loading: ', serverStart)
            } catch (error) {
                console.error('Error starting server:', error);
            }
        }
        startServer();
    });

    return (
        <div>
            <div className='text-5xl text-center p-6 font-extrabold'>Heart Disease Prediction Model</div>
            <div className='flex p-8'>
                <div className='w-[50%] min-w-[600px]'>
                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Age:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Age of the patient in years
                            </div>
                        </div>

                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="age" value={formData.age} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Sex:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Gender of the patient (0 = male, 1 = female)
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="sex" min="0" max="1" value={formData.sex} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Chest Pain:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Chest pain type:
                                0: Typical angina
                                1: Atypical angina
                                2: Non-anginal pain
                                3: Asymptomatic
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="chest_pain" min="0" max="3" value={formData.chest_pain} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Resting Blood Pressure:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Resting blood pressure in mm Hg (100-150)
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="resting_blood_pressure" min="100" max="150" value={formData.resting_blood_pressure} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Cholesterol:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Serum cholesterol in mg/dl (130-350)
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="chol" min="130" max="350" value={formData.chol} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Fasting Blood Sugar:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Fasting blood sugar level, categorized as above 120 mg/dl (1 = true, 0 = false)
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="fbs" min="0" max="1" value={formData.fbs} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Rest ECG:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Resting electrocardiographic results:
                                0: Normal
                                1: Having ST-T wave abnormality
                                2: Showing probable or definite left ventricular hypertrophy
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="rest_ecg" min="0" max="1" value={formData.rest_ecg} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Maximum Heart Rate:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Maximum heart rate achieved during a stress test (80-200)
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="thalach" min="80" max="200" value={formData.thalach} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Exercise-Induced Angina:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Exercise-induced angina (1 = yes, 0 = no)
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="exang" min="0" max="1" value={formData.exang} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Oldpeak:
                            <div className='font-extralight text-gray-600 text-sm'>
                                ST depression induced by exercise relative to rest (0.0-3.5)                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="oldpeak" step="0.1" min="0.0" max="3.5" value={formData.oldpeak} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Slope:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Slope of the peak exercise ST segment:
                                0: Upsloping
                                1: Flat
                                2: Downsloping
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="slope" min="0" max="2" value={formData.slope} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Number of Major Vessels Colored by Fluoroscopy:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Number of major vessels (0-4) colored by fluoroscopy
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="ca" min="0" max="4" value={formData.ca} onChange={handleInputChange} />
                    </div>

                    <div className='py-1 px-2 flex'>
                        <div className='font-extrabold'>
                            Thal:
                            <div className='font-extralight text-gray-600 text-sm'>
                                Thalium stress test result:
                                0: Normal
                                1: Fixed defect
                                2: Reversible defect
                                3: Not described
                            </div>
                        </div>
                        <input className='p-2 rounded-lg ml-auto max-h-[40px] min-w-[80px]' type="number" name="thal" min="0" max="3" value={formData.thal} onChange={handleInputChange} />
                    </div>


                </div>
                <div className='w-full flex items-center justify-center px-10'>
                    <div className='bg-blue-900 p-10 rounded-xl'>
                        <div className='text-3xl font-extrabold py-4'>Model Prediction</div>
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
                                                        <div key={index}>
                                                            {probability ? (
                                                                probability.toString().split('.').pop()?.trim().length === 1
                                                                    ? `The probablity that you have heart disease is ${probability.toString().split('.').pop()?.trim()}0%`
                                                                    : `The probablity that you have heart disease is ${probability.toString().split('.').pop()?.trim()}%.`
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
