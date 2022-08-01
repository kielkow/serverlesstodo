import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from '../utils/dynamodbClient';

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const { user_id } = event.pathParameters;

        const response = await document
            .query({
                TableName: 'users_certificate',
                KeyConditionExpression: "user_id = :user_id",
                ExpressionAttributeValues: {
                    ":user_id": user_id
                }
            })
            .promise();

        const todos = response.Items;

        return {
            statusCode: 200,
            body: JSON.stringify({
                todos
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
