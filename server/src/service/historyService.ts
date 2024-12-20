// TODO: Define a City class with name and id properties DONE
import fs from 'node:fs/promises';
import { v4 as uuidv4 } from 'uuid';

class City {
  name:string;
  id:string;
  constructor(
    name:string, 
    id:string
  ){
      this.name = name;
      this.id = id;
  }
}


// TODO: Complete the HistoryService class
class HistoryService {
 
  // TODO: Define a read method that reads from the searchHistory.json file Done?
   private async read() {
    return await fs.readFile('../../service/historyService.js', {
      flag: 'a+',
      encoding: 'utf8',
    });//idk how to link this

   }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file Done?
    private async write(cities: City[]) {
    return await fs.writeFile('../../service/historyService.js',JSON.stringify(cities, null, '\t'));
    }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects Done?
  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];
        try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (err) {
        parsedCities = [];
      }

      return parsedCities;
    });
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file Done?
  async addCity(city: string) {
    if(!city){
      throw new Error('City is left blank!');
    }

    const newCity : City ={ name: city, id: uuidv4() };

    return await this.getCities()
      .then((cities) => {
        if (cities.find((index) => index.name === city)) {
          return cities;
        }
        return [...cities, newCity];
      })
      .then((updatedCities) => this.write(updatedCities))
      .then(() => newCity);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file Done?
  async removeCity(id: string) {
    return await this.getCities()
      .then((cities) => cities.filter((city) => city.id !== id))
      .then((filteredCities) => this.write(filteredCities));
  }

}
  
 



export default new HistoryService();
