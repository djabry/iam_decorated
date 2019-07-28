import {attachPermissionsHandler} from "@djabry/iam-decorated-serverless-plugin/attach.permissions.handler";
import {Handler} from "aws-lambda";

export const handler: Handler = attachPermissionsHandler(async () => {
    console.log("Bar handler");
});
