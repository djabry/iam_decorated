import {expect} from "chai";
import {Effect} from "../effect";
import {StatementStore} from "../statement/statement.store";
import {Iam} from "./iam";

describe("IAM decorator", () => {

    beforeEach(() => {
        StatementStore.statements = [];
    });

    it("Collects a statement via a class annotation", () => {
        const statement = {
            Action: "foo:bar",
            Effect: Effect.Allow,
            Resource: "*",
        };
        @Iam(statement)
        class Foo {
        }
        expect(StatementStore.statements).to.deep.equal([statement]);
    });
});
