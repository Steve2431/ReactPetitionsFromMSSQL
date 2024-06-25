import React, { useEffect, useState } from "react";
import axios from 'axios';

export const PetitionsPostGet = () => {

  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState(null);

// Peticion get axios inicio Hecho

useEffect(() => {

  const GetInfo = async () => {
  
    try {
      const resp = await axios.get('http://localhost:3000/nombres');
      console.log("respuesta", resp);
      setData(resp.data)
    } catch (error) {
      console.log('Hubo un error', error)
    }
  
  }
  GetInfo();

}, [])

// Peticion get axios final

// Peticion post axios inicio Hecho

  const PostInfo = async (e) => {
    e.preventDefault();
    
   try{
      const resp = await axios.post('http://localhost:3000/nombres', {
        id,
        nombre
      });
      setResponse(resp.data)
      console.log("resultado:", resp);

      // Forma de actualizar la tabla
      setData([...data, {id, nombre}]);

      // Forma de limpiar los inputs sin una funcion
      setId('');
      setNombre('');
   } catch (error) {
    console.log("Error",error);
   }

  }

// Peticion post axios final

  return(
      <div>

        <div>
          
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} />

          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <button type="submit" onClick={PostInfo} >Enviar</button>

          </div>

          <ol>
            {data.slice(1).reverse().map(item => (
              <li key={item.id}>
                id: {item.id} Nombre: {item.nombre}
              </li>
            ))}
          </ol>

      </div>
  )
}
