import { useState, useCallback } from 'react';
import Person from './components/Person';
import SearchForm from './components/SearchForm';
import './App.css';
import axios from 'axios';
import VisualizarTiempos from './components/VisualizarTiempos';
import FichaPersonal from './components/FichaPersonal';

function App() {
  const [timeAxios, setTimeAxios] = useState(parseFloat(localStorage.getItem('axiosTime') ?? 0));
  const [timeFetch, setTimeFetch] = useState(parseFloat(localStorage.getItem('fetchTime') ?? 0));
  const [people, setPeople] = useState({ axios: [], fetch: [] });
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('US');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('');
  const [showFicha, setShowFicha] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  const url = `https://randomuser.me/api/?results=12&gender=${gender}&nat=${country}`;

  const findPeopleAxios = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setShowFicha(false);
    setLoadingType('axios');
    setPeople({ axios: [], fetch: [] });

    try {
      const { data: { results } } = await axios.get(url);
      setPeople(prev => ({ ...prev, axios: results }));
    } catch (error) {
      console.error(`Error en Axios: ${error.message}`);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [isLoading, url]); 

  const findPeopleFetch = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setShowFicha(false);
    setLoadingType('fetch');
    setPeople({ axios: [], fetch: [] });

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      const { results } = await response.json();
      setPeople(prev => ({ ...prev, fetch: results }));
    } catch (error) {
      console.error(`Error en Fetch: ${error.message}`);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [gender, country, isLoading, url]);

  const compareRequests = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setShowFicha(false);
    setLoadingType('compare');
    setPeople({ axios: [], fetch: [] });

    try {
      const axiosStart = performance.now();
      const axiosPromise = axios.get(url).then(res => {
        const time = parseFloat((performance.now() - axiosStart).toFixed(2));
        localStorage.setItem('axiosTime', time);
        setTimeAxios(time);
        return res.data.results;
      });

      const fetchStart = performance.now();
      const fetchPromise = fetch(url)
        .then(async res => {
          if (!res.ok) throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`);
          const data = await res.json();
          const time = parseFloat((performance.now() - fetchStart).toFixed(2));
          localStorage.setItem('fetchTime', time);
          setTimeFetch(time);
          return data.results;
        });

      const [axiosResponse, fetchResponse] = await Promise.all([axiosPromise, fetchPromise]);
      setPeople({ axios: axiosResponse, fetch: fetchResponse });
    } catch (error) {
      console.error(`Error en comparación: ${error.message}`);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [gender, country, isLoading, url]);

  const handleGender = (event) => setGender(event.target.value);
  const handleCountry = (event) => setCountry(event.target.value);

  const mostrarFicha = () => {
  if (people.axios.length > 0) {
    setSelectedPerson(people.axios[0]);
    setShowFicha(true);
    setIsLoading(false);
    setLoadingType('');
  } else {
    console.warn("No hay personas para mostrar en la ficha.");
  }
};


  return (
    <div className="App">
      <h1>Random People</h1>
      <SearchForm handleGender={handleGender} handleCountry={handleCountry} country={country} />
      <div className="App-controls">
        <button onClick={findPeopleAxios} disabled={isLoading} className="btn">
          {isLoading && loadingType === 'axios' ? "Cargando..." : "Buscar con Axios"}
        </button>
        <button onClick={findPeopleFetch} disabled={isLoading} className="btn">
          {isLoading && loadingType === 'fetch' ? "Cargando..." : "Buscar con Fetch"}
        </button>
        <button onClick={compareRequests} disabled={isLoading} className="btn">
          {isLoading && loadingType === 'compare' ? "Cargando..." : "Comparar Axios vs Fetch"}
        </button>
        <button onClick={mostrarFicha} disabled={isLoading} className="btn">
          Ficha Personal
        </button>
      </div>

    {showFicha ? (
      <FichaPersonal person={selectedPerson} />
    ) : (
      <>
      <VisualizarTiempos timeAxios={timeAxios} timeFetch={timeFetch} />
      <div className="App-results">
        <div className="result-section">
          <h2>Resultados con Axios</h2>
          {isLoading && loadingType === 'axios' && <p>Cargando datos...</p>}
          <div className="people-grid">
            {people.axios.length > 0 ? (
              people.axios.map(person => <Person key={person.login.uuid} person={person} />)
            ) : (
              !isLoading && <p>No hay resultados</p>
            )}
          </div>
        </div>
        <div className="result-section">
          <h2>Resultados con Fetch</h2>
          {isLoading && loadingType === 'fetch' && <p>Cargando datos...</p>}
          <div className="people-grid">
            {people.fetch.length > 0 ? (
              people.fetch.map(person => <Person key={person.login.uuid} person={person} />)
            ) : (
              !isLoading && <p>No hay resultados</p>
            )}
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
}

export default App;
