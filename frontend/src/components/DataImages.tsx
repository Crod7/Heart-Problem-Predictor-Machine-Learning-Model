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


    return (
        <div>
            <div className='text-3xl text-center font-extrabold'>Model Visualizations</div>

            <div className='flex'>
                <Image src={accuarcyImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                <div className='p-8'>
                    desc
                </div>
            </div>
            <div className='flex'>
                <Image src={modelPredictionImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                <div className='p-8'>
                    desc
                </div>
            </div>
            <div className='flex'>
                <Image src={ageImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                <div className='p-8'>
                    desc
                </div>
            </div>
            <div className='flex'>
                <Image src={cholImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                <div className='p-8'>
                    desc
                </div>
            </div>
            <div className='flex'>
                <Image src={maxHeartRateImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                <div className='p-8'>
                    desc
                </div>
            </div>
            <div className='flex'>
                <Image src={chestPainImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                <div className='p-8'>
                    desc
                </div>
            </div>
            <div className='flex'>
                <Image src={rocImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                <div className='p-8'>
                    desc
                </div>
            </div>
            <div className='flex'>
                <Image src={matrixImage} alt="Image 1" className="w-full max-w-md m-8 rounded-xl" />
                <div className='p-8'>
                    desc
                </div>
            </div>
        </div>
    );
};

export default DataImages;
