export interface ResponseModel {
    res?: JSON;
    statusCode: number,
    data: Array<any> | Object;
    message: string;
    status: boolean | string;
    sqlMessage?: string;

}