import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Restaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRestaurants = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://ec2-43-203-192-225.ap-northeast-2.compute.amazonaws.com:8080/travelplan/restaurant', {
                areaNm: '서울특별시',
                clNm: '한식',
                numOfRows: '10',
                pageNo: '1'
            });

            console.log('Response:', response.data);

            if (response.data && response.data.body && response.data.body.items) {
                const items = response.data.body.items.item;
                if (items) {
                    const restaurantData = Array.isArray(items)
                        ? items.map(item => ({
                            title: item.title,
                            description: item.description,
                            subDescription: item.subDescription
                        }))
                        : [{
                            title: items.title,
                            description: items.description,
                            subDescription: items.subDescription
                        }];
                    setRestaurants(restaurantData);
                    setError('');
                } else {
                    setRestaurants([]);
                    setError('No restaurants found matching your criteria.');
                }
            } else {
                setError('Invalid data received from server.');
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
            setError('Error fetching restaurants. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleButtonClick = () => {
        fetchRestaurants();
    };

    return (
        <div>
            <h1>Restaurants</h1>
            <button onClick={handleButtonClick}>Fetch Restaurants</button>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <ul>
                    {restaurants.map((restaurant, index) => (
                        <li key={index}>
                            <h2>{restaurant.title}</h2>
                            <p>Description: {restaurant.description}</p>
                            <p>SubDescription: {restaurant.subDescription}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Restaurant;
