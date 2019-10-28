import { guardarData } from "../functions-controller/firebase-controller.js";

export const calcularTotal = (arrayPrint, elem) => {
  const total = arrayPrint.reduce((accum, actual) => {
    return accum + actual.cantidad * actual.precio;
  },0)  
  elem.innerHTML = `total: $ ${total}`;
  return total
}

export const crearObjeto = (array, input, total) => {
  const objOrdenes = {};
  objOrdenes.cliente = input.value;
  objOrdenes.productos = array;
  objOrdenes.total = total;
  console.log(objOrdenes);
  guardarData('Ordenes', objOrdenes)
  .then(() => {
    console.log(array);
    array = [];

  })
  .catch(()=> {
  alert('realiza nuevamente la orden');
  })
}

export const eliminarPedido = (arrayPrint) => {
  const getIndex=event.target.id;
      arrayPrint.splice(getIndex,1);
}
