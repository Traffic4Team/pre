// src/store/triplistReducer.js

// 초기 상태(initial state) 정의
const initialState = {
    trips: [], // 여행 목록을 담는 배열
    loading: false, // 데이터 로딩 상태를 나타내는 변수
    error: null, // 오류 상태를 나타내는 변수
  };
  
  // 액션 타입 정의
  const actionTypes = {
    FETCH_TRIPS_REQUEST: 'FETCH_TRIPS_REQUEST',
    FETCH_TRIPS_SUCCESS: 'FETCH_TRIPS_SUCCESS',
    FETCH_TRIPS_FAILURE: 'FETCH_TRIPS_FAILURE',
    ADD_TRIP: 'ADD_TRIP',
    UPDATE_TRIP: 'UPDATE_TRIP',
    DELETE_TRIP: 'DELETE_TRIP',
  };
  
  // 액션 생성자 함수 정의
  export const fetchTripsRequest = () => ({
    type: actionTypes.FETCH_TRIPS_REQUEST,
  });
  
  export const fetchTripsSuccess = (trips) => ({
    type: actionTypes.FETCH_TRIPS_SUCCESS,
    payload: trips,
  });
  
  export const fetchTripsFailure = (error) => ({
    type: actionTypes.FETCH_TRIPS_FAILURE,
    payload: error,
  });
  
  export const addTrip = (trip) => ({
    type: actionTypes.ADD_TRIP,
    payload: trip,
  });
  
  export const updateTrip = (id, updatedTrip) => ({
    type: actionTypes.UPDATE_TRIP,
    payload: { id, updatedTrip },
  });
  
  export const deleteTrip = (id) => ({
    type: actionTypes.DELETE_TRIP,
    payload: id,
  });
  
  // 리듀서 함수 정의
  const triplistReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.FETCH_TRIPS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case actionTypes.FETCH_TRIPS_SUCCESS:
        return {
          ...state,
          loading: false,
          trips: action.payload,
        };
      case actionTypes.FETCH_TRIPS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case actionTypes.ADD_TRIP:
        return {
          ...state,
          trips: [...state.trips, action.payload],
        };
      case actionTypes.UPDATE_TRIP:
        const { id, updatedTrip } = action.payload;
        const updatedTrips = state.trips.map((trip) =>
          trip.id === id ? updatedTrip : trip
        );
        return {
          ...state,
          trips: updatedTrips,
        };
      case actionTypes.DELETE_TRIP:
        const filteredTrips = state.trips.filter((trip) => trip.id !== action.payload);
        return {
          ...state,
          trips: filteredTrips,
        };
      default:
        return state;
    }
  };
  
  export default triplistReducer;
  