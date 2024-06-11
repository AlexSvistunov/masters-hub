export const URL = "http://127.0.0.1:8000";

// const getEnrollServices = async () => {
//   try {
//     const response = await fetch(`${URL}/api/recording/1/services/`, {
//       method: "GET",
//       headers: {
//         Authorization: `Token 037a2be7f1cf618be8cb1f293cc79cd5d8f002ea`,
//       },
//     });

//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// getEnrollServices().then(data => {
//     data.forEach(el => {
//         Object.values(el).forEach(el2 => {
//             el2.forEach(el3 => {
//                 console.log(el3)
//             })
//         })
//     })
// });
