import {Statement} from "./statement";

export interface Policy {
    Version: string;
    Statement: Statement[];
}
