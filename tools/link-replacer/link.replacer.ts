import {copyFileSync, lstatSync, realpathSync, unlinkSync} from "fs";

/**
 * Replaces symbolic links with a copy of the original file
 */
export class LinkReplacer {

    public replaceLinkWithOriginal(linkPath: string) {
        const stats = lstatSync(linkPath);
        if (stats.isSymbolicLink()) {
            const originalPath = realpathSync(linkPath);
            unlinkSync(linkPath);
            copyFileSync(originalPath, linkPath);
        }

    }

}
