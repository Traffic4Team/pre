import React, { useState } from 'react';
import Restaurant from './Restaurant';
import Googlemaps from '../Api/GoogleMaps.tsx';

function Parent() {
    const [responseData, setResponseData] = useState(null); // 상태 설정

    const handleResponseData = (data) => {
        setResponseData(data); 
    };

    return (
        <div>
            <Restaurant onReceiveData={handleResponseData} /> {/* 데이터 전달 콜백 props */}
            <Googlemaps data={responseData} /> {/* 다른 하위 컴포넌트에 데이터 전달 */}
        </div>
    );
}

export default Parent;
