import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import PopupButton from '../common/Button/Popup_button';
import '../../assets/sass/components/_modal.scss';
import ErrorMessage from '../common/ErrorMessage/ErrorMessage';

function Login() {
  const { auth, tokens, updateAuth, clearAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const changeEmail = (event) => setEmail(event.target.value);
  const changePw = (event) => setPw(event.target.value);
  const changeAuthEmail = (event) => setAuthEmail(event.target.value);

  const handleJoinClick = () => setModalOpen(true);
  const handleUserClick = () => navigate('/user');

  const login = async () => {
    const req = { email, pw };

    try {
      const resp = await axios.post('http://ec2-43-203-192-225.ap-northeast-2.compute.amazonaws.com:8080/user/signIn', req, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      console.log('Login response:', resp);

      if (resp.status === 200) {
        const data = resp.data.data;

        if (data) {
          const { userId, accessToken, refreshToken } = data;

          updateAuth(userId, accessToken, refreshToken);
          navigate('/googlemaps');
        } else {
          setError('로그인 실패: 응답 데이터가 유효하지 않습니다.');
        }
      } else {
        setError('로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      const errorMessage = err.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      setError(`⚠️ ${errorMessage}`);
    }
  };

  const sendAuthEmail = async () => {
    try {
      await axios.get('http://ec2-43-203-192-225.ap-northeast-2.compute.amazonaws.com:8080/user/email/send-email', {
        params: { email: authEmail },
        headers: { 'Content-Type': 'application/json' },
      });
      alert('인증 이메일이 전송되었습니다.');
    } catch (err) {
      alert('인증 이메일 전송 중 오류가 발생했습니다.');
    }
  };

  const logout = () => {
    clearAuth();
    alert(`${auth}님, 성공적으로 로그아웃 됐습니다 🔒`);
    navigate("/");
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(`http://ec2-43-203-192-225.ap-northeast-2.compute.amazonaws.com:8080/user/${userId}`);
          if (response.status === 200) {
            setUserInfo(response.data.data);
          } else {
            setError('유저 정보 조회 실패');
          }
        } catch (error) {
          console.error('Error fetching user info:', error);
          setError('유저 정보 조회 중 오류가 발생했습니다.');
        }
      }
    };

    if (auth) {
      fetchUserInfo();
    } else {
      setUserInfo(null);
    }
  }, [auth]);

  return (
    <div>
      <ErrorMessage message={error} />
      {auth ? (
        <div>
          <div className="my-1 d-flex justify-content-center">
            <button className="btn btn-outline-danger" onClick={() => clearAuth()}>로그아웃</button>
          </div>
          <div className="user-info">
            <h3>유저 정보</h3>
            <p>로그인 완료! 유저 정보를 보려면 버튼을 클릭하세요.</p>
            <button className="btn btn-outline-primary" onClick={handleUserClick}>
              유저 정보 조회
            </button>
          </div>
        </div>
      ) : (
        <table className="table">
          <tbody>
            <tr>
              <th>이메일</th>
              <td>
                <input type="text" value={email} onChange={changeEmail} size="50px" placeholder="이메일을 입력하세요"/>
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
                <input type="password" value={pw} onChange={changePw} size="50px" placeholder="비밀번호를 입력하세요"/>
              </td>
            </tr>
            <div className="my-1 d-flex justify-content-center">
              <PopupButton buttonText="회원가입" onClick={handleJoinClick} />
            </div>
            <div className="my-1 d-flex justify-content-center">
              <button className="btn btn-outline-secondary" onClick={login}>로그인</button>
            </div>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Login;
