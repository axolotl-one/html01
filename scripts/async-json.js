export async function cargarDatos(ruta) {
  const respuesta = await fetch(ruta);
  const data = await respuesta.json();
  return data;
}

export async function cargarTabla({ idTabla, sectJSON, campos }) {
  const tabla = document.getElementById(idTabla);
  await cargarCabezera(tabla, campos);
  await sectJSON.forEach((element) => {
    const fila = document.createElement("tr");
    campos.forEach((campo) => {
      const celda = document.createElement("td");
      celda.innerHTML = campo.get(element);
      fila.append(celda);
    })
    tabla.append(fila);
  })
}

export async function cargarSubtablas({ tablas, campos }) {
  tablas.forEach((tabla) => {
    cargarTabla({idTabla: tabla.id, sectJSON: tabla.contenido, campos: campos})
});}

// async function cargarFila(tabla, sectJSON, campos, seleccion) { }

async function cargarCabezera(tabla, campos) {
  const thead = document.createElement("thead");
  await campos.forEach(campo => {
    const celda = document.createElement("th");
    celda.innerHTML = campo.campo;
    thead.append(celda)
  })
  tabla.append(thead);
}

export async function cargarLista(idLista, arrayJSON) {
  const lista = document.getElementById(idLista);
  await arrayJSON.forEach((linea, index) => {
    lista.append(crearInstruccion(linea, "paso", index, "p", "p"));
  })
}

export async function cargarCodigo(idBloque, arrayJSON) {
  const bloque = document.getElementById(idBloque);
  bloque.classList.add("codeblock");
  await arrayJSON.forEach((linea, index) => {
    bloque.append(crearInstruccion(linea, "code", index, "pre", "pre"));
  })
}

function crearInstruccion(linea, keyLinea, index, etLine, etInfo){
  const instrc = document.createElement(etLine);
  instrc.innerHTML = index + 1 + ". " + linea[keyLinea];
  if(!linea.info) return instrc;
  const det = document.createElement("details");
  const sum = document.createElement("summary");
  const info = document.createElement(etInfo);
  if(linea.err) { info.classList.add("sintax-error"); info.innerHTML = "  > Error " + linea.info; }
  else { info.innerHTML = linea.info; }
  sum.append(instrc);
  det.append(sum);
  det.append(info);
  return det;
}

export async function cargarCodigoRect(idCodigo, arrayJSON) {
  const bloque = document.getElementById(idCodigo);
  bloque.classList.add("codeblock");
  await arrayJSON.forEach((linea, index) => {
    const codigo = document.createElement("pre");
    codigo.innerHTML = index + 1 + ". " + linea.code;
    bloque.append(codigo);
    if(!linea.info) return;
    const info = document.createElement("pre");
    if(linea.err) info.classList.add("sintax-error");
    info.innerHTML = "  > Error " + linea.info;
    bloque.append(info);
  })
}

/* Ej de carga de tablaindividual con una clase foranea
async function cargarTablaKeywords() {
    const clases = csharp.clases.keywords;
    console.log(clases)
    await csharp.keywords.forEach((keyword) => {
        const fila = document.createElement("tr");
        const tdkeyw = document.createElement("td");
        const tdtipo = document.createElement("td");
        const tdinfo = document.createElement("td"); 
        tdkeyw.innerHTML = keyword.keyword;
        tdtipo.innerHTML = clases[keyword.clase];
        tdinfo.innerHTML = keyword.info;
        fila.append(tdkeyw);
        fila.append(tdtipo);
        fila.append(tdinfo);
        tabKeywords.append(fila);
    })    
}*/