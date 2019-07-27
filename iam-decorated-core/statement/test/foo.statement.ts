import {Effect} from "../../effect";
import {Statement} from "../statement";

export const fooStatement: Statement = {
    Action: "foo",
    Effect: Effect.Deny,
    Resource: "bar",
};
