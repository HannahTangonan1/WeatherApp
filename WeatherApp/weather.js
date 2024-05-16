const apikey="c236d4b37ea8c41a502e6b7daae535ae";
window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let lon= position.coords.longitude;
            let lat= position.coords.latitude;
            const url= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${apikey}`;
            

           // Fetch data from the given URL
            fetch(url)
            .then((res) => {
         // Convert the response to JSON
            return res.json();
})
.then((data) => {
    // Log the entire data object to the console for debugging
    console.log(data);

    // Log the current timestamp (in milliseconds) to the console
    console.log(new Date().getTime());

    // Create a new Date object from the 'dt' property of the data
    var dat = new Date(data.dt);

    // Log the localized date and time string in 'Asia/Manila' time zone
    console.log(dat.toLocaleString(undefined, 'Asia/Manila'));

    // Log the current minutes to the console
    console.log(new Date().getMinutes());

    // Call the weatherReport function with the data
    weatherReport(data);
});

        })
    }
})


function searchByCity(){
    var place= document.getElementById('input').value;
    var urlsearch= `http://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=${apikey}`;

    fetch(urlsearch).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        weatherReport(data);
    })
    document.getElementById('input').value='';
}

function weatherReport(data){

    var urlcast= `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&` + `appid=${apikey}`;

    fetch(urlcast).then((res)=>{
        return res.json();
    }).then((forecast)=>{
        console.log(forecast.city);
        hourForecast(forecast);
        dayForecast(forecast)

        console.log(data);
        document.getElementById('city').innerText= data.name + ', '+data.sys.country;
        console.log(data.name,data.sys.country);
    
        console.log(Math.floor(data.main.temp-273));
        document.getElementById('temperature').innerText= Math.floor(data.main.temp-273)+ ' °C';
    
        document.getElementById('clouds').innerText= data.weather[0].description;
        console.log(data.weather[0].description)
        
        let icon1= data.weather[0].icon;
        let iconurl= "http://api.openweathermap.org/img/w/"+ icon1 +".png";
        document.getElementById('img').src=iconurl
    })

}

function hourForecast(forecast) {
    // Select the element with the class 'templist' and clear its inner HTML content
    document.querySelector('.templist').innerHTML = '';

    // Loop through the first 5 items in the forecast list
    for (let i = 0; i < 5; i++) {
        // Convert the timestamp to a JavaScript Date object
        var date = new Date(forecast.list[i].dt * 1000);
        // Log the local time (in 'Asia/Manila' time zone) without the seconds to the console for debugging
        console.log((date.toLocaleTimeString(undefined, 'Asia/Manila')).replace(':00', ''));

        // Create a new div element to contain the hour's forecast
        let hourR = document.createElement('div');
        // Set the class of the div to 'next'
        hourR.setAttribute('class', 'next');

        // Create a new div element to contain the time and temperature
        let div = document.createElement('div');
        
        // Create a new p element to display the time
        let time = document.createElement('p');
        // Set the class of the p element to 'time'
        time.setAttribute('class', 'time');
        // Set the time as the inner text of the p element, removing the seconds part
        time.innerText = (date.toLocaleTimeString(undefined, 'Asia/Manila')).replace(':00', '');

        // Create a new p element to display the temperature
        let temp = document.createElement('p');
        // Calculate the max and min temperatures in Celsius, format them, and set them as the inner text of the p element
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';

        // Append the time p element to the div
        div.appendChild(time);
        // Append the temperature p element to the div
        div.appendChild(temp);

        // Create a new p element to display the weather description
        let desc = document.createElement('p');
        // Set the class of the p element to 'desc'
        desc.setAttribute('class', 'desc');
        // Set the weather description as the inner text of the p element
        desc.innerText = forecast.list[i].weather[0].description;

        // Append the div containing the time and temperature to the hour's forecast div
        hourR.appendChild(div);
        // Append the description p element to the hour's forecast div
        hourR.appendChild(desc);
        // Append the hour's forecast div to the element with the class 'templist'
        document.querySelector('.templist').appendChild(hourR);
    }
}

    
function dayForecast(forecast) {
    // Select the element with the class 'weekF' and clear its inner HTML content
    document.querySelector('.weekF').innerHTML = '';

    // Loop through the forecast list starting from index 8, incrementing by 8 each time
    for (let i = 8; i < forecast.list.length; i += 8) {
        // Log the current forecast data to the console for debugging
        console.log(forecast.list[i]);

        // Create a new div element to contain the day's forecast
        let div = document.createElement('div');
        // Set the class of the div to 'dayF'
        div.setAttribute('class', 'dayF');

        // Create a new p element to display the date
        let day = document.createElement('p');
        // Set the class of the p element to 'date'
        day.setAttribute('class', 'date');
        // Convert the timestamp to a readable date string and set it as the inner text of the p element
        day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(undefined, 'Asia/Manila');
        // Append the date p element to the div
        div.appendChild(day);

        // Create a new p element to display the temperature
        let temp = document.createElement('p');
        // Calculate the max and min temperatures in Celsius, format them, and set them as the inner text of the p element
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';
        // Append the temperature p element to the div
        div.appendChild(temp);

        // Create a new p element to display the weather description
        let description = document.createElement('p');
        // Set the class of the p element to 'desc'
        description.setAttribute('class', 'desc');
        // Set the weather description as the inner text of the p element
        description.innerText = forecast.list[i].weather[0].description;
        // Append the description p element to the div
        div.appendChild(description);

        // Append the div containing the day's forecast to the element with the class 'weekF'
        document.querySelector('.weekF').appendChild(div);
    }
}
