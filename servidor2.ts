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

const PORTA = 4001;


const servidor = net.createServer((socket) => {
    console.log('Cliente conectado');

    
    const servidor2 = gerarInformacoes();
    
    listaBancadas.bancadasv2.push(servidor2);

    console.log("Dados atualizados:");
    console.log("Servidor 2:");
    console.table(listaBancadas.bancadasv2);

    socket.on('data', (mensagem: Buffer) => {
        const sensor: Sensor = JSON.parse(mensagem.toString());
        const todosResultados = {
            bancada2: calcularResultados(sensor, listaBancadas.bancadasv2),
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
