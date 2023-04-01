fetch(
  "https:api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=747f02179ecc4e26fb1fa892e4985b88",
  {
    // The browser fetches the resource from the remote server without first looking in the cache.
    // The browser will then update the cache with the downloaded resource.
    cache: "reload",
  }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
