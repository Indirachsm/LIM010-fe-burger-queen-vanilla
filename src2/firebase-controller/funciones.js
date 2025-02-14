export const getData = (coleccionName) => {
    return firebase.firestore().collection(coleccionName).get();
};

//para separar

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

    const tabla = document.createElement("table");
    tabla.innerHTML = `
    <input type="text" id= "nombre" placeholder="Cliente">
    <th>Pedido</th>
    <th>Precio</th>
    <th>Cantidad</th>
     ${resultado} 
     `;
    eleHTML.appendChild(tabla);
    tabla.setAttribute('id', 'tabla-pedidos');

    const botones = tabla.querySelectorAll(`[name='eliminar']`)
    botones.forEach((btnDelete) => {
        btnDelete.addEventListener('click', (event) => {
            const getIndex = event.target.id;
            arrayPrint.splice(getIndex, 1);
            pintarArray(arrayPrint, eleHTML)
        });
    })

    const divTotal = document.createElement("div");
    eleHTML.appendChild(divTotal);
    const nombreCliente = tabla.querySelector('#nombre');

    calcularTotal(arrayPrint, divTotal);

    const guardarPedido = document.createElement("button");
    guardarPedido.textContent = 'OK';
    eleHTML.appendChild(guardarPedido);
    guardarPedido.addEventListener('click', () => {
        crearObjeto(arrayPrint, nombreCliente, calcularTotal(arrayPrint, divTotal));
        eleHTML.innerHTML = '';
    })
};

const calcularTotal = (arrayPrint, elem) => {
    const total = arrayPrint.reduce((accum, actual) => {
        return accum + actual.cantidad * actual.precio;
    }, 0)
    elem.innerHTML = `total: $ ${total}`;
    return total
}

const crearObjeto = (array, input, total) => {
    const objOrdenes = {};
    objOrdenes.cliente = input.value;
    objOrdenes.productos = array;
    objOrdenes.total = total;
    console.log(objOrdenes);
    firebase.firestore().collection('ordenes').add({
        objOrdenes
    }).then((array) => {
        alert("holi");
    })
}