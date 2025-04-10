import * as net from 'net';
import {
    Sensor,
    ResultadoBancada,
    gerarBancadas,
    calcularResultados
} from './calculos';

const PORTA = 4002;

const servidor = net.createServer((socket) => {
    console.log('Cliente conectado');

    gerarBancadas();

    socket.on('data', (mensagem: Buffer) => {
        const sensor: Sensor = JSON.parse(mensagem.toString());
        const resultados: ResultadoBancada[] = calcularResultados(sensor);
        socket.write(JSON.stringify(resultados));
        socket.end();
    });

    socket.on('end', () => {
        console.log('Cliente desconectado');
    });
});

servidor.listen(PORTA, () => {
    console.log(`Servidor escutando na porta ${PORTA}`);
});
