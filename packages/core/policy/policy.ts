import {Statement} from "../statement/statement";

export interface Policy {
    Version: string;
    Statement: Statement[];
}
