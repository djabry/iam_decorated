import {copyFileSync, lstatSync, realpathSync, unlinkSync} from "fs";

export class LinkReplacer {
    replaceLinkWithOriginal(linkPath: string) {
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
