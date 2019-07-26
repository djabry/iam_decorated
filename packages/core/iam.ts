import {Statement} from "./statement";
import {StatementStore} from "./statement.store";

export function Iam(statement: Statement) {
    StatementStore.statements.push(statement);
}
