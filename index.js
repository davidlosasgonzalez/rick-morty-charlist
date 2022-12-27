/**
 * ##############
 * ## API REST ##
 * ##############
 *
 * Un API REST me permite realizar consultas a un servidor utilizando un
 * endpoint o ruta y un método: GET, POST, PUT o DELETE:
 *
 *      - GET: para obtener información.
 *      - POST: para crear elementos.
 *      - PUT: para editar elementos ya existentes.
 *      - DELETE: para eliminar elementos.
 *
 * En el API de Rick & Morty, si queremos obtener información de los personajes
 * debemos utilizar la ruta "/api/character" y el método GET.
 *
 */

'use strict';

// Seleccionamos el <ul> de personajes.
const charList = document.querySelector('ul');

// Seleccionamos el <div> donde queremos poner los botones.
const buttonsDiv = document.querySelector('div');

// Función asíncrona que solicita personajes al servidor de Rick & Morty.
const getCharacter = async (url) => {
    // Vaciamos el contenido del <ul> y del <div> de botones.
    charList.innerHTML = '';
    buttonsDiv.innerHTML = '';

    // Hago una petición a un servidor y obtengo un objeto de tipo Response.
    const response = await fetch(url);

    // La información que a mi me interesa está en la propiedad body del objeto
    // Response. Mediante el método "json" podemos desencriptar el body.
    const body = await response.json();

    // Creamos un fragmento de documento.
    const frag = document.createDocumentFragment();

    // Recorremos el array de personajes.
    for (const character of body.results) {
        // Creamos un <li> vacío.
        const li = document.createElement('li');

        // Agregamos contenido al <li>.
        li.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <h2>${character.name}</h2>
        `;

        // Agregamos el <li> al fragmento de documento.
        frag.append(li);
    }

    // Agregar el fragmento de documento al <ul> de personajes.
    charList.append(frag);

    // Creamos los botones de página siguiente y página anterior.
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');

    // Agregamos un valor a cada botón.
    prevBtn.textContent = '<<';
    nextBtn.textContent = '>>';

    // Agregamos un evento a cada botón que nos lleve a la página correspondiente.
    prevBtn.addEventListener('click', () => getCharacter(body.info.prev));
    nextBtn.addEventListener('click', () => getCharacter(body.info.next));

    // Deshabilitamos el botón correspondiente en caso de que no haya página anterior
    // o página siguiente.
    if (!body.info.prev) prevBtn.setAttribute('disabled', true);
    if (!body.info.next) prevBtn.setAttribute('disabled', true);

    // Agregamos los botones al div de botones.
    buttonsDiv.append(prevBtn, nextBtn);
};

getCharacter('https://rickandmortyapi.com/api/character');
