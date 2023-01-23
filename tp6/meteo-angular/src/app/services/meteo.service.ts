import { Injectable } from '@angular/core';
import { MeteoItem } from '../meteoItem';
//import { Observable } from 'rxjs/Observable';
//import { of } from 'rxjs/observable/of';

@Injectable({ providedIn: 'root' })
export class MeteoService {

  constructor() { }


  getMeteo(name: string): Promise<any> {
    console.log('from service', name);

    let m = new MeteoItem();

    return fetch('https://api.openweathermap.org/data/2.5/weather/?q=' + name + '&units=metric&lang=fr&appid=726b60236bd90dad45f22a25d516efcd')
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {

        // test du code retour
        // 200 = OK
        // 404 = city not found 
        if (json.cod === 200) {
          return Promise.resolve(json);
        } else {
          m.weather = json;

          console.error('Météo introuvable pour ' + name
            + ' (' + json.message + ')');

          return Promise.reject('Météo introuvable pour ' + name
          + ' (' + json.message + ')');
        }

      });

  }

  getForecast(name: string): Promise<any> {
    console.log('from service', name);

    let m = new MeteoItem();

return fetch('https://api.openweathermap.org/data/2.5/forecast/?q='+ name + '&units=metric&lang=fr&appid=726b60236bd90dad45f22a25d516efcd')
  .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        if (json.cod == 200) {
          let today = json.list[0].dt_txt.split(' ')[0];

          // filtrer 
          json.list = json.list.reduce((a: any[], d: { dt_txt: string; }) => {
            if (!(a.find((i: { dt_txt: string; }) => i.dt_txt.split(' ')[0] == d.dt_txt.split(' ')[0])) && (d.dt_txt.split(' ')[0] !== today)) {
              a.push(d);
            }
            return a;
          }, []);

          return Promise.resolve(json);
        } else {
          m.weather = json;

          console.error('Forecast introuvable pour ' + name
            + ' (' + json.message + ')');

          return Promise.reject('Forecast introuvable pour ' + name
          + ' (' + json.message + ')');
        }

      });

  }



}