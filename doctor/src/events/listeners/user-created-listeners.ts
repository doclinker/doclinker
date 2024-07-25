import { Message } from "amqplib";

import { Subjects } from "../../../../common/src";
import {Listener} from "../../../../common/src/events/base-listener"
import {UserCreatedEvent} from "../../../../common/src/events/user-created-event"
import { User } from "../../models/user";
import { AMQP_EXCHANGE, AMQP_QUEUE } from "../../constants";



export class UserCreatedListener extends Listener<UserCreatedEvent> {

    exchange: string = AMQP_EXCHANGE
    routingKey: Subjects.UserCreated = Subjects.UserCreated;
    queue: string = `${AMQP_QUEUE}:${this.routingKey}`;

    async onMessage(data: UserCreatedEvent["data"], msg: Message): Promise<void> {

        try {
            const role = data.role;
            if(role == "doctor"){
                const {id, email, dob, gender, fullName, phoneNumber} = data;
                const user = User.build({
                    id,
                    email,
                    dob,                   
                    gender,
                    fullName,
                    phoneNumber,
                })
                await user.save()
            }  

            this.channel.ack(msg);

        } catch (error) {

            this.channel.nack(msg);
            
        }
        
    }


    
}
