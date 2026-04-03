import { cargarDatos, cargarTabla } from "./async-json.js";
const csharp = await cargarDatos("../scripts/csharp.json");

cargarTabla({ idTabla: "tab-keywords", sectJSON: csharp.keywords, 
    campos: [
        {campo: "Keyword", get: function(obj) { return obj.keyword; }},
        {campo: "Categoría", get: function(obj) { return csharp.clases.keywords[obj.clase]; }},
        {campo: "Descripción", get: function(obj) { return obj.info; }},
]})

cargarTabla({ idTabla: "tab-datos-enteros", sectJSON: csharp.tiposdatos,
    seleccion: function(obj) { return obj.tipo === 0 ? true : false; },
    campos: [
        {campo:"Declarador", get: function(obj){ return obj.keyword; }},
        {campo:"Tipo de Dato", get: function(obj){ return csharp.clases.tiposdatos[obj.tipo]}},
        {campo:"Uso de Memoria", get: function(obj){ return obj.bits + " bits"; }},
        {campo:"Equivalencia", get: function(obj){ return obj.bits/8 + " bytes"; }},
        {campo:"Rango<sub>2</sub>", get: function(obj){ return "- 2<sup>" + (obj.bits - 1) + "</sup> a 2<sup>" + (obj.bits - 1) + "</sup> - 1" }},
        {campo:"Rango<sub>10</sub>", get: function(obj){ return - Math.pow(2, obj.bits - 1) + " a " + (Math.pow(2, obj.bits - 1) - 1) }},
        {campo:"Sufijo de Dato Númerico", get: function(obj){ return obj.sufijo ? obj.sufijo : "C# infiere el Tipo"}}
]});

cargarTabla({ idTabla: "tab-datos-naturales", sectJSON: csharp.tiposdatos,
    seleccion: function(obj) { return obj.tipo === 1 ? true : false; },
    campos: [
        {campo:"Declarador", get: function(obj){ return obj.keyword; }},
        {campo:"Tipo de Dato", get: function(obj){ return csharp.clases.tiposdatos[obj.tipo]}},
        {campo:"Uso de Memoria", get: function(obj){ return obj.bits + " bits"; }},
        {campo:"Equivalencia", get: function(obj){ return obj.bits/8 + " bytes"; }},
        {campo:"Rango<sub>2</sub>", get: function(obj){ return "0 a 2<sup>" + obj.bits + "</sup> - 1" }},
        {campo:"Rango<sub>10</sub>", get: function(obj){ return "0 a " + (Math.pow(2, obj.bits) - 1) }},
        {campo:"Sufijo de Dato Númerico", get: function(obj){ return obj.sufijo ? obj.sufijo : "C# infiere el Tipo"}}
]});

cargarTabla({ idTabla: "tab-datos-flotantes", sectJSON: csharp.tiposdatos,
    seleccion: function(obj) { return obj.tipo === 2 ? true : false; },
    campos: [
        {campo:"Declarador", get: function(obj){ return obj.keyword; }},
        {campo:"Tipo de Dato", get: function(obj){ return csharp.clases.tiposdatos[obj.tipo]}},
        {campo:"Uso de Memoria", get: function(obj){ return obj.bits + " bits"; }},
        {campo:"Equivalencia", get: function(obj){ return obj.bits/8 + " bytes"; }},
        //{campo:"Rango<sub>2</sub>", get: function(obj){ return "0 a 2<sup>" + obj.bits + "</sup> - 1" }},
        //{campo:"Rango<sub>10</sub>", get: function(obj){ return "0 a " + (Math.pow(2, obj.bits) - 1) }},
        {campo:"Sufijo de Dato Númerico", get: function(obj){ return obj.sufijo ? obj.sufijo : "C# infiere el Tipo"}}
]});

cargarTabla({ idTabla: "tab-datos-restantes", sectJSON: csharp.tiposdatos,
    seleccion: function(obj) { return obj.tipo !== 0 && obj.tipo !== 1 && obj.tipo !== 2 ? true : false; },
    campos: [
        {campo:"Declarador", get: function(obj){ return obj.keyword; }},
        {campo:"Tipo de Dato", get: function(obj){ return csharp.clases.tiposdatos[obj.tipo]}},
        {campo:"Uso de Memoria", get: function(obj){ return obj.bits ? obj.bits + " bits" : "Variable"; }},
        {campo:"Información Adicional", get: function(obj){ return obj.info}}
]});

cargarTabla({ idTabla: "tab-conversion-datos", sectJSON: csharp.tiposdatos,
    campos: [
        {campo:"Tipo", get: function(obj) { return obj.keyword}},
        {campo:"sbyte", get: function(obj) { return obj.keyword === "sbyte" ? "==" : obj.bits && obj.bits !== 1 ? "EXP" : "INC";}},
        {campo:"byte", get: function(obj) { return obj.keyword === "byte" ? "==" : obj.bits && obj.bits !== 1 ? "EXP" : "INC";}},
        {campo:"short", get: function(obj) { return obj.keyword === "short" ? "==" : obj.bits && obj.bits !== 1 ? obj.bits < 16 ? "AUTO" : "EXP" : "INC";}},
        {campo:"ushort", get: function(obj) { return obj.keyword === "ushort" ? "==" : obj.bits && obj.bits !== 1 ? obj.bits < 16 && obj.tipo === 1 || obj.tipo === 4 ? "AUTO" : "EXP" : "INC";}},
        {campo:"int", get: function(obj) { return obj.keyword === "int" ? "==" : obj.bits && obj.bits !== 1 ? obj.bits < 32 ? "AUTO" : "EXP" : "INC";}},
        {campo:"uint", get: function(obj) { return obj.keyword === "uint" ? "==" : obj.bits && obj.bits !== 1 ? obj.bits < 32 && obj.tipo === 1 || obj.tipo === 4 ? "AUTO" : "EXP" : "INC";}},
        {campo:"long", get: function(obj) { return obj.keyword === "long" ? "==" : obj.bits && obj.bits !== 1 ? obj.bits < 64 ? "AUTO" : "EXP" : "INC";}},
        {campo:"ulong", get: function(obj) { return obj.keyword === "ulong" ? "==" : obj.bits && obj.bits !== 1 ? obj.bits < 64 && obj.tipo === 1 || obj.tipo === 4 ? "AUTO" : "EXP" : "INC";}},
        {campo:"float", get: function(obj) { return obj.keyword === "float" ? "==" : obj.bits && obj.bits !== 1 ? obj.bits < 32 ? "AUTO" : "EXP" : "INC";}},
        {campo:"double", get: function(obj) { return obj.keyword === "double" ? "==" : obj.bits && obj.bits !== 1 ? obj.bits < 64 ? "AUTO" : "EXP" : "INC";}},
        {campo:"decimal", get: function(obj) { return obj.keyword === "decimal" ? "==" : obj.bits && obj.bits !== 1 ? obj.bits < 128 ? "AUTO" : "EXP" : "INC"}},
        {campo:"char", get: function(obj) { return obj.keyword === "char" ? "==" : obj.tipo === 0 || obj.tipo === 1 ? "EXP" : "INC"}},
        {campo:"string", get: function() { return "INC"}},
        {campo:"bool", get: function() { return "INC"}},
        {campo:"object", get: function() { return "INC"}}
    ]
})

cargarTabla({idTabla: "tab-tipos-datos", sectJSON: csharp.tiposdatos, campos: [
    {campo:"Declarador", get: function(obj){ return obj["keyword"]}},
    {campo:"Tipo de Dato", get: function(obj){ return csharp.clases.tiposdatos[obj["tipo"]]}},
    {campo:"Uso de Memoria", get: function(obj){ return obj["bits"] ? obj["bits"] + " Bits" : "Variable"}},
    {campo:"Equivalencia", get: function(obj){ return obj["bits"] ? obj["bits"]/8 + " Bytes" : "Variable"}},
    {campo:"Rango<sub>2</sub>", get: function(obj){ return obj.tipo === 1 ? "0 a 2<sup>" + obj.bits + "</sup> - 1" : obj.tipo === 0 
        ? "- 2<sup>" + (obj.bits - 1) + "</sup> a 2<sup>" + (obj.bits - 1) + "</sup> - 1" : obj.tipo === 3 ? "0 a 1" : "No Aplica"; }},
    {campo:"Rango<sub>10</sub>", get: function(obj){ return obj.tipo === 1 ? "0 a " + (Math.pow(2, obj.bits) - 1) : obj.tipo === 0 
        ? - Math.pow(2, obj.bits - 1) + " a " + (Math.pow(2, obj.bits - 1) - 1) : obj.tipo === 3 ? "0 a 1" : "No Aplica"; }}
]});