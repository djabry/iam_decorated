import {Handler} from "aws-lambda";
import {requiredPermissionsHandler} from "./required.permissions.handler";
import {requiredPermissionsId} from "./required.permissions.id";
import {RequiredPermissionsRequest} from "./required.permissions.request";
import {RequiredPermissionsResponse} from "./required.permissions.response";

function isRequestPermissionsRequest(event): boolean {
    return event && (event as RequiredPermissionsRequest).requiredPermissionsRequestId === requiredPermissionsId;
}

export function attachPermissionsHandler<I = any, O = any>(originalHandler: Handler<I, O>):
    Handler<I | RequiredPermissionsRequest, O | RequiredPermissionsResponse> {
    return (event: I | RequiredPermissionsRequest, context, callback) => {
        if (isRequestPermissionsRequest(event)) {
            return requiredPermissionsHandler(event as RequiredPermissionsRequest, context, callback);
        }
        return originalHandler(event as I, context, callback);
    };
}
