import {Effect} from "@djabry/iam-decorated-core/effect";
import {Iam} from "@djabry/iam-decorated-core/iam/iam";
import {attachPermissionsHandler} from "@djabry/iam-decorated-serverless-plugin/attach.permissions.handler";
import {Handler} from "aws-lambda";

@Iam({
    Action: "foo",
    Effect: Effect.Allow,
    Resource: "bar",
})
class Foo {
    bar() {
        console.log("bar");
    }
}

export const handler: Handler = attachPermissionsHandler(async () => {
    console.log("Foo handler");
});
