import {Statement} from "./statement";
import {Policy} from "./policy";
import {defaultPolicyVersion} from "./default.policy.version";

export class PolicyGenerator {
    toPolicies(statements: Statement[]): Policy[] {
        return [{
            Version: defaultPolicyVersion,
            Statement: statements
        }];
    }
}
