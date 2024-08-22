import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import { HttpHeadersContext } from '../context/HttpHeadersProvider';
import PopupButton from '../common/Button/Popup_button';
import '../../assets/sass/components/_modal.scss';


function Login() {
  const { setAuth } = useContext(AuthContext);
  const { setHeaders } = useContext(HttpHeadersContext);
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  const changeId = (event) => {
    setId(event.target.value);
  };

  const changePwd = (event) => {
    setPwd(event.target.value);
  };

  const handleJoinClick = () => {
    setModalOpen(true); 
  };

  const login = async () => {
    const req = {
      id: id,
      pwd: pwd,
    };

    try {
      const resp = await axios.post('http://localhost:3000/user/login', req);
      console.log('[Login.js] login() success :D');
      console.log(resp.data);

      alert(`${resp.data.id}님, 성공적으로 로그인 되었습니다 🔐`);

      localStorage.setItem('bbs_access_token', resp.data.jwt);
      localStorage.setItem('id', resp.data.id);

      setAuth(resp.data.id); // 사용자 인증 정보(아이디 저장)
      setHeaders({ Authorization: `Bearer ${resp.data.jwt}` }); // 헤더 Authorization 필드 저장

      navigate('/bbslist');
    } catch (err) {
      console.log('[Login.js] login() error :<');
      console.log(err);

      alert(`⚠️ ${err.response.data}`);
    }
  };

  return (
    <div>
      <table className="table">
        <tbody>
          <tr>
            <th className="col-3">아이디</th>
            <td>
              <input type="text" value={id} onChange={changeId} size="50px" />
            </td>
          </tr>

          <tr>
            <th>비밀번호</th>
            <td>
              <input type="password" value={pwd} onChange={changePwd} size="50px" />
            </td>
          </tr>
        </tbody>
		<div className="my-1 d-flex justify-content-center">
        	<PopupButton buttonText="회원가입" onClick={handleJoinClick} />
		</div>
		<div className="my-1 d-flex justify-content-center">
			<button className="btn btn-outline-secondary" onClick={login}><i className="fas fa-sign-in-alt"></i> 로그인</button>
		</div>
      </table>
    </div>
  );
}

export default Login;
