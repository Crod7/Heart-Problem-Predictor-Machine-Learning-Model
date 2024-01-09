import React, { useState } from 'react';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';

//Redux Imports
import { useSelector } from 'react-redux';
import HeartDiseasePrediction from '../components/HeartDiseasePrediction';

export default function BasePage() {
    // Redux
    let loadingScreen = useSelector((state: any) => state.loadingScreen.loadingScreen);

    // If user logged in and has a budget created
    return (
        <div>
            {loadingScreen && (
                <LoadingScreen />
            )}
            <HeartDiseasePrediction />
        </div>
    );


}
