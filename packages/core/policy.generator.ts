import {defaultPolicyVersion} from "./default.policy.version";
import {Policy} from "./policy";
import {Statement} from "./statement";

export class PolicyGenerator {
    public toPolicies(statements: Statement[]): Policy[] {
        return [{
            Statement: statements,
            Version: defaultPolicyVersion,
        }];
    }
}
