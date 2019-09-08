import {execSync} from "child_process";
execSync("sls info", {cwd: __dirname, stdio: "inherit"});
