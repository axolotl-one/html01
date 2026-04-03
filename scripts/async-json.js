export async function cargarDatos(ruta) {
  const respuesta = await fetch(ruta);
  const data = await respuesta.json();
  return data;
}

export async function cargarTabla({ idTabla, sectJSON, campos, seleccion = function () { return true; } }) {
  const tabla = document.getElementById(idTabla);
  await cargarCabezera(tabla, campos);
  await sectJSON.forEach((element) => {
    const fila = document.createElement("tr");
    campos.forEach((campo) => {
      if (!seleccion(element)) return;
      const celda = document.createElement("td");
      celda.innerHTML = campo.get(element);
      fila.append(celda);
    })
    tabla.append(fila);
  })
}

async function cargarCabezera(tabla, campos) {
  const thead = document.createElement("thead");
  await campos.forEach(campo => {
    const celda = document.createElement("th");
    celda.innerHTML = campo.campo;
    thead.append(celda)
  })
  tabla.append(thead);
}

export async function cargarCodigo(idCodigo) {
  const code = document.getElementById(idCodigo);
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