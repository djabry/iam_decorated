import {Statement} from "../statement/statement";
import {StatementStore} from "../statement/statement.store";

export function Iam(statement: Statement) {
    StatementStore.statements.push(statement);
    return (target) => target;
}
