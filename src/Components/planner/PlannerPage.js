import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PlannerPage.css';
import Planner from './Planner';

const PlannerPage = () => {
  const location = useLocation();
  const hotels = location.state?.hotels || [];
  const [map, setMap] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // 중심 좌표 계산
  const center = {
    lat: hotels.length > 0
      ? hotels.reduce((sum, hotel) => sum + hotel.lat, 0) / hotels.length
      : 37.5,
    lng: hotels.length > 0
      ? hotels.reduce((sum, hotel) => sum + hotel.lng, 0) / hotels.length
      : 127.0,
  };

  // 지도 인스턴스 생성
  useEffect(() => {
    if (!window.google) return;

    const container = document.createElement('div');
    container.id = 'map';
    const mapContainer = document.getElementById('map-container');

    if (mapContainer) {
      mapContainer.appendChild(container);
    }

    const mapInstance = new window.google.maps.Map(container, {
      center: center,
      zoom: 15,
      mapId: '92cb7201b7d43b21',
      disableDefaultUI: true,
      clickableIcons: false,
      minZoom: 10,
      maxZoom: 18,
      gestureHandling: 'greedy',
    });

    setMap(mapInstance);

    return () => {
      if (mapContainer && container.parentNode) {
        mapContainer.removeChild(container);
      }
    };
  }, []); // 빈 의존성 배열로 인해 컴포넌트가 마운트될 때만 실행

  // 마커 업데이트
  useEffect(() => {
    if (!map || hotels.length === 0) return;

    if (map.markers) {
      map.markers.forEach(marker => marker.setMap(null));
    }

    const markers = hotels.map(hotel => {
      const position = { lat: hotel.lat, lng: hotel.lng };

      const marker = new window.google.maps.Marker({
        position,
        map: map,
        title: hotel.title,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div>
            <h3>${hotel.title}</h3>
            <p>${hotel.address}</p>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      return marker;
    });

    map.markers = markers;

  }, [map, hotels]); // map과 hotels가 변경될 때만 마커를 업데이트

  // 팝업창 열기/닫기
  const handleTogglePopup = (hotel) => {
    setSelectedHotel(hotel);
    setShowPopup(prev => !prev); // 토글 기능
  };

  // 팝업창 닫기
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedHotel(null);
  };

  useEffect(() => {
    if (selectedHotel) {
      console.log(selectedHotel);
    }
  }, [selectedHotel]);

  return (
    <div id="planner-page">
      <div id="map-container">
      </div>
      <div className="planner-page-container">
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <Planner
              key={index}
              title={hotel.title}
              address={hotel.address}
              imageSrc={hotel.image}
              onClick={() => handleTogglePopup(hotel)} 
            />
          ))
        ) : (
          <p>호텔 데이터가 없습니다.</p>
        )}
      </div>

      {/* 팝업창 표시 */}
      {showPopup && selectedHotel && (
        <div className="popup">
          <div className="popup-content">
            <button className="close" onClick={handleClosePopup}>&times;</button>
            <h2>{selectedHotel.title}</h2>
            <img src={selectedHotel.image} alt={selectedHotel.title} />
            <p>{selectedHotel.address}</p>
            <p>전화번호: {selectedHotel.phone_number}</p>
            <p>평점: {selectedHotel.rating}</p>
            <p>홈페이지: <a href={selectedHotel.url} target="_blank" rel="noopener noreferrer">{selectedHotel.url}</a></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlannerPage;
