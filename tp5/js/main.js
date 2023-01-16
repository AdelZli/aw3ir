var app;
window.onload = function () {
    app = new Vue({
        el: '#weatherApp',
        data: {
           
            loaded: false,

           
            formCityName: '',

            message: 'WebApp Loaded.',
            messageForm: '',

         
            cityList: [{
                name : ''
            }],

            
            cityWeather : null,

           
            cityWeatherLoading : false
        },

      
        mounted : function(){
            this.loaded = true;
            this.readData();
        },

        
        methods: {
            readData: function (event) {
                console.log('JSON.stringify(this.cityList)', JSON.stringify(this.cityList));
                

                console.log('this.loaded:', this.loaded); 
            },
            addCity: function (event) {
                event.preventDefault(); 

                console.log('formCityName:',this.formCityName);
          
                 if(this.isCityExist(this.formCityName)){
                this.messageForm = 'existe déjà';
            }
            else{
                this.cityList.push({name : this.formCityName});

             
                this.messageForm = '';

                this.formCityName = '';
            } 
            },

            isCityExist: function (_cityName){

              
                if( this.cityList.filter(item => item.name.toUpperCase() == _cityName.toUpperCase()).length>0){
                    return true;
                }
                else{
                    return false;
                }
            },

           remove: function (_city) {      
  
                this.cityList = this.cityList.filter(item => item.name != _city.name);       
            }, 
            meteo: function (_city) {  
 
                this.cityWeatherLoading = true;

 
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+_city.name+'&units=metric&lang=fr&apikey=726b60236bd90dad45f22a25d516efcd')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            app.cityWeatherLoading = false;

         
            if(json.cod === 200){
           
                app.cityWeather = json;
                app.message = null;
            }
            else{
                app.cityWeather = null;
                app.message = 'Météo introuvable pour ' + _city.name 
                                + ' (' + json.message+ ')';
            }        
        })       
    }       
    }     
})
}