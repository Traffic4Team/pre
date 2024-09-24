import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../common/ErrorMessage/ErrorMessage';
import "./user.css";
import '@fortawesome/fontawesome-free/css/all.css';

function User() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [travelPlans, setTravelPlans] = useState([]); // 간단한 여행 계획 목록
  const [travelPlan, setTravelPlan] = useState(null); // 상태로 세부 여행 계획
  const [editableUserInfo, setEditableUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null); // 초기값 null로 설정
  const [travelPlanId, setTravelPlanId] = useState(null); // 상태로 travelPlanId
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    const fetchUserInfo = async () => {
      if (!userId) return; // userId가 없으면 API 호출 중단

      try {
        const response = await axios.get(`http://ec2-43-203-192-225.ap-northeast-2.compute.amazonaws.com:8080/user/${userId}`);
        if (response.status === 200) {
          setUserInfo(response.data.data);
          setEditableUserInfo(response.data.data); // Initialize editable data

          // 간단한 여행 계획 목록 조회
          const travelPlansResponse = await axios.get(`http://ec2-43-203-192-225.ap-northeast-2.compute.amazonaws.com:8080/user/${userId}/travel-plans`);
          setTravelPlans(travelPlansResponse.data.data); // 간단한 여행 계획 목록 설정
        } else {
          setError('유저 정보 조회 실패');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('유저 정보 조회 중 오류가 발생했습니다.');
      }
    };

    fetchUserInfo();
  }, [userId]); // userId가 변경될 때만 호출

  useEffect(() => {
    if (userId && travelPlanId) {
      fetchTravelPlan(userId, travelPlanId);
    }
  }, [userId, travelPlanId]); // userId와 travelPlanId가 변경될 때 호출

  const fetchTravelPlan = async (userId, travelPlanId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://ec2-43-203-192-225.ap-northeast-2.compute.amazonaws.com:8080/user/${userId}/travel-plans/${travelPlanId}`);
      console.log('여행 계획 조회 성공:', response.data);
      setTravelPlan(response.data.data);
    } catch (error) {
      console.error('여행 계획 조회 중 오류 발생:', error);
      setError('여행 계획 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleTravelPlanClick = (planId) => {
    setTravelPlanId(planId);
  };

  const handleDeleteTravelPlan = async (planId, title) => {
    const isConfirmed = window.confirm(`정말로 "${title}" 여행 계획을 삭제하시겠습니까?`);

    if (!isConfirmed) return;

    setLoading(true);
    try {
      const response = await axios.delete(`http://ec2-43-203-192-225.ap-northeast-2.compute.amazonaws.com:8080/user/${userId}/travel-plans/${planId}`);
      if (response.status === 200) {
        setTravelPlans(travelPlans.filter(plan => plan.id !== planId)); // 목록에서 해당 여행 계획 제거
        setTravelPlan(null);
        console.log('여행 계획 삭제 성공:', response.data);
      }
    } catch (error) {
      console.error('여행 계획 삭제 중 오류 발생:', error);
      setError('여행 계획 삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditableUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="main-container">
      <ErrorMessage message={error} />
      {loading && <p>로딩 중...</p>}
      {userInfo ? (
        <div>
          <h2>유저 정보</h2>
          <div className="user-info">
            <label>
              이메일:
              <input
                type="text"
                name="email"
                value={editableUserInfo?.email || ''} // editableUserInfo가 null일 경우 빈 문자열 처리
                onChange={handleInputChange}
                disabled
              />
            </label>
            <label>
              이름:
              <input
                type="text"
                name="name"
                value={editableUserInfo?.name || ''} // 동일하게 null일 경우 빈 문자열
                onChange={handleInputChange}
              />
            </label>
            <label>
              ID:
              <input
                type="text"
                name="id"
                value={editableUserInfo?.id || ''} // 동일 처리
                onChange={handleInputChange}
                disabled
              />
            </label>
          </div>
  
          <h2>여행 계획 목록</h2>
          <ul>
            {travelPlans.length ? (
              travelPlans.map((plan) => (
                <li key={plan.id}>
                  <button onClick={() => handleTravelPlanClick(plan.id)}>
                    {plan.title}
                  </button>
                  <span> ({new Date(plan.createdAt).toLocaleDateString()})</span>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTravelPlan(plan.id, plan.title)}
                    aria-label="Delete Travel Plan"
                  >
                    <i className="fas fa-times" style={{ color: 'red', marginLeft: '10px' }}></i> {/* X 아이콘 */}
                  </button>
                </li>
              ))
            ) : (
              <p>여행 계획이 없습니다.</p>
            )}
          </ul>
  
          <h2>여행 계획 세부 정보</h2>
          {travelPlan ? (
            <div>
              <h3>{travelPlan.title}</h3>
              <p>{travelPlan.content}</p>
              <p>생성일: {new Date(travelPlan.createdAt).toLocaleDateString()}</p>
              <h4>여행 바스켓</h4>
              <ul>
                {travelPlan.travelBasket?.basketItems.length ? (
                  travelPlan.travelBasket.basketItems.map((item) => (
                    <li key={item.id}>
                      <h5>{item.title}</h5>
                      <p>{item.address}</p>
                      <p>Rating: {item.rating}</p>
                    </li>
                  ))
                ) : (
                  <p>여행 바스켓에 아이템이 없습니다.</p>
                )}
              </ul>
            </div>
          ) : (
            <p>여행 계획을 불러오는 중입니다...</p>
          )}
        </div>
      ) : (
        <p>유저 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}

export default User;
