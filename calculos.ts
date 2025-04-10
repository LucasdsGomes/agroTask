export interface InterfaceGeral {
    media: number;
    mediana: number;
}

export interface Sensor {
    temperaturaSensor: number;
    umidadeSensor: number;
    condutividadeSensor: number;
}

export interface ResultadoBancada {
    temperatura: InterfaceGeral;
    umidade: InterfaceGeral;
    condutividade: InterfaceGeral;
}

let bancadas: any[] = [];

export const gerarBancadas = () => {
    bancadas = [];
    for (let i = 1; i <= 10; i++) {
        bancadas.push({
            temperatura: parseFloat((Math.random() * 100).toFixed(2)),
            umidade: parseFloat((Math.random() * 100).toFixed(2)),
            condutividade: parseFloat((Math.random() * 100).toFixed(2))
        });
    }
};

export const gerarSensor = (): Sensor => {
    return {
        temperaturaSensor: parseFloat((Math.random() * 100).toFixed(2)),
        umidadeSensor: parseFloat((Math.random() * 100).toFixed(2)),
        condutividadeSensor: parseFloat((Math.random() * 100).toFixed(2))
    };
};

const calcularMedia = (valor1: number, valor2: number): number => {
    return parseFloat(((valor1 + valor2) / 2).toFixed(2));
};

const calcularMediana = (valor1: number, valor2: number): number => {
    return parseFloat(((valor1 + valor2) / 2).toFixed(2)); 
};

export const calcularResultados = (
    sensor: Sensor
): ResultadoBancada[] => {
    return bancadas.map(bancada => ({
        temperatura: {
            media: calcularMedia(bancada.temperatura, sensor.temperaturaSensor),
            mediana: calcularMediana(bancada.temperatura, sensor.temperaturaSensor)
        },
        umidade: {
            media: calcularMedia(bancada.umidade, sensor.umidadeSensor),
            mediana: calcularMediana(bancada.umidade, sensor.umidadeSensor)
        },
        condutividade: {
            media: calcularMedia(bancada.condutividade, sensor.condutividadeSensor),
            mediana: calcularMediana(bancada.condutividade, sensor.condutividadeSensor)
        }
    }));
};
