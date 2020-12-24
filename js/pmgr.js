"use strict"

import * as Pmgr from './pmgrapi.js'

/**
 * Librería de cliente para interaccionar con el servidor de PrinterManager (prmgr).
 * Prácticas de IU 2020-21
 *
 * Para las prácticas de IU, pon aquí (o en otros js externos incluidos desde tus .htmls) el código
 * necesario para añadir comportamientos a tus páginas. Recomiendo separar el fichero en 2 partes:
 * - funciones que pueden generar cachos de contenido a partir del modelo, pero que no
 *   tienen referencias directas a la página
 * - un bloque rodeado de $(() => { y } donde está el código de pegamento que asocia comportamientos
 *   de la parte anterior con elementos de la página.
 *
 * Fuera de las prácticas, lee la licencia: dice lo que puedes hacer con él, que es esencialmente
 * lo que quieras siempre y cuando no digas que lo escribiste tú o me persigas por haberlo escrito mal.
 */
//
// PARTE 1:
// Código de comportamiento, que sólo se llama desde consola (para probarlo) o desde la parte 2,
// en respuesta a algún evento.
//

function createPrinterItem(printer) {
  const rid = 'x_' + Math.floor(Math.random() * 1000000);
  const hid = 'h_' + rid;
  const cid = 'c_' + rid;

  // usar [] en las claves las evalua (ver https://stackoverflow.com/a/19837961/15472)
  const PS = Pmgr.PrinterStates;
  let pillClass = {
    [PS.PAUSED]: "badge-secondary",
    [PS.PRINTING]: "badge-success",
    [PS.NO_INK]: "badge-danger",
    [PS.NO_PAPER]: "badge-danger"
  };

  let allJobs = printer.queue.map((id) =>
    `<span class="badge badge-secondary">${id}</span>`
  ).join(" ");

  return `
    <div class="card">
    <div class="card-header" id="${hid}">
        <h2 class="mb-0">
            <button class="btn btn-link" type="button"
                data-toggle="collapse" data-target="#${cid}",
                aria-expanded="false" aria-controls="#${rid}">
            <b class="pcard">${printer.alias}</b>
            <span class="badge badge-pill ${pillClass[printer.status]}">${printer.status}</span>
            <div class="small">
                ${printer.model} at ${printer.location}
            </div>
            </button>
        </h2>
    </div>

    <div id="${cid}" class="collapse hide" aria-labelledby="${hid}
        data-parent="#accordionExample">
        <div class="card-body pcard">
            ${allJobs} 
    </div>
    </div>
    </div>
 `;
}

function createPrinterItemAUX(printer) {
  const rid = 'x_' + Math.floor(Math.random() * 1000000);
  const hid = 'h_' + rid;
  const cid = 'c_' + rid;

  // usar [] en las claves las evalua (ver https://stackoverflow.com/a/19837961/15472)
  const PS = Pmgr.PrinterStates;

  let pillClass = {
    [PS.PAUSED]: "badge-secondary",
    [PS.PRINTING]: "badge-success",
    [PS.NO_INK]: "badge-danger",
    [PS.NO_PAPER]: "badge-danger"
  };

  let allJobs = printer.queue.map(n =>
    `<span class="badge badge-secondary">${(n)}</span>`
  ).join(" ");


  // PROFE: muevo aquí, usando sólo includes
  let listaGrupos = Pmgr.globalState.groups.filter(n => n.printers.includes(printer.id));

  let allGroups = listaGrupos.map(n =>
    `<span class="badge badge-primary removegroup data-pid=${printer.id} data-gid=${n.id}">${n.name}</span>`
  ).join(" ");
  // PROFE: para convertirlo en botón vía
  allGroups += ` <span class="badge badge-primary addgroup" data-pid=${printer.id}>+</span>`;

  return `
    <tr>
      <td><input type="checkbox" name="select_impresoras"></td>

      <td>${printer.id}</td>

      <td class="alias">${printer.alias}</td>
      <td>
          <span>${printer.model}</span>
          <button class="btn"  name="editModel"> 🖉 </button>
      </td>

      <td>
      <span>${printer.location}</span>
        <button class="btn"  name="editLocation"> 🖉 </button>
      </td>

      <td>
      <span>${printer.ip}</span>
        <button class="btn"  name="editIP"> 🖉 </button>
      </td>

      <td>
      <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="badge badge-pill badge-info"> + ${printer.queue.length} </span> 
          <span class="badge badge-primary">${printer.queue[0]}</span>
        </button>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="#">${allJobs}</a>
        </div>
      </td>
      
      <td>
        <span class="badge badge-pill ${pillClass[printer.status]}">${printer.status}</span>
      </td>
      
      <td>

        <button class="btn btn-default dropdown-toggle" type="button" id=${rid} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="badge badge-pill badge-info"> + ${listaGrupos.length} </span>  
          <span class="badge badge-primary">${listaGrupos.length > 0 ? listaGrupos[0].name : "(no agrupada)"}</span>
        </button>

        <div class="dropdown-menu" aria-labelledby=${rid}>
          <a class="dropdown-item" href="#">${allGroups}</a>
        </div>

      </td>
    </tr>
  `;
}



function createJobItem(job) {
  // usar [] en las claves las evalua (ver https://stackoverflow.com/a/19837961/15472)
  let pillClass = { 0: "badge-secondary", 1: "badge-success", 2: "badge-danger" };
  let jsStatus = { 0: "paused", 1: "finish", 2: "cancel" };
  let random = Math.floor(Math.random() * (+3 - +0)) + +0;

  return `
    <tr>
      <td><input type="checkbox"  name="select_jobs"></td>
      <td scope="row" class="id">${job.id}</td>
      <td >${job.fileName}</td>

      <td >

      <span>${job.owner}</span>
      <button class="btn"  name="editOwner"> 🖉 </button>
      
      
      </td>


      <td>${job.printer}</td>
      <td><span class="badge badge-pill ${pillClass[random]}">${jsStatus[random]}</span></td>
    </tr>
  `;
}

function createGroupItem(group) {
  let allPrinters = group.printers.map((id) =>
    `<span class="badge badge-primary">${(id)}</span>`
  ).join(" ");

  return `
    <tr>
      <td><input type="checkbox"  name="select_grupos"></td>
      <td>${group.id}</td>
      
      <td >
        <div class="row" >
      
          <div class="col-sm">
          <span> ${group.name} </span>
            
          <button class="btn"  name="edit"> 🖉 </button>
           
          </div>
        </div>
      </td>

      <td>
          
      <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          
      <span class="badge badge-pill badge-info"> + ${group.printers.length} </span> 
        <span class="badge badge-primary">${group.printers[0]}</span>
        
        
      </button>

      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">${allPrinters}</a>
      </div>
       



      </td>

    </tr>
 `;
}

// funcion de actualización de ejemplo. Llámala para refrescar interfaz
function update() {
  try {
    $("#trPrinters").empty();
    $("#trGroups").empty();
    $("#trJobs").empty();

    // PROFE: elimino el "Pmgr.list", porque hace una petición innecesaria
    Pmgr.globalState.groups.forEach(m => $("#trGroups").append(createGroupItem(m)));
    Pmgr.globalState.jobs.forEach(m => $("#trJobs").append(createJobItem(m)));
    Pmgr.globalState.printers.forEach(m => $("#trPrinters").append(createPrinterItemAUX(m)));
  } catch (e) {
    console.log('Error actualizando', e);
  }

  // para que siempre muestre los últimos elementos disponibles
  activaBusquedaDropdown($('#dropdownBuscableGrupos'),
    (select) => Pmgr.globalState.groups.forEach(m =>
      select.append(`<option value="${m.id}">${m.name}</option>`))
  );
  activaBusquedaDropdown($('#dropdownBuscableImpresoras'),
    (select) => Pmgr.globalState.printers.forEach(m =>
      select.append(`<option value="${m.id}">${m.alias}</option>`))
  );


  // PROFE: ahora solo muestra por consola, pero lo suyo seria mostrar aqui un modal para editar grupos de la impresora 
  $("span.addgroup").click(e => {
    const pid = $(e.target).attr("data-pid")
    console.log("ahora editaria grupos de ", pid);
  });
}


function activaBusquedaDropdown(div, actualizaElementos) {
  let search = $(div).find('input[type=search]');
  let select = $(div).find('select');
  console.log(search, select);

  // vacia el select, lo llena con impresoras validas
  select.empty();
  actualizaElementos(select);

  // filtrado dinámico
  $(search).off('input'); // elimina manejador anterior, si lo habia
  $(search).on('input', () => {
    let w = $(search).val().trim().toLowerCase();
    let items = $(select).find("option");

    items.each((i, o) =>
      $(o).text().toLowerCase().indexOf(w) > -1 ? $(o).show() : $(o).hide());

    // muestra un array JS con los seleccionados
    console.log("Seleccionados:", $(select).val());
  });
}

//
// PARTE 2:
// Código de pegamento, ejecutado sólo una vez que la interfaz esté cargada.
// Generalmente de la forma $("selector").cosaQueSucede(...)
//
$(function () {
  // Servidor a utilizar. También puedes lanzar tú el tuyo en local (instrucciones en Github)
  const serverUrl = "http://gin.fdi.ucm.es/iu/api/";
  //const serverUrl = "http://localhost:8080/api/";
  Pmgr.connect(serverUrl);

  // ejemplo de login
  // PROFE - ojo porque os estabais conectando a un id compartido
  // os acabo de re-crear g4 / GrupoCuatro
  Pmgr.login("g4", "GrupoCuatro").then(d => {
    if (d !== undefined) {
      update();
      console.log("login ok!");
    } else {
      console.log(`error en login (revisa la URL: ${serverUrl}, y verifica que está vivo)`);
      console.log("Generando datos de ejemplo para uso en local...")
      // PROFE - esto ahora vive en pmgrapi.ja
      Pmgr.populate();
      update();
    }
  });

});


// cosas que exponemos para usarlas desde la consola
// PROFE - muy útil incluir update para poder llamar esto desde fuera mientras hacéis pruebas
window.update = update
window.Pmgr = Pmgr;
window.createPrinterItem = createPrinterItem


//--------------------------------------------------------IMPRESORAS--------------------------------------------------------->

//Agregar impresora - hace referencia la modal añadirImpresora
// PROFE: ojo, tambien he tocado el HTML para usar validación de navegador
$('#añadirImpresora form').submit((e) => {
  const div = $('#añadirImpresora');
  let alias = div.find("input[name='inputAlias']").val();
  let model = div.find("input[name='inputModel']").val();
  let location = div.find("input[name='inputLocation']").val();
  let ip = div.find("input[name='inputIp']").val();

  // oculta el modal de forma programática
  div.modal("hide");

  // envía la petición
  let o = { alias, model, location, ip };
  Pmgr.addPrinter(o).then(d => {
    if (d) {
      // limpia el modal (para que no vuelva a aparecer con esos datos)
      div.find("form")[0].reset();
      // muestra nuevo estado de aplicación
      update();
      // todo añadido bien - enhorabuena!
      $("#addImpresora").show().fadeOut(3000);
    } else {
      // el servidor ha dado fallo! - usad un diálogo para explicar qué ha fallado
      $("#addImpresoraError").show().fadeOut(3000);
    }
  })
  // esto evita que el formulario se envíe de la forma tradicional
  return false;
})

// PROFE - ejemplo de validación para ip
$('input[name="inputIp"]').on('input propertychange paste', e => {
  const o = $(e.target);
  const ok = o.val() === "" || validateIp(o.val());
  o[0].setCustomValidity(ok ? "" : "Eso no es una IP."); // PROFE - mejor algo menos agresivo
});


//Eliminar Impresoras
document.getElementById('eliminarImpresora')//hace referencia modal 'eliminarImpresora'
  .addEventListener('click', function (e) {

    const button = e.target;
    var idPrinter;
    if (button.name == 'btnRmPrinter') {
      $('input[name=select_impresoras]:checked').each(function () {
        var row = $(this).closest("tr")[0];
        var printer;
        idPrinter = row.cells[1].innerHTML;
        for (let i = 0; i < Pmgr.globalState.printers.length; i++) {
          if (Pmgr.globalState.printers[i].id == idPrinter)
            printer = Pmgr.globalState.printers[i];
        }
        Pmgr.rmPrinter(printer.id).then(update);
      });
      $("#rmImpresora").show().fadeOut(3000);
    }
  });



//Modificar Impresora  
$('#trPrinters').on('click', 'button', e => {

  console.log(e);
  const button = e.target;
  const celda = button.parentNode;
  var printer;
  var idPrinter = celda.parentElement.childNodes[3].innerText;

  //Obtengo el objeto printer
  for (let i = 0; i < Pmgr.globalState.groups.length; i++) {
    if (Pmgr.globalState.printers[i].id == idPrinter)
      printer = Pmgr.globalState.printers[i];
  }

  if (button.name == 'editModel') {
    const span = celda.firstElementChild;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    celda.insertBefore(input, span);
    celda.removeChild(span);
    button.textContent = '💾';
    button.name = 'saveModel';
  }

  else if (button.name == 'saveModel') {
    const input = celda.firstElementChild;
    const span = document.createElement('span');
    span.textContent = input.value;
    celda.insertBefore(span, input);
    celda.removeChild(input);
    button.textContent = '🖉';
    button.name = 'editModel';

    printer.model = input.value;
    Pmgr.setPrinter(printer).then(update);

    $("#modImpresora").show().fadeOut(3000);

  }

  else if (button.name == 'editLocation') {
    const span = celda.firstElementChild;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    celda.insertBefore(input, span);
    celda.removeChild(span);
    button.textContent = '💾';
    button.name = 'saveLocation';
  }

  else if (button.name == 'saveLocation') {
    const input = celda.firstElementChild;
    const span = document.createElement('span');
    span.textContent = input.value;
    celda.insertBefore(span, input);
    celda.removeChild(input);
    button.textContent = '🖉';
    button.name = 'editLocation';

    printer.location = input.value;
    Pmgr.setPrinter(printer).then(update);

    $("#modImpresora").show().fadeOut(3000);
  }

  else if (button.name == 'editIP') {
    const span = celda.firstElementChild;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    celda.insertBefore(input, span);
    celda.removeChild(span);
    button.textContent = '💾';
    button.name = 'saveIP';
  }
  else if (button.name == 'saveIP') {
    const input = celda.firstElementChild;
    var validIP = validateIp(input.value);

    if (validIP) {
      const span = document.createElement('span');
      span.textContent = input.value;
      celda.insertBefore(span, input);
      celda.removeChild(input);
      button.textContent = '🖉';
      button.name = 'editIP';
      printer.ip = input.value;
      Pmgr.setPrinter(printer).then(update);;

      $("#modImpresora").show().fadeOut(3000);

    }
    else {
      const span = celda.firstElementChild;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      input.style.borderColor = "#ff0000";
      celda.insertBefore(input, span);
      celda.removeChild(span);
      button.textContent = '💾';
      button.name = 'saveIP';
    }
  }
})


//--------------------------------------------------------Trabajos--------------------------------------------------------->

//Agregar Trabajos
document.getElementById('añadirTrabajo')//hace referencia al modal añadirTrabajo
  .addEventListener('click', function (e) {

    const button = e.target;
    if (button.name == 'btnAddWork') {//hace referencia boton aceptar del modal

      var nameJob = document.getElementById("inputName").files[0].name;
      var owner = document.getElementById("inputOwner").value;
      var printer1 = Pmgr.globalState.printers[0].id;
      var job = new Pmgr.Job(1, printer1, owner, nameJob);
      Pmgr.addJob(job).then(update);

      $("#addJob").show().fadeOut(3000);

    }
  })



//Eliminar Trabajos
document.getElementById('eliminarTrabajos')//hace referencia modal 'eliminar Trabajos'
  .addEventListener('click', function (e) {

    const button = e.target;
    var idJob;
    if (button.name == 'delete') {

      //debugger;
      $('input[name=select_jobs]:checked').each(function () {
        var row = $(this).closest("tr")[0];
        var job;
        idJob = row.cells[1].innerHTML;
        for (let i = 0; i < Pmgr.globalState.jobs.length; i++) {
          if (Pmgr.globalState.jobs[i].id == idJob)
            job = Pmgr.globalState.jobs[i];
        }
        Pmgr.rmJob(job.id).then(update);

        $("#rmJob").show().fadeOut(3000);
      });
    }
  });



//Modificar Trabajos 
document.getElementById('trJobs').addEventListener('click', function (e) {//hace referencia a la tabla trabajos

  const button = e.target;
  const celda = button.parentNode;
  var job;
  var idJob = celda.parentElement.childNodes[3].innerText;

  //Obtengo el objeto job
  for (let i = 0; i < Pmgr.globalState.jobs.length; i++) {
    if (Pmgr.globalState.jobs[i].id == idJob)
      job = Pmgr.globalState.jobs[i];
  }

  if (button.name == 'editOwner') {
    const span = celda.firstElementChild;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = span.textContent;
    celda.insertBefore(input, span);
    celda.removeChild(span);
    button.textContent = '💾';
    button.name = 'saveOwner';
  }

  else if (button.name == 'saveOwner') {
    const input = celda.firstElementChild;
    const span = document.createElement('span');
    span.textContent = input.value;
    celda.insertBefore(span, input);
    celda.removeChild(input);
    button.textContent = '🖉';
    button.name = 'editOwner';

    job.owner = input.value;
    Pmgr.setJob(job).then(update);

    $("#modJob").show().fadeOut(3000);
  }
})



//--------------------------------------------------------GRUPOS--------------------------------------------------------->

//Agregar Grupo
document.getElementById('añadirGrupo')//hace referencia modal 'añadir grupos'
  .addEventListener('click', function (e) {

    const button = e.target;
    var nombre = document.getElementById("inputAddPrinter").value;
    if (button.name == 'addGroup') {
      var group = new Pmgr.Group(1, nombre);
      Pmgr.addGroup(group).then(update);

      $("#addGroup").show().fadeOut(3000);
    }
  })


//Modificar grupo
document.getElementById('trGroups')//hace referencia a la tabla de grupos
  .addEventListener('click', function (e) {

    const button = e.target;
    const celda = button.parentNode;
  
    var group;
    //var idGroup =celda.parentElement.innerText;
    var idGroup = celda.parentElement.parentElement.parentElement.childNodes[3].innerText;
    

    for (let i = 0; i < Pmgr.globalState.groups.length; i++) {
      if (Pmgr.globalState.groups[i].id == idGroup)
        group = Pmgr.globalState.groups[i];
    }

    if (button.name == 'edit') {
      const span = celda.firstElementChild;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      celda.insertBefore(input, span);
      celda.removeChild(span);
      button.textContent = '💾';
      button.name = 'save';
    }

    else if (button.name == 'save') {
      const input = celda.firstElementChild;
      const span = document.createElement('span');

      span.textContent = input.value;

      celda.insertBefore(span, input);
      celda.removeChild(input);

      button.textContent = '🖉';
      button.name = 'edit';

      group.name = input.value;
      Pmgr.setGroup(group).then(update);

      $("#modGroup").show().fadeOut(3000);
    }
  })



//Eliminar grupos
document.getElementById('eliminarGrupos')//hace referencia modal 'eliminar grupos'
  .addEventListener('click', function (e) {
    const button = e.target;
    var idGroup;
    if (button.name == 'delete') {//hace referencia boton del modal "Aceptar"

      $('input[name=select_grupos]:checked').each(function () {
        var row = $(this).closest("tr")[0];
        var group;
        idGroup = row.cells[1].innerHTML;
        for (let i = 0; i < Pmgr.globalState.groups.length; i++) {
          if (Pmgr.globalState.groups[i].id == idGroup)
            group = Pmgr.globalState.groups[i];
        }

        Pmgr.rmGroup(group.id).then(update);

      });

      $("#rmGroup").show().fadeOut(3000);
    }
  });



