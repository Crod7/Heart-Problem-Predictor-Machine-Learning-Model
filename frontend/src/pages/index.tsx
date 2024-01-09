import React, { useState } from 'react';
import LoadingScreen from '../components/Utility/Loading-Feature/LoadingScreen';

//Redux Imports
import { useSelector } from 'react-redux';

export default function BasePage() {
    // Redux
    let loadingScreen = useSelector((state: any) => state.loadingScreen.loadingScreen);

    // If user logged in and has a budget created
    return (
        <div>
            {loadingScreen && (
                <LoadingScreen />
            )}
            Hey
        </div>
    );


}
