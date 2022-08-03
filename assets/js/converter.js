
const apiUrl = "https://api.gael.cloud/general/public/monedas";
const botonConvertir = document.querySelector("#convertir")

async function getDatos() {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
    const e = document.querySelector("#monedas");
    let html = "";

    for (let moneda of data) {
        html += `
        <option value="${moneda.Valor}">${moneda.Nombre} </option>
        `;
    };
    e.innerHTML = html;
}

getDatos()



botonConvertir.addEventListener('click', function (convertir) {
    console.log("Hice click")
    const moneda = document.querySelector("#monedas");
    console.log(moneda.value)
    const conversor = document.querySelector("#conversion");
    console.log(conversor.value)
    const valor = document.querySelector("#valor");

    let valorConvertido = parseFloat(valor.value) / parseFloat(moneda.value);


    conversor.value = valorConvertido.toLocaleString();

});


let speed

async function getMonedas() {
    const endpoint = apiUrl;
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}

function prepararConfiguracionParaLaGrafica(monedas) {
    // Creamos las variables necesarias para el objeto de configuración
    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = monedas.map((moneda) => moneda.Codigo);
    const titulo = "Monedas";
    const colorDeLinea = "red";
    const valores = monedas.map((moneda) => {
        const valor = moneda.Valor.replace(",", ".");
        return Number(valor);
    });

    // Creamos el objeto de configuración usando las variables anteriores
    const config = {
        type: tipoDeGrafica,
        data: {
            labels: nombresDeLasMonedas,
            datasets: [
                {
                    label: titulo,
                    backgroundColor: colorDeLinea,
                    data: valores
                }
            ]
        }
    };
    return config;
}

async function renderGrafica() {
    const monedas = await getMonedas();
    const config = prepararConfiguracionParaLaGrafica(monedas);
    const chartDOM = document.getElementById("myChart");
    new Chart(chartDOM, config);
}
renderGrafica();