import {expect} from "chai";
import {resolve} from "path";
import {StatementExtractor} from "./statement.extractor";
import {fooStatement} from "./test/foo.statement";

describe("Statement extractor", () => {
    let instance: StatementExtractor;

    beforeEach(() => {
        instance = new StatementExtractor();
    });

    it("Extracts some test statements", async () => {
        const fooPath = resolve(__dirname, "test", "foo");
        const statements = await instance.extractStatementsFromPath(fooPath);
        expect(statements).to.deep.equal([fooStatement]);
    });
});
