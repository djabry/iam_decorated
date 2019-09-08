import {existsSync} from "fs";
import {resolve} from "path";
import {LinkReplacer} from "./link.replacer";
import {ServerlessConfigFile} from "./serverless.config.file";

const linkReplacer = new LinkReplacer();
const currentDir = process.cwd();
const bazelTarget = process.env.BAZEL_TARGET;
const ruleDir = bazelTarget.split(":").shift().replace("//", "");
const folderPath = resolve(currentDir, ruleDir);
for (const fileName of Object.values(ServerlessConfigFile)) {
    const filePath = resolve(folderPath, fileName);
    if (existsSync(filePath)) {
        console.log("Attempting to replace", filePath, "with original file");
        linkReplacer.replaceLinkWithOriginal(filePath);
    }
}
