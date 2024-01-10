import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the next/image component

import modelPredictionImage from '../images/data-ml-predictions.png'
import accuarcyImage from '../images/accuracy.png'
import ageImage from '../images/age.png'
import chestPainImage from '../images/chest-pain.png'
import cholImage from '../images/chol.png'
import matrixImage from '../images/confusion-matrix.png'
import maxHeartRateImage from '../images/max-heart-rate.png'
import rocImage from '../images/roc.png'


const DataImages: React.FC = () => {


    const [imageCategory, setImageCategory] = useState<string>('accuracy');

    return (
        <div>
            <div className='text-3xl text-center font-extrabold pb-6 pt-2'>Model Visualizations</div>
            <div className='bg-blue-900 rounded-lg w-[600px] mx-8'>
                <button className={`py-3 px-8 rounded-lg ${imageCategory === 'accuracy' ? 'bg-blue-700' : ''} font-bold w-[200px]`} type="button" onClick={() => setImageCategory('accuracy')}>
                    Accuracy
                </button>
                <button className={`py-3 px-8 rounded-lg ${imageCategory === 'factors' ? 'bg-blue-700' : ''} font-bold w-[200px]`} type="button" onClick={() => setImageCategory('factors')} >
                    Factors
                </button>
                <button className={`py-3 px-8 rounded-lg ${imageCategory === 'falsePositives' ? 'bg-blue-700' : ''} font-bold w-[200px]`} type="button" onClick={() => setImageCategory('falsePositives')}>
                    False Positives
                </button>
            </div>


            {
                imageCategory == 'accuracy' && (
                    <div>
                        <div className='px-8 py-4'>The following images discuss the accuracy of the Machine Learning Model.</div>
                        <div className='flex'>
                            <Image src={accuarcyImage} alt="Image 1" className="w-full max-w-md mx-8 mb-8 rounded-xl" />
                            <div className='p-8'>
                                <div className='font-extrabold'>Accuracy:</div>
                                <div className='py-2'>This pie chart shows the accuracy rate of the machine learning model.</div>
                                <div className='py-2'>Currently it stands at 82.5%.</div>
                            </div>
                        </div>
                        <div className='flex'>
                            <Image src={modelPredictionImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                            <div className='p-8'>
                                <div className='font-extrabold'>Predictions:</div>
                                <div className='py-2'>This graph displays the predictions made by the model.</div>
                                <div className='py-2'>The green dots represent correct predictions while the red dots represent incorrect predictions.</div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                imageCategory == 'factors' && (
                    <div>
                        <div className='px-8 py-4'>In the following images we infer from the data based on various factors.</div>
                        <div className='flex'>
                            <Image src={ageImage} alt="Image 1" className="w-full max-w-md mx-8 mb-8  rounded-xl" />
                            <div className='p-8'>
                                <div className='font-extrabold'>Is age a factor?</div>
                                <div className='py-2'>This graph displays the number of patients(x-axis) and their corresponding age(y-axis).</div>
                                <div className='py-2'>Based on the grapgh, age is not clear cut. Ages from all ranges seem to be positive or negative. We can infer that age was used for discovering patterns for the model but age itself was not the sole determining factor.</div>
                            </div>
                        </div>
                        <div className='flex'>
                            <Image src={cholImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                            <div className='p-8'>
                                <div className='font-extrabold'>Is cholesterol a factor?</div>
                                <div className='py-2'>This graph displays the number of patients(x-axis) and their corresponding cholesterol(y-axis).</div>
                                <div className='py-2'>Cholesterol is an interesting factor. We know based on scientific research that cholesterol is a factor in heart disease but based on the data we used to train the model, their was no distinct pattern in cholesterol alone that determines heart disease.</div>
                            </div>
                        </div>
                        <div className='flex'>
                            <Image src={maxHeartRateImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                            <div className='p-8'>
                                <div className='font-extrabold'>Is max heart rate during a stress test a factor?</div>
                                <div className='py-2'>This graph displays the number of patients(x-axis) and their corresponding heart rate(y-axis).</div>
                                <div className='py-2'>This factor did seem to be a major factor in determining heart disease in patients. We can infer from the data that the lower the heart rate during a stress test seems to correlate with a lower chance of having heart disease.</div>
                                <div className='py-2'>We can infer this because the green dots(Negative for Heart Disease) seem to group together at a lower position of the graph correlated to a lower heart rate while the red dots(Positive for Heart Disease) seem to hover on the top half of the graph which correlates to a higher heart rate during the stress test.</div>
                            </div>
                        </div>
                        <div className='flex'>
                            <Image src={chestPainImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                            <div className='p-8'>
                                <div className='font-extrabold'>Is type of chest pain a factor?</div>
                                <div className='py-2'>This graph displays the number of patients(x-axis) and their corresponding chest pain type(y-axis).</div>
                                <div className='py-2'>Another significant factor was chest pain. Patients reporting having no chest pain had a large probability of not have heart disease(Green Dots).</div>
                                <div className='py-2'>We can infer from the data that chest pain type was a large factor in determining heart disease.</div>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                imageCategory == 'falsePositives' && (
                    <div>
                        <div className='px-8 py-4'>In the following images we discuss the false positive/negative rates found in our model.</div>
                        <div className='flex'>
                            <Image src={rocImage} alt="Image 1" className="w-full max-w-md mx-8 mb-8  rounded-xl" />
                            <div className='p-8'>
                                <div className='font-extrabold'>Area Under The Curve/ ROC Curve</div>
                                <div className='py-2'>The graph displays an AUC of 0.8 or greater.</div>
                                <div className='py-2'>An AUC of 0.8 suggests that the model has good discriminative power, as it indicates a relatively high probability that the model will correctly classify instances in terms of their class labels. The AUC value ranges from 0 to 1, with 0.5 representing a model that performs no better than random chance, and 1.0 indicating a perfect classifier.</div>
                            </div>
                        </div>
                        <div className='flex'>
                            <Image src={matrixImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                            <div className='p-8'>
                                <div className='font-extrabold'>Confusion Matrix</div>
                                <div className='py-2'>A confusion matrix is a table that helps us understand how well a classification model is performing. It shows the number of correct and incorrect predictions made by the model compared to the actual outcomes in the data.</div>
                                <div className='py-2'>Anything in the top left and bottom right boxes represent correct predictions. The bottom left and top right boxes represent incorrect predictions based on either a model saying a prediction is true when its false, and when a prediction is false when it was supposed to be true.</div>
                            </div>
                        </div>
                    </div>
                )
            }

        </div >
    );
};

export default DataImages;
