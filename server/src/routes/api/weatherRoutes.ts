import { Router } from 'express';
const router = Router();

//import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  
  try { 
    const {cityName} = req.body;
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    res.json(weatherData);
  } catch (err) {
    console.log(err + 'ERROR!!!!!!!!!!!!!!!!!!!!!!!!!');
  }
  // TODO: save city to search history
});
/*
// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});
*/
export default router;
