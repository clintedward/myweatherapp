import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
/* eslint-disable no-unused-vars */
//ESlint rule. It prevents you from creating variables that you never use.
const API_KEY = "&APPID=ade636934c833ce1782041163d55d2f0";

class App extends React.Component {
  state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
  }
    
  
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    //ES6 template strings should be used with backquotes, not single quotes.
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=ade636934c833ce1782041163d55d2f0`);
    
    //convert the data to JSON format
    const data = await api_call.json();
    /* eslint-enable no-unused-vars */
    if (city && country) {
      console.log(data);

      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value."
      });
    }
  }
  render(){
    return (
      <div>
        <div className="wrapper">
          < div className="main">
            < div className="container" >
                < div className="row" >
                  <div className="col-xs-5 title-container">
                    <Titles />
                  </div>
                  <div className="col-xs-7 form-container">
                    <Form getWeather = {this.getWeather}/>
                     <Weather
                        temperature = {this.state.temperature}
                        city = {this.state.city}
                        country = {this.state.country}
                        humidity = {this.state.humidity}
                        description = {this.state.description}
                        error = {this.state.error}
                     />
                  </div>
              </div>
          </div>
        </div>
     </div>
    </div>
    );
  }
};


  

export default App;

