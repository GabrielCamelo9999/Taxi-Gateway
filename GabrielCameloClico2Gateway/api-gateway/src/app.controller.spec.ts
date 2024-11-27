import { Controller, Post, Body } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller('corrida')
export class AppController {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://rabbitmq:15672'],
                queue: 'corrida_queue',
                queueOptions: {
                    durable: true,
                },
            },
        });
    }

    @Post('registrar')
    async registrarCorrida(@Body() data: any) {
        const response = await this.client.send('registrar_corrida', data).toPromise();
        return response;
    }
}
