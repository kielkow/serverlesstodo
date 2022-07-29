import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        return {
            statusCode: 201,
            body: JSON.stringify({
                message: 'Hello World',
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
