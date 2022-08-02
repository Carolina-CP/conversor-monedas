
const apiUrl = "https://api.gael.cloud/general/public/monedas";
const botonConvertir = document.querySelector("#convertir")
   
async function getDatos(){
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



botonConvertir.addEventListener('click',function(convertir){
    console.log("Hice click")
    const moneda = document.querySelector("#monedas");
    console.log(moneda.value)
    const conversor = document.querySelector("#conversion");
    console.log(conversor.value)
    const valor = document.querySelector("#valor");
    
    let valorConvertido = parseFloat(valor.value) / parseFloat(moneda.value);

    
    conversor.value = valorConvertido.toLocaleString();
    
});


