const BASE_URL = "https://api.thecatapi.com"
const getList = async () => {
    return await fetch(
      BASE_URL + `/v1/images/search?limit=10&page=1`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        return responseJson;
      })
      .catch(error => {
        console.log(error);
      });
  };


  const Api = {
       getList
  }
  export default Api;
