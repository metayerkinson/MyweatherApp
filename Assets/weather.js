
function getApi() {
    var requestUrl = 'https:api.openweathermap.org/data/2.5/forecast?id=524901&appid={747f02179ecc4e26fb1fa892e4985b88}';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)




})}
    
    
      