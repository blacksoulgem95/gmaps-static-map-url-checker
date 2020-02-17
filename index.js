const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ck_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const ck_lon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

function check_lat_lon(lat, lon){
  var validLat = ck_lat.test(lat);
  var validLon = ck_lon.test(lon);
  if(validLat && validLon) {
      return true;
  } else {
      return false;
  }
}


async function getUrl() {
    return new Promise(resolve => rl.question("Maps URL to analyze?", resolve));
}

async function analyze() {
    const url = await getUrl();
    const value = getParameterByName('path', url);
    const decodedValue = decodeURI(value);

    const latLonArray = decodedValue.split('|');

    latLonArray.forEach((coords, idx) => {
        const [lat, lon] = coords.split(',');
        console.log(`#${idx}\t${lat}\t${lon}\t${check_lat_lon(lat, lon)}`);
    });

    process.exit(0);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


return analyze();
