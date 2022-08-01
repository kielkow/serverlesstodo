import { APIGatewayProxyHandler } from "aws-lambda";
import dayjs from "dayjs";

import { v4 as uuid } from 'uuid';

import { document } from '../utils/dynamodbClient';

interface ICreateTodo {
    id: string;
    user_id: string;
    title: string;
    done: boolean;
    deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const { user_id } = event.pathParameters;
        const { title, deadline } = JSON.parse(event.body);

        const todo = {
            id: uuid(),
            user_id,
            title,
            done: false,
            deadline: dayjs(deadline).format('DD-MM-YYYY')
        } as ICreateTodo

        await document
            .put({
                TableName: 'todos',
                Item: {
                    ...todo,
                    created_at: new Date().getTime(),
                    updated_at: new Date().getTime(),
                }
            })
            .promise();

        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'todo created with sucess',
                event
            })
        }
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: error.message || error,
                stack: error.stack || ''
            })
        }
    }
}
