import React, { useState } from 'react'; // Importamos React y el hook useState
import './App.css'; // Importamos el CSS
import PokemonContainer from './components/PokemonContainer';  // Importamos el contenedor de Pokémon

/* Estado en la aplicación
En este ejemplo, el estado theme:
Define si el tema actual es claro o oscuro.
Controla el contenido de la clase CSS para el contenedor principal, de modo que se apliquen estilos diferentes.
Se actualiza al hacer clic en el botón, provocando que React vuelva a renderizar la interfaz con el nuevo estado (light o dark).
*/

function App() {
  // Estado para alternar entre tema claro y oscuro
  const [theme, setTheme] = useState('light'); // Este es un "hook" de React llamado useState, que se utiliza para declarar un estado en un componente funcional.

  // Función para cambiar el tema.
  // La función usa setTheme para alternar entre 'light' y 'dark'. Dependiendo del valor actual (prevTheme), 
  // cambia el tema al contrario (si es 'light', lo cambia a 'dark' y viceversa).
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

/* Se retorna el HTML que define la estructura de la aplicación.
<div className={App ${theme}}>: La clase CSS de la div raíz incluirá el valor actual de theme, permitiendo que los estilos definidos en App.css varíen según si es 'light' o 'dark'.
<button onClick={toggleTheme}>: El botón llama a toggleTheme cuando se hace clic, alternando el valor de theme.
{theme === 'light' ? 'Dark' : 'Light'}: Muestra el texto que indica el próximo tema (si el tema actual es claro, sugiere cambiar al oscuro y viceversa).
  */ 
return (
  <div className={`App ${theme}`}>
    <header>
      <h1>Pokédex</h1>
      <button onClick={toggleTheme}>
        Cambiar a {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </header>
    <main>
      <h1>¡Explora la Pokédex!</h1>
      <PokemonContainer />  {/* Aquí se muestran las tarjetas de Pokémon */}
    </main>
  </div>
);
}

export default App;

