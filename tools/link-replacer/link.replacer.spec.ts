import {expect} from "chai";
import {lstatSync, readFileSync, symlinkSync, unlinkSync, writeFileSync} from "fs";
import {tmpdir} from "os";
import {resolve} from "path";
import {LinkReplacer} from "./link.replacer";

describe("Symlink replacer", () => {

    let instance: LinkReplacer;
    let fileContent: string;
    let originalFilePath: string;
    let linkPath: string;

    beforeEach(() => {
        instance = new LinkReplacer();
    });

    beforeEach(() => {
        const timestamp = new Date().getTime();
        fileContent = "foo";
        originalFilePath = resolve(tmpdir(), `${timestamp}.test.txt`);
        writeFileSync(originalFilePath, fileContent);
        linkPath = resolve(tmpdir(), `${timestamp}.link.txt`);
        symlinkSync(originalFilePath, linkPath);
    });

    it("Replaces a link with a copy of the original file", () => {
        instance.replaceLinkWithOriginal(linkPath);
        const fileInfo = lstatSync(linkPath);
        expect(fileInfo.isFile()).to.equal(true, "Should have replaced the link with the file");
        const writtenContent = readFileSync(linkPath).toString();
        expect(writtenContent).to.equal(fileContent, "Didn't copy the original file correctly");
    });

    it("Doesn't replace a file if it's not a symlink", () => {
        const newFileContent = "bar";
        writeFileSync(linkPath, newFileContent);
        instance.replaceLinkWithOriginal(linkPath);
        const writtenContent = readFileSync(linkPath).toString();
        expect(writtenContent).to.equal(newFileContent, "Shouldn't have overwritten a file");
    });

    afterEach(() => {
        unlinkSync(originalFilePath);
        unlinkSync(linkPath);
    });

});
