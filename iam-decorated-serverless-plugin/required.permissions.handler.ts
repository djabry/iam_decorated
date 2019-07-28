import {StatementStore} from "@djabry/iam-decorated-core/statement/statement.store";
import {Handler} from "aws-lambda";
import {RequiredPermissionsRequest} from "./required.permissions.request";
import {RequiredPermissionsResponse} from "./required.permissions.response";

export const requiredPermissionsHandler: Handler<RequiredPermissionsRequest, RequiredPermissionsResponse> =
    async (event) => {
    return {
        statements: StatementStore.statements,
    };
};
