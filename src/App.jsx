import { useState } from "react"

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)

  const fetchWeather = async () => {
    // Step 1 - City se coordinates lo
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    )
    const geoData = await geoResponse.json()

    const lat = geoData.results[0].latitude
    const lon = geoData.results[0].longitude

    // Step 2 - Coordinates se weather lo
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    )
    const weatherData = await weatherResponse.json()
    console.log(weatherData)
    setWeather(weatherData.current_weather)
  }


  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button onClick={fetchWeather}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold mt-2 w-full transition"

        >Search</button>

        {weather && (
          <div className="bg-blue-50 rounded-xl p-6 text-center mt-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{city}</h2>
            <div className="flex justify-around">
              <div>
                <p className="text-4xl font-bold text-blue-500">
                  {weather.temperature}°C
                </p>
                <p className="text-gray-500 mt-1">Temperature</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-purple-500">
                  {weather.windspeed}
                </p>
                <p className="text-gray-500 mt-1">Wind km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App