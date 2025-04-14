import * as net from 'net';
import {
    Sensor,
    calcularResultados,
    ListaBancadas,
    DadosBancada
} from './calculos';

const listaBancadas: ListaBancadas = {
    bancadasv1: [],
    bancadasv2: [],
    bancadasv3: []
};

const gerarInformacoes = (): DadosBancada => {
    return {
        temperatura: parseFloat((Math.random() * 100).toFixed(2)),
        umidade: parseFloat((Math.random() * 100).toFixed(2)),
        condutividade: parseFloat((Math.random() * 100).toFixed(2))
    };
};

const PORTA = 4000;


const servidor = net.createServer((socket) => {
    console.log('Cliente conectado');

    const servidor1 = gerarInformacoes();
    const servidor2 = gerarInformacoes();
    const servidor3 = gerarInformacoes();

    listaBancadas.bancadasv1.push(servidor1);
    listaBancadas.bancadasv2.push(servidor2);
    listaBancadas.bancadasv3.push(servidor3);

    console.log("Dados atualizados:");
    console.log("Servidor 1:");
    console.table(listaBancadas.bancadasv1);

    console.log("Servidor 2:");
    console.table(listaBancadas.bancadasv2);

    console.log("Servidor 3:");
    console.table(listaBancadas.bancadasv3);


    socket.on('data', (mensagem: Buffer) => {
        const sensor: Sensor = JSON.parse(mensagem.toString());
        const todosResultados = {
            bancada1: calcularResultados(sensor, listaBancadas.bancadasv1),
            bancada2: calcularResultados(sensor, listaBancadas.bancadasv2),
            bancada3: calcularResultados(sensor, listaBancadas.bancadasv3)
        };
        socket.write(JSON.stringify(todosResultados));
        socket.end();
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');
    });
});

servidor.listen(PORTA, () => {
    console.log(`Servidor escutando na porta ${PORTA}`);
});
