import { useEffect, useState } from 'react';
import './App.css';

const App = () => {

  const [planets, setPlanets] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [hasError, setError] = useState(false)


  const fetchPlanets = () => {
    fetch("https://swapi.dev/api/planets/")
      .then(res => {
        if (!res.ok){
          setError(true)
          throw new Error('Error, cannot fetch')
        }
        return res.json()
      })
      .then(data => {
        console.log(data.results)
        let planetData = data.results.sort((a, b) => a.name.localeCompare(b.name))
        setPlanets(planetData)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchPlanets()
  }, [] )

  // function for grouping digits into groups of three
  const groupDigitsThree = (number) => {
    let result = number.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)
    return result.join(" ")
  }

  // function for getting surface area of water
  const getSurfaceAreaWater = (diameter, surfaceWater) => {
      let radius = parseInt(diameter)/2
      let surfaceArea = 4*3.14*(radius**2)
      let saWater = parseFloat(surfaceWater)/100
      return Math.round(surfaceArea*saWater)
  }

    if (hasError) return <h3>Apologies dear Jedi, an error getting data there is 🥀</h3>
  

  
  return (
    <div className="body">
     <h1>The Galaxy of Star Wars 💫 </h1>
    {isLoading ? <h3>Please be patient young Padawan, data is on the way <div id="ball">🔮</div></h3> :
     <table>
	<thead>
	<tr className="table-headers">
    <th>Planet Name</th>
    <th>Climate</th>
    <th>Number of Residents</th>
    <th>Terrain</th>
    <th>Population</th>
    <th>Surface Area Covered By Water (km<sup>2</sup>)</th>
	</tr>
	</thead>
	<tbody>
    {planets.map(data => {
      return (
          <tr key={data.name}>
            <td><a href={data.url} target="_blank" rel="noreferrer">{data.name}</a></td>
            <td>{data.climate}</td>
            <td>{data.residents.length}</td>
            <td>{data.terrain}</td>

            {data.population === "unknown" ? 
            <td>?</td> : 
           <td>{groupDigitsThree(data.population)}</td>
           }  

           {data.surface_water === "unknown" ? 
            <td>?</td> : 
            <td>{groupDigitsThree(getSurfaceAreaWater(data.diameter,data.surface_water))}</td>
           }   
          </tr>
      )
    })}
	</tbody>
</table>
}
    </div>
  );
}

export default App;
