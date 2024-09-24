import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './GoogleMaps.css';
import Itemcontainer from './Itemcontainer';
import DateRangePicker from '../DateRangePicker/DateRangePicker';

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [daysCount, setDaysCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const placeTypes = [
    { value: 'lodging', label: '호텔' },
    { value: 'restaurant', label: '레스토랑' },
    { value: 'tourist_attraction', label: '관광 명소' }
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const startDateParam = queryParams.get('start');
    const endDateParam = queryParams.get('end');
    const daysCountParam = queryParams.get('daysCount');

    if (startDateParam && endDateParam) {
      setStartDate(new Date(startDateParam));
      setEndDate(new Date(endDateParam));
      if (daysCountParam) {
        setDaysCount(Number(daysCountParam));
      } else {
        const totalDays = Math.ceil((new Date(endDateParam) - new Date(startDateParam)) / (1000 * 60 * 60 * 24) + 1);
        setDaysCount(totalDays);
      }
    }
  }, [location.search]);

  useEffect(() => {
    if (!googleMap) return;
    fetchPlaces(searchTerm);
  }, [googleMap, searchTerm, selectedType]);

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

  const fetchPlaces = useCallback((searchTerm) => {
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

    service.textSearch(request, (results, status, pagination) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const placeData = results.map(place => ({
          title: place.name,
          address: place.formatted_address,
          image: place.photos && place.photos[0] ? place.photos[0].getUrl() : null,
          imageUrl: place.photos && place.photos[0] ? place.photos[0].getUrl() : null,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          phone_number: place.international_phone_number,
          rating: place.rating,
          url: place.url,
          types: place.types,
        }));

        setHotels(placeData);
        updateMarkers(placeData);

        initializeList1(placeData);
        console.log(placeData);
        
        if (placeData.length > 0) {
          const avgLat = placeData.reduce((sum, place) => sum + place.lat, 0) / placeData.length;
          const avgLng = placeData.reduce((sum, place) => sum + place.lng, 0) / placeData.length;
          googleMap.setCenter({ lat: avgLat, lng: avgLng });
          googleMap.setZoom(12);
        }

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
  }, [googleMap, selectedType, updateMarkers]);

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

  const initializeList1 = (data) => {
    if (data.length > 0) {
      const totalDays = daysCount || data.length;
      const half = Math.ceil(data.length / 2);
      setList1(data.slice(0, half));
    }
  };

  const handleItemClick = (item, listName) => {
    if (selectedType === 'lodging') {
      if (listName === 'list1') {
        if (list2.length < daysCount - 1) {
          setList1(prevList1 => prevList1.filter(i => i !== item));
          setList2(prevList2 => [...prevList2, item]);
        } else {
          alert(`최대 ${daysCount - 1}개 항목만 추가할 수 있습니다.`);
        }
      } else if (listName === 'list2') {
        setList2(prevList2 => prevList2.filter(i => i !== item));
        setList1(prevList1 => [...prevList1, item]);
      }
    } else {
      if (listName === 'list1') {
        setList1(prevList1 => prevList1.filter(i => i !== item));
        setList2(prevList2 => [...prevList2, item]);
      } else if (listName === 'list2') {
        setList2(prevList2 => prevList2.filter(i => i !== item));
        setList1(prevList1 => [...prevList1, item]);
      }
    }
  };

  const handleViewPlannerPage = () => {
    navigate('/PlannerPage', { state: { hotels: list2 } });
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleApplyDateRange = () => {
    if (startDate && endDate) {
      const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24) + 1);
      setDaysCount(totalDays);
      const selectedHotels = hotels.slice(0, totalDays);
      setList2(prevList2 => 
        prevList2.filter(hotel => !selectedHotels.includes(hotel)).concat(selectedHotels)
      );
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedHotel(null);
  };

  useEffect(() => {
    if (location.state) {
      const { startDate, endDate, daysCount } = location.state;
      if (startDate && endDate) {
        setStartDate(startDate);
        setEndDate(endDate);
        if (daysCount) {
          setDaysCount(daysCount);
        } else {
          const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24) + 1);
          setDaysCount(totalDays);
        }
      }
    }
  }, [location.state]);

  return (
    <div id="container">
      <div id="movebox">
        <div id="search">
          <DateRangePicker onDateRangeSelect={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
            handleApplyDateRange();
          }} />
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
            placeholder={`${selectedType === 'lodging' ? '호텔' : selectedType === 'tourist_attraction' ? '관광 명소' : '레스토랑'}을 검색하세요...`}
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
                image={item.image}
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
                image={item.image}
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
            + 더보기
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
