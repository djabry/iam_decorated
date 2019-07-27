import {Statement} from "../statement/statement";
import {defaultPolicyVersion} from "./default.policy.version";
import {Policy} from "./policy";

export class PolicyGenerator {
    public toPolicies(statements: Statement[]): Policy[] {
        return [{
            Statement: statements,
            Version: defaultPolicyVersion,
        }];
    }
}
