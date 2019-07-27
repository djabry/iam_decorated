import {Statement} from "./statement";
import {StatementStore} from "./statement.store";

export class StatementExtractor {

    public async extractStatementsFromPath(pathToJavascript: string): Promise<Statement[]> {
        StatementStore.statements = [];
        await import(pathToJavascript);
        return StatementStore.statements;
    }
}
