var map = L.map("map");
var layer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
}).addTo(map);

const ip = document.getElementById("article-ip");
const location = document.getElementById("article-location");
const timezone = document.getElementById("article-timezone");
const isp = document.getElementById("article-isp");
const btn = document.getElementById("form-btn");
const input = document.getElementById("form-input");

let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_Kf7MTroFGT2dZyEZAvt0bnRIhXSF3&ipAddress=`;

const fetchData = async () => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    ip.innerHTML = data.ip;
    location.innerHTML = data.location.region + "," + data.location.country;
    timezone.innerHTML = `UTC: ${data.location.timezone}`;
    isp.innerHTML = data.isp;
    let lat = data.location.lat;
    let lng = data.location.lng;
    let coords = [lat, lng];
    map.setView(coords, 13);
    L.marker(coords)
      .addTo(map)
      .bindPopup(
        `You are here: ${data.location.city}, ${data.location.region}`
      );
  } catch (error) {
    console.log(error);
    console.log("Can't find this ip");
  }
};

const fetchIp = async () => {
  let inputText = input.value;
  let response = await fetch(url + inputText);
  if (response.status >= 200 && response.status <= 300) {
    try {
      let data = await response.json();
      ip.innerHTML = data.ip;
      location.innerHTML = data.location.region + "," + data.location.country;
      timezone.innerHTML = `UTC: ${data.location.timezone}`;
      isp.innerHTML = data.isp;
      let lat = data.location.lat;
      let lng = data.location.lng;
      let coords = [lat, lng];
      map.flyTo(coords), 13;
      L.marker(coords)
        .addTo(map)
        .bindPopup(
          `You are here:  ${data.location.city}, ${data.location.region}`
        )
        .openPopup();
    } catch (error) {
      console.log(error);
      console.log("Can't find this ip");
    }
  } else return;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let inputText = input.value;
  fetchIp();
  input.value = "";
});

fetchData();
