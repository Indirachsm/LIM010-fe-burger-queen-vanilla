import { calcularTotal, crearObjeto, eliminarPedido } from "../functions-controller/funciones.js";

export const pintarArray = (arrayPrint, eleHTML) => {
    eleHTML.innerHTML = '';
    const resultado = arrayPrint.reduce((accum, elem, indice) => {
      return accum + `
        <tr>
        <td>${elem.name}</td>
        <td>$${elem.precio}</td>
        <td>${elem.cantidad} unidades</td>
        <td><button id="${indice}" name="eliminar">x</button></td>
        </tr>`;
    }, '')
  
    const tabla   = document.createElement("table");
    tabla.innerHTML =`
    <input type="text" id= "nombre" placeholder="Cliente">
    <th>Pedido</th>
    <th>Precio</th>
    <th>Cantidad</th>
     ${resultado} 
     `;
    eleHTML.appendChild(tabla);
    tabla.setAttribute('id','tabla-pedidos');
    
    const botones = tabla.querySelectorAll(`[name='eliminar']`)
    botones.forEach((btnDelete) => { btnDelete.addEventListener('click',(event) => {
        eliminarPedido(arrayPrint);
        pintarArray(arrayPrint,eleHTML)
    });
    })
  
    const divTotal   = document.createElement("div");
    eleHTML.appendChild(divTotal);
    const nombreCliente = tabla.querySelector('#nombre');
  
    calcularTotal(arrayPrint, divTotal);
   
    const guardarPedido = document.createElement("button");
    guardarPedido.textContent = 'OK';
    eleHTML.appendChild(guardarPedido);
    guardarPedido.addEventListener('click', () =>{
    crearObjeto(arrayPrint,nombreCliente, calcularTotal(arrayPrint,divTotal));
    eleHTML.innerHTML = '';
  })
  };