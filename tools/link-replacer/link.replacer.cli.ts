import * as commandLineArgs from "command-line-args";
import {LinkReplacer} from "./link.replacer";
import {replaceLinkOptions} from "./replace.link.options";
import {ReplaceOption} from "./replace.option";

const options = commandLineArgs(replaceLinkOptions) as Record<ReplaceOption, string>;

const replacer = new LinkReplacer();
replacer.replaceLinkWithOriginal(options.path);
