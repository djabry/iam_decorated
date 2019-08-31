import {execSync} from "child_process";
import {copyFileSync, lstatSync, readdirSync, realpathSync, unlinkSync} from "fs";
import {resolve} from "path";

describe("Serverless example", () => {

    beforeAll(() => {
        const testDir = resolve(__dirname);
        const files = readdirSync(testDir);
        for (const fileName of files) {
            if (fileName === "serverless.yml") {
                const filePath = resolve(testDir, fileName);
                const stats = lstatSync(filePath);
                if (stats.isSymbolicLink()) {
                    console.log("Found link:", fileName);
                    console.log("Replacing with copy of original...");
                    const originalPath = realpathSync(filePath);
                    console.log("Copying original file to sym-linked destination");
                    console.log(originalPath, "->", filePath);
                    console.log("Deleting", filePath);
                    unlinkSync(filePath);
                    copyFileSync(originalPath, filePath);
                }
            }

        }
    });

    it("packages the Serverless application", () => {
        console.log("Listing all files in", resolve(__dirname), "...");
        execSync("sls info", {
           cwd: __dirname, stdio: "inherit",
        });

    });

    afterAll(() => {
        const testDir = resolve(__dirname);
        const files = readdirSync(testDir);
        for (const fileName of files) {
            if (fileName === "serverless.yml") {
                const filePath = resolve(testDir, fileName);
                const stats = lstatSync(filePath);
                if (stats.isSymbolicLink()) {
                    console.log("Found link:", fileName);
                    console.log("Replacing with copy of original...");
                    const originalPath = realpathSync(filePath);
                    console.log("Copying original file to sym-linked destination");
                    console.log(originalPath, "->", filePath);
                    console.log("Deleting", filePath);
                    unlinkSync(filePath);
                    copyFileSync(originalPath, filePath);
                }
            }

        }
    });

});
