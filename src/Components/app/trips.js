// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Trips() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // API 요청 설정
//         const serviceKey = '3577a8b7-9446-47ce-b745-696dd06a5da1';
//         const numOfRows = '10';
//         const pageNo = '10';
//         const areaNm = '서울특별시 강남구';
//         const clNm = '한식';

//         const response = await axios.get('/request', {
//           baseURL: 'http://api.kcisa.kr/openapi/API_CNV_063',
//           params: {
//             serviceKey: serviceKey,
//             numOfRows: numOfRows,
//             pageNo: pageNo,
//             areaNm: areaNm,
//             clNm: clNm
//           },
//           responseType: 'document'  // XML 데이터를 받기 위해 responseType 설정
//         });

//         const parser = new DOMParser();
//         const xmlDoc = parser.parseFromString(response.data, 'application/xml');

//         // 데이터 파싱
//         const items = xmlDoc.getElementsByTagName('item');
//         const parsedData = Array.from(items).map(item => ({
//           title: item.getElementsByTagName('title')[0].textContent,
//           description: item.getElementsByTagName('description')[0].textContent,
//           subDescription: item.getElementsByTagName('subDescription')[0].textContent,
//           reference: item.getElementsByTagName('reference')[0].textContent,
//           rights: item.getElementsByTagName('rights')[0].textContent,
//           source: item.getElementsByTagName('source')[0].textContent,
//           spatial: item.getElementsByTagName('spatial')[0].textContent,
//           dataStdDt: item.getElementsByTagName('dataStdDt')[0].textContent,
//           dataOfferInst: item.getElementsByTagName('dataOfferInst')[0].textContent,
//           rstrNm: item.getElementsByTagName('rstrNm')[0].textContent,
//           rstrBhfNm: item.getElementsByTagName('rstrBhfNm')[0].textContent,
//           rstrAsstnNm: item.getElementsByTagName('rstrAsstnNm')[0].textContent,
//           rstrClNm: item.getElementsByTagName('rstrClNm')[0].textContent,
//           rstrRoadAddr: item.getElementsByTagName('rstrRoadAddr')[0].textContent,
//           rstrLnbrAddr: item.getElementsByTagName('rstrLnbrAddr')[0].textContent,
//           rstrPnu: item.getElementsByTagName('rstrPnu')[0].textContent,
//           rstrLatPos: item.getElementsByTagName('rstrLatPos')[0].textContent,
//           rstrLotPos: item.getElementsByTagName('rstrLotPos')[0].textContent,
//           rstrGidCd: item.getElementsByTagName('rstrGidCd')[0].textContent,
//           rstrInfoStdDt: item.getElementsByTagName('rstrInfoStdDt')[0].textContent
//         }));

//         setData(parsedData);
//       } catch (error) {
//         setError(error);
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   if (loading) return <div>로딩중...</div>;
//   if (error) return <div>에러가 발생했습니다: {error.message}</div>;
//   if (!data) return null;

//   return (
//     <div>
//       <h1>API 데이터 결과</h1>
      
//     </div>
//   );
// }

// export default Trips;
