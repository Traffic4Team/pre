import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";


function Register() {

	const [id, setId] = useState("");
	const [name, setName] = useState("");
	const [pw, setPw] = useState("");
	const [checkPw, setCheckPw] = useState("");
	const [email, setEmail] = useState("");
	

	const navigate = useNavigate();

	const changeId = (event) => {
		setId(event.target.value);
	}

	const changeName = (event) => {
		setName(event.target.value);
	}

	const changePw = (event) => {
		setPw(event.target.value);
	}

	const changeCheckPw = (event) => {
		setCheckPw(event.target.value);
	}

	const changeEmail = (event) => {
		setEmail(event.target.value);
	}

	/* 아이디 중복 체크 */
	// const checkIdDuplicate = async () => {

	// 	await axios.get("/user", {
	// 		params: { id: id },
	// 		withCredentials: true
	// 	})
	// 		.then((resp) => {
	// 			console.log("[Register.js] checkIdDuplicate() success :D");
	// 			console.log(resp.data);

	// 			if (resp.status == 200) {
	// 				alert("사용 가능한 아이디입니다.");
	// 			}
				
	// 		})
	// 		.catch((err) => {
	// 			console.log("[Register.js] checkIdDuplicate() error :<");
	// 			console.log(err);

	// 			const resp = err.response;
	// 			if (resp.status == 400) {
	// 				alert(resp.data);
	// 			}
	// 		});

	// }
	
	const Register = async () => {

		const req = {
			name: name,
			email: email,
			pw: pw
		}

		await axios.post("http://ec2-43-203-192-225.ap-northeast-2.compute.amazonaws.com:8080/user/register", req, { withCredentials: true })
			.then((resp) => {
				console.log("[Register.js] Register() success :D");
				console.log(resp.data);

				alert(resp.data.name + "님 회원가입을 축하드립니다 🎊");
				navigate("/login");

			}).catch((err) => {
				console.log("[Register.js] Register() error :<");
				console.log(err);

				//alert(err.response.data);

				const resp = err.response;
				if (resp.status == 400) {
					alert(resp.data);
				}
			});
	}

	
	return (
		<div>
		  <table className="table">
			<tbody>
			  <tr>
				<th>이름</th>
				<td>
				  <input
					type="text"
					value={name}
					onChange={changeName}
					size="50px"
					placeholder="이름을 입력하세요"
				  />
				</td>
			  </tr>
	
			  <tr>
				<th>비밀번호</th>
				<td>
				  <input
					type="password"
					value={pw}
					onChange={changePw}
					size="50px"
					placeholder="비밀번호를 입력하세요"
				  />
				</td>
			  </tr>
	
	
			  <tr>
				<th>이메일</th>
				<td>
				  <input
					type="text"
					value={email}
					onChange={changeEmail}
					size="80px"
					placeholder="이메일을 입력하세요"
				  />
				</td>
			  </tr>
			</tbody>
		  </table>
		  <br />
	
		  <div className="my-3 d-flex justify-content-center">
			<button className="btn btn-outline-secondary" onClick={Register}>
			  <i className="fas fa-user-plus"></i> 회원가입
			</button>
		  </div>
		</div>
	  );
	}

export default Register;