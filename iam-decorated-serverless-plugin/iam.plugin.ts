import {Policy} from "@djabry/iam-decorated-core/policy/policy";
import {PolicyGenerator} from "@djabry/iam-decorated-core/policy/policy.generator";
import {Statement} from "@djabry/iam-decorated-core/statement/statement";
import {StatementExtractor} from "@djabry/iam-decorated-core/statement/statement.extractor";
import {join} from "path";
import * as Serverless from "serverless";
import {FunctionDefinition, Options} from "serverless";

export class IamPlugin {

    public hooks = {
        "package:createDeploymentArtifacts": () => this.compileStatements(),
    };

    private policyGenerator = new PolicyGenerator();

    constructor(private serverless: Serverless,
                private options: Options) {
    }

    public toFilePath(functionDefinition: FunctionDefinition): string {
        return join(this.serverless.config.servicePath, functionDefinition.package.artifact);
    }

    public async extractStatementsFromFunction(functionDefinition: FunctionDefinition): Promise<Statement[]> {
        const statementExtractor = new StatementExtractor();
        const sourcePath = this.toFilePath(functionDefinition);
        return statementExtractor.extractStatementsFromPath(sourcePath);
    }

    public toPolicies(statements: Statement[]): Policy[] {
        return this.policyGenerator.toPolicies(statements);
    }

    public async compileStatements() {
        const functionDefinitionsWithArtifacts = this.serverless.service.getAllFunctionsNames()
            .map((functionName) => this.serverless.service.getFunction(functionName))
            .filter((functionDef) => !!functionDef.package.artifact);

        for (const functionDefinition of functionDefinitionsWithArtifacts) {
            const statements = await this.extractStatementsFromFunction(functionDefinition);
            const policies = await this.toPolicies(statements);
        }
    }

}
