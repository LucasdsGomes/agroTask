import * as net from 'net';
import * as readline from 'readline';
import { gerarSensor, ResultadoBancada } from './calculos';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite a porta do servidor que deseja se conectar (ex: 4000, 4001, 4002): ', (resposta) => {
    const porta = parseInt(resposta);
    const sensor = gerarSensor();

    const cliente = net.createConnection({ host: '127.0.0.1', port: porta }, () => {
        console.log(`Conectado ao servidor na porta ${porta}`);
        cliente.write(JSON.stringify(sensor));
    });

    cliente.on('data', (data: Buffer) => {
        const resultados = JSON.parse(data.toString());
    
        console.log("Sensor:", sensor);
    
        // Transforma o objeto em um array de pares [chave, valor]
        Object.entries(resultados).forEach(([bancadaNome, bancadaResultados]) => {
            console.log(`\n--- ${bancadaNome} ---`);
            (bancadaResultados as ResultadoBancada[]).forEach((bancada, index) => { //Esse as ResultadoBancada[] é só para o TypeScript entender que aquilo é um array de resultados.
                console.log(`Temperatura -> Média: ${bancada.temperatura.media}, Mediana: ${bancada.temperatura.mediana}`);
                console.log(`Umidade -> Média: ${bancada.umidade.media}, Mediana: ${bancada.umidade.mediana}`);
                console.log(`Condutividade -> Média: ${bancada.condutividade.media}, Mediana: ${bancada.condutividade.mediana}`);
            });
        });
    
        rl.close();
    });
    

    cliente.on('end', () => {
        console.log('Conexão encerrada');
    });

    cliente.on('error', (err) => {
        console.error(`Erro ao conectar: ${err.message}`);
        rl.close();
    });
});
