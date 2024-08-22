import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './GoogleMaps.css';
import Itemcontainer from './Itemcontainer';

function GoogleMaps() {
  const [googleMap, setGoogleMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [selectedType, setSelectedType] = useState('lodging');

  const navigate = useNavigate(); 


  const placeTypes = [
    { value: 'lodging', label: '호텔' },
    { value: 'restaurant', label: '레스토랑' }
  ];

  useEffect(() => {
    if (!window.google) return;

    const container = document.createElement("div");
    container.id = "map";
    const mapContainer = document.getElementById("map-container");

    if (mapContainer) {
      mapContainer.appendChild(container);
    }

    const mapInstance = new window.google.maps.Map(container, {
      center: { lat: 37.5, lng: 127.0 },
      zoom: 12,
      mapId: "92cb7201b7d43b21",
      disableDefaultUI: true,
      clickableIcons: false,
      minZoom: 10,
      maxZoom: 18,
      gestureHandling: "greedy",
    });

    setGoogleMap(mapInstance);

    return () => {
      if (mapContainer && container.parentNode) {
        mapContainer.removeChild(container);
      }
    };
  }, []);

  const updateMarkers = (hotels) => {
    if (googleMap) {
      markers.forEach(marker => marker.setMap(null));

      const newMarkers = hotels.map(hotel => {
        const position = { lat: hotel.lat, lng: hotel.lng };

        const marker = new window.google.maps.Marker({
          position,
          map: googleMap,
          title: hotel.title,
        });

        const infoContent = `
          <div>
            <h3>${hotel.title}</h3>
            <p>${hotel.address}</p>
          </div>
        `;
        const infoWindow = new window.google.maps.InfoWindow({ content: infoContent });
        marker.addListener('click', () => infoWindow.open(googleMap, marker));

        return marker;
      });

      setMarkers(newMarkers);
    }
  };

  const fetchPlaces = (searchTerm) => {
    if (!googleMap) return;

    setLoading(true);
    const service = new window.google.maps.places.PlacesService(googleMap);

    const mapCenter = googleMap.getCenter();

    const request = {
      query: searchTerm,
      type: [selectedType], 
      fields: ['name', 'formatted_address', 'geometry', 'place_id', 'photos', 'types', 'price_level', 'international_phone_number', 'rating'],
      locationBias: new window.google.maps.Circle({
        center: mapCenter.toJSON(),
        radius: 5000,
      }),
    };

    const updateMapCenter = (hotels) => {
      if (googleMap && hotels.length > 0) {
        // Calculate average lat and lng
        const avgLat = hotels.reduce((sum, hotel) => sum + hotel.lat, 0) / hotels.length;
        const avgLng = hotels.reduce((sum, hotel) => sum + hotel.lng, 0) / hotels.length;
  
        // Update map center
        googleMap.setCenter({ lat: avgLat, lng: avgLng });
      }
    };

    service.textSearch(request, (results, status, pagination) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const placeData = results.map(place => ({
          title: place.name,
          address: place.formatted_address,
          image: place.photos && place.photos[0] ? place.photos[0].getUrl() : null,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          types: place.types,
          rating: place.rating,
          url: place.url,
        }));

        console.log('Request:', request);
        console.log('Status:', status);
        console.log('Results:', results);

        setHotels(placeData);
        updateMarkers(placeData);
        initializeLists(placeData);
        updateMapCenter(placeData);

        if (pagination && pagination.hasNextPage) {
          setPagination(() => pagination);
        } else {
          setPagination(null);
        }

      } else {
        setError('장소를 가져오는 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
      }
      setLoading(false);
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      fetchPlaces(searchTerm);
      setSearchTriggered(true);
    }
  };

  const fetchMoreResults = () => {
    if (pagination && pagination.hasNextPage) {
      setLoading(true);
      pagination.nextPage();
    }
  };

  const initializeLists = (data) => {
    // If search triggered, reset list1 and retain list2
    if (searchTriggered) {
      const half = Math.ceil(data.length); 
      setList1(data.slice(0, half));
      setList2(prevList2 => prevList2); // retain list2
    } else {
      const half = Math.ceil(data.length); 
      setList1(data.slice(0, half));
      setList2(data.slice(half));
    }
  };

  const handleItemClick = (item, targetList) => {
    if (targetList === 'list1') {
      setList1(prevList => prevList.filter(i => i !== item));
      setList2(prevList => [...prevList, item]);
    } else {
      setList2(prevList => prevList.filter(i => i !== item));
      setList1(prevList => [...prevList, item]);
    }
  };

  const handleViewPlannerPage = () => {
    navigate('/PlannerPage', { state: { hotels: list2 } }); // /planner 경로로 이동하며 list2 데이터를 전달합니다.
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div id="container">
      <div id="movebox">
        <div id="search">
          <select value={selectedType} onChange={handleTypeChange}>
            {placeTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            id="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={`${selectedType === 'lodging' ? '호텔' : '레스토랑'}을 검색하세요...`}
          />
          <button
            id="search-button"
            onClick={handleSearchClick}
          >
            검색
          </button>
        </div>
        {loading && <p>로딩 중...</p>}
        {error && <p>{error}</p>}
        <div className="list-container">
          <div className="list">
            {list1.map((item, index) => (
              <Itemcontainer
                imageSrc={item.image}
                key={index}
                title={item.title}
                onClick={() => handleItemClick(item, 'list1')}
                rating={item.rating}
                address={item.address} 
              />
            ))}
          </div>
          <div className="list">
            {list2.map((item, index) => (
              <Itemcontainer
                imageSrc={item.image}
                key={index}
                title={item.title}
                onClick={() => handleItemClick(item, 'list2')}
                rating={item.rating}
                address={item.address}   
              />
            ))}
          </div>
        </div>
        {pagination && (
          <button
            id="more-results-button"
            onClick={fetchMoreResults}
            disabled={loading}
          >
            더 보기
          </button>
        )}
        <button
          id="view-planner-page-button"
          onClick={handleViewPlannerPage}
        >
          Planner 페이지 보기
        </button>
      </div>
      <div id="map-container">
        <div id="map"></div>
      </div>
    </div>
  );
}

export default GoogleMaps;
