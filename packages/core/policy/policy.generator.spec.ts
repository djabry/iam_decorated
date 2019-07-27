import {expect} from "chai";
import {Effect} from "../effect";
import {Statement} from "../statement/statement";
import {PolicyGenerator} from "./policy.generator";

describe("Policy generator", () => {
    let instance: PolicyGenerator;

    beforeEach(() => {
        instance = new PolicyGenerator();
    });

    it("Constructs a policy object that includes all the input statements", () => {
        const statements: Statement[] = [
            {
                Action: "foo",
                Effect: Effect.Allow,
                Resource: "bar",
            },
            {
                Action: "bar",
                Effect: Effect.Allow,
                Resource: "baz",
            },
        ];
        const policies = instance.toPolicies(statements);
        const firstPolicy = policies.shift();
        expect(firstPolicy.Statement).to.deep.equal(statements);
    });
});
