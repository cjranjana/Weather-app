const container=document.querySelector('.container');
const search=document.querySelector('.search-box button');
const weatherbox=document.querySelector('.weather-box');
const weatherdetails=document.querySelector('.weather-details');
const error=document.querySelector('.not-found');

search.addEventListener('click',()=>{
    const APIKey='d90c825dda6c642fd67494330c39e340';
    const city=document.querySelector('.search-box input').value;

    if(city==='')
        return;
    
    // fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}')
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)

    .then(response=>response.json())
    .then(json=>{
        if(json.cod==='404'){
            container.style.height='400px';
            weatherbox.style.display='none';
            weatherdetails.style.display='none';
            error.style.display='block';
            error.classList.add('fadeIn');
            return;
        }
        error.style.display='none';
        error.classList.remove('fadeIn');

        const image=document.querySelector('.weather-box img');
        const temperature=document.querySelector('.weather-box .temperature');
        const description=document.querySelector('.weather-box .description');
        const humidity=document.querySelector('.weather-details .humidity span');
        const wind=document.querySelector('.weather-details .wind span');

        
        switch(json.weather[0].main){
            case 'Clear':
                image.src='images/clear sky.png';
                break;
                case 'Rain':
                image.src='images/rain.png';
                break;
                case 'Snow':
                image.src='images/snow.png';
                break;
                case 'Clouds':
                image.src='images/cloud.png';
                break;
                case 'Haze':
                image.src='images/misty.png';
                break;
            default:
                image.src='';
                
        }

        temperature.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
        // description.innerHTML=`${parseInt(json.weather[0].description)}`;
        description.innerHTML=`${json.weather[0].description}`;

        humidity.innerHTML=`${json.main.humidity}%`;
        wind.innerHTML=`${parseInt(json.wind.speed)}Km/h`;

        weatherbox.style.display='';
        weatherdetails.style.display='';
        weatherbox.classList.add('fadeIn');
        weatherdetails.classList.add('fadeIn');
        container.style.height='590px';


    });
});