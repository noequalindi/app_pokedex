import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';  // Asegúrate de que el componente PokemonCard esté en la misma carpeta
import './PokemonContainer.css';  // Estilos para el contenedor (opcional)

const PokemonContainer = () => {
  const [pokemonsList, setPokemons] = useState([])
  const [loading, setLoading] = useState(true); // Estado de carga (cuando se hace la request a la API y tarda, hay que poner un loader para que el user entienda)
  const [error, setError] = useState(null); // Estado para almacenar errores

  // Ejemplo de una lista con un solo Pokémon genérico
  // const pokemonsList = [
  //   { name: 'Ditto', type: 'Normal', image: '' },  // Aquí se podrían agregar millones de pokemones.
  //   { name: 'Bulbasaur', type: 'Grass/Poison', image: 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png' },
  //   { name: 'Charmander', type: 'Fire', image: 'https://projectpokemon.org/home/uploads/monthly_2017_11/59fc6735973e3_large.GlobalLink.png.d2d391533b981da92420aace52b7cc15.png' },
  // ];

  
  useEffect(() => {
    // Función asíncrona para obtener datos de la API de Pokémon
    const fetchPokemons = async () => {
      try {
        // Hacemos una solicitud HTTP GET a la API de Pokémon para obtener la lista de Pokémon
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
        
        // Si la respuesta no es exitosa (no es un estado 200), lanzamos un error
        if (!response.ok) {
          throw new Error("Error al obtener la lista de Pokémon");
        }

        // Convertimos la respuesta a formato JSON
        const data = await response.json();

        // Usamos Promise.all para obtener los detalles de cada Pokémon en paralelo
        const pokemonData = await Promise.all(
          data.results.map(async (pokemon) => {
            try {
              // Solicitud para obtener detalles adicionales de cada Pokémon
              const res = await fetch(pokemon.url);
              if (!res.ok) {
                throw new Error(`Error al obtener detalles de ${pokemon.name}`);
              }

              const pokemonDetails = await res.json();

              // Devolvemos los detalles del Pokémon
              return {
                name: pokemon.name,
                image: pokemonDetails.sprites.front_default,
                type: pokemonDetails.types.map((type) => type.type.name).join(", "),
              };
            } catch (error) {
              console.error("Error en detalles de Pokémon:", error);
              return null; // Devuelve null si falla al obtener los detalles
            }
          })
        );

        // Filtramos cualquier Pokémon nulo y actualizamos el estado
        setPokemons(pokemonData.filter(Boolean));
      } catch (error) {
        console.error("Error en fetchPokemons:", error);
        setError("Hubo un problema al cargar los datos de Pokémon.");
      } finally {
        setLoading(false); // Detenemos el estado de carga
      }
    };

    fetchPokemons();
  }, []);

  if (loading) { // si se estan obteniendo los datos, se está cargando la info, retornamos el elemento del spinner
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }


  return (
    <div className="pokemon-container">
        {error && <h2>{error}</h2>}
      {pokemonsList.map((pokemon, index) => ( 
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
};
export default PokemonContainer;

/* 
--------------------------- NOTAS ---------------------------
El método map recorre cada uno de esos objetos (Pokémon) y ejecuta la función proporcionada para cada uno de ellos.
(pokemon, index) => (...):
pokemon es el parámetro que representa el objeto de cada Pokémon en cada iteración. 
En el contexto de la Pokédex, podría ser un objeto como { name: 'Bulbasaur', type: 'Grass/Poison', image: '' }.
index es el parámetro que representa la posición de ese Pokémon en el array (comenzando desde 0). Esto se usa como key para asegurar que cada tarjeta tenga una identificación única.

El hook useEffect en React es una de las herramientas más poderosas y versátiles para manejar efectos secundarios en componentes funcionales. Un efecto secundario es cualquier operación que no se refiere directamente a la renderización del componente, como:
useEffect en este caso se utiliza para hacer una petición a la API cuando el componente se monta.
Al pasar un array vacío ([]) como segunda dependencia, aseguramos que la petición solo se haga una vez, justo después de que el componente se monte.
Si el array de dependencias tuviera valores, como el count, el efecto se ejecutaría cada vez que count cambie.

Peticiones HTTP (API calls).
Actualización de un DOM externo.
Suscripción a eventos o temporizadores.
Modificar el estado en función de cambios en props o estado.

useEffect(() => {
  // Código del efecto
}, [dependencias]);
*/

/* Usarlo con la API de Pokemons pública, para evitar la carga constante de pokemons: 
 primero importar los hooks necesarios: import React, {useState, useEffect} from 'react';
 
   const [pokemonsList, setPokemons] = useState([])

  useEffect(() => {
    // Función asíncrona para obtener datos de la API de Pokémon
    const fetchPokemons = async () => {
    
        // Hacemos una solicitud HTTP GET a la API de Pokémon para obtener los primeros 10 Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10'); // Usamos la API pública de Pokémon
        
        // Convertimos la respuesta a formato JSON (los datos de los Pokémon)
        const data = await response.json();
        
        // Usamos Promise.all para esperar a que se obtengan los detalles de cada Pokémon individualmente
        const pokemonData = await Promise.all(
        
        // Recorremos cada Pokémon en el array 'results' de la respuesta
        data.results.map(async (pokemon) => {
            
            // Para cada Pokémon, hacemos otra solicitud GET para obtener detalles adicionales (como imagen y tipo)
            const res = await fetch(pokemon.url);
            const pokemonDetails = await res.json();
            
            // Devolvemos un objeto con el nombre, imagen y tipos del Pokémon
            return {
            name: pokemon.name, // Nombre del Pokémon
            image: pokemonDetails.sprites.front_default, // Imagen del Pokémon
            type: pokemonDetails.types.map((type) => type.type.name).join(', '), // Tipos del Pokémon (se unen por coma)
            };
        })
    );
            
    // Actualizamos el estado con los datos de los Pokémon obtenidos
    setPokemons(pokemonData);
  };
  
  fetchPokemons(); // Llama nuevamente a la funcion
}, []);

Montar un componente se refiere a la acción de colocarlo por primera vez en la interfaz de usuario. 
Es el primer paso en el ciclo de vida del componente. 
Después de que un componente se monta, puede sufrir actualizaciones (cuando sus props o estado cambian) o ser desmontado (cuando el componente se elimina del DOM).

Ciclo de vida del componente:
En componentes de clase, el ciclo de vida se describe con varios métodos como componentDidMount, componentDidUpdate, componentWillUnmount, etc. En componentes funcionales, este ciclo de vida se maneja con hooks como useEffect.

*/