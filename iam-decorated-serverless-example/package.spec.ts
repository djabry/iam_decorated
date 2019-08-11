import {execSync} from "child_process";
import {readdirSync} from "fs";
import {resolve} from "path";

describe("Serverless example", () => {

    it("packages the Serverless application", () => {
        console.log("Listing all files in", resolve(__dirname), "...");
        execSync("sls package", {
           cwd: __dirname, stdio: "inherit",
        });

    });

});
