export const URL = "http://127.0.0.1:8000";

const getEnrollServices = async () => {
  try {
    const response = await fetch(`${URL}//api/recording/2/`, {
      method: "GET",
      headers: {
        Authorization: `Token 8336957f766dd7c2e30abc53f9dbb32ba92ff6fa`,
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

getEnrollServices().then(data => {
    data.forEach(el => {
        Object.values(el).forEach(el2 => {
            console.log('el2 ->>>', el2);
            el2.forEach(el3 => {
                console.log('el3 ->>>', el3)
            })
        })
    })
});


