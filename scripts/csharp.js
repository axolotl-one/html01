const keywords = await cargarDatos("../scripts/csharp-keywords.json");
const tabKeywords = document.getElementById("tab-keywords");
cargarTablaKeywords();

async function cargarDatos(ruta) {
    const respuesta = await fetch(ruta);
    const data = await respuesta.json();
    return data;
}

async function cargarTablaKeywords() {
    await keywords.forEach((keyword) => {
        const fila = document.createElement("tr");
        const tdkeyw = document.createElement("td");
        const tdtipo = document.createElement("td");
        const tdinfo = document.createElement("td"); 
        tdkeyw.innerHTML = keyword.keyword;
        tdtipo.innerHTML = keyword.tipo;
        tdinfo.innerHTML = keyword.info;
        fila.append(tdkeyw);
        fila.append(tdtipo);
        fila.append(tdinfo);
        tabKeywords.append(fila);
    })
}