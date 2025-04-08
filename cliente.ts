import {
    gerarBancadas,
    gerarSensor,
    calcularResultados,
    ResultadoBancada
} from "./servidor";

gerarBancadas();
const sensor = gerarSensor();
const resultados: ResultadoBancada[] = calcularResultados(sensor);

console.log("Sensor aleatório:", sensor);

resultados.forEach((bancada, index) => {
    console.log(`\n--- Bancada ${index + 1} ---`);
    console.log(`Temperatura   -> Média: ${bancada.temperatura.media}, Mediana: ${bancada.temperatura.mediana}`);
    console.log(`Umidade       -> Média: ${bancada.umidade.media}, Mediana: ${bancada.umidade.mediana}`);
    console.log(`Condutividade -> Média: ${bancada.condutividade.media}, Mediana: ${bancada.condutividade.mediana}`);
})

// valoresResultantesBancadas.forEach((bancada, index) => {
//     console.log(`\n--- Bancada ${index + 1} ---`);
//     console.log(`Temperatura -> Média: ${bancada.temperatura.media}, Mediana: ${bancada.temperatura.mediana}`);
//     console.log(`Umidade     -> Média: ${bancada.umidade.media}, Mediana: ${bancada.umidade.mediana}`);
//     console.log(`Condutividade -> Média: ${bancada.condutividade.media}, Mediana: ${bancada.condutividade.mediana}`);
// });

//console.table(valoresResultantesBancadas)



