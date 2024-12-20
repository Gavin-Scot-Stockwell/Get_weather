import dotenv from 'dotenv';

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat:number;
  lon:number;

  
}
// TODO: Define a class for the Weather object
class Weather {
  city:string;
  date:string;
  icon:string;
  iconDis:string;
  temp:string;
  wind:string;
  humi:string;
  

  constructor(

    city:string,
    date:string,
    icon:string,
    iconDis:string,
    temp:string,
    wind:string,
    humi:string
  ){
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDis = iconDis;
    this.temp = temp;
    this.wind = wind;
    this.humi = humi;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private apiKey?: string;
  cityName: string;
  
  //https://api.openweathermap.org/data/2.5/forecast?q=${this.cityName}&appid=$a0450f856383adfb749e51ac6005e502` 
  constructor(cityName: string) {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method CHECK BACK HERE
  private async fetchLocationData(query: string) {
    try {
    console.log(`${this.baseURL}/data/2.5/weather?${query}`+ ' DOING GOOD');
  
      const location = await fetch(`${this.baseURL}/data/2.5/weather?${query}`);
      const waitLocal = await location.json();         
return waitLocal;
     
    } catch (err) {
      console.log(err + 'WAITLOCAL IS FREAKING OUT ');
      return undefined;
    }
    
  }

  // TODO: Create destructureLocationData method START HERE
   private destructureLocationData(locationData: any): Coordinates {
    console.log(`LocationData = ${JSON.stringify(locationData)}`)
    
    if (!locationData) {
      console.log('Error! Location data is null or undefined!');
  }
const coor:Coordinates = {
  lat:locationData.coord.lat,
  lon:locationData.coord.lon
}


  return coor;
  }
  
  
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery() {
   
    return `q=${this.cityName}&appid=${this.apiKey}&units=imperial`;//goes to api and take in city and returns lat/lon
  }
  // TODO: Create buildWeatherQuery
  private buildWeatherQuery(coordinates: Coordinates): string {
    
    return `lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
   }


  // TODO: Create fetchAndDestructureLocationData method
 private async fetchAndDestructureLocationData(): Promise <Coordinates> {
  const geocodeQuery = this.buildGeocodeQuery();
  const locationInfo = await this.fetchLocationData(geocodeQuery);
  const coordinates = this.destructureLocationData(locationInfo)
  return coordinates;
 }
  
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
   try{
    const response = await fetch(`${this.baseURL}/data/2.5/forecast?${query}`);
    console.log((`${this.baseURL}/data/2.5/forcast?${query}`)+ 'AAAAAAAAAAAAAAAAAAAAAA')
    return await response.json(); // Ensure to return the JSON response THIS IS THE WEATHER 
  
  }
  catch(err) {
    console.log(err + 'FETCH WEATHER DATA IS WHAT???');
  }
}

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    //console.log(JSON.stringify(response)+ 'PARSE RESPONSE')
    // Assuming response has the properties you need
    const currentWeather =  new Weather  (
      this.cityName,
      response.list[0].dt_txt,
      response.list[0].weather[0].icon,
      response.list[0].weather[0].discription,
      response.list[0].main.temp,
      response.list[0].wind.speed,
      response.list[0].main.humidity 
    );
    return currentWeather
}

// TODO: Complete buildForecastArray method
private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    let forecastArray = [currentWeather];
  //console.log('currentWeather = '+ JSON.stringify(currentWeather));
  //console.log('weatherData = '+ JSON.stringify(weatherData));
   
  console.log('weather data LENGTH YEA ' + weatherData.length);
  for (let i = 0; i < weatherData.length; i++) {
    console.log(JSON.stringify(currentWeather) + 'CURRENT WEATHER HEHE')
console.log('FOR LOOP i = ' + i);
console.log('weather data =  '+ weatherData[i].list[i].dt_txt) 

console.log('LOG HERE 1234567890!@#$%^&*()')
      
  const weatherObj = new Weather (
        this.cityName,
        weatherData[i].list[i].dt_txt,
        weatherData[i].list[i].weather[0].icon,
        weatherData[i].list[i].weather[0].discription,
        weatherData[i].list[i].main.temp,
        weatherData[i].list[i].wind.speed,
        weatherData[i].list[i].main.humidity
      )
      
      console.log(JSON.stringify(weatherData[1].list[1].dt_txt)+ 'WEATHER OBJECT TIME BABY!');
      forecastArray.push(weatherObj);

      console.log(forecastArray + ' Forecast Array');
    } 
    return forecastArray;
}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city:string) {
    this.cityName = city;

    try {
      const coordinates = await this.fetchAndDestructureLocationData();
      const weatherData = await this.fetchWeatherData(coordinates); // Fetch weather data
      
      const currentWeather = await this.parseCurrentWeather(weatherData); // Parse current weather
      //console.log(JSON.stringify(currentWeather) + 'CURRENTWEATHER PLEASE GOD')
      const currentArray:any[] = Array.isArray(weatherData.list) ? weatherData.list : [weatherData];
      
      
      const forecastArray = this.buildForecastArray(currentWeather, currentArray);
      console.log('FORECAST ARRAY'+ forecastArray)
      return forecastArray
    } catch (error) {
        console.log('Failed, no weather data!', error);
        return null;
    }
    
  }
  }

  const cityName = '';

export default new WeatherService(cityName);