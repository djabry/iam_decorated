import {Policy} from "@djabry/iam-decorated-core/policy/policy";
import {PolicyGenerator} from "@djabry/iam-decorated-core/policy/policy.generator";
import {Statement} from "@djabry/iam-decorated-core/statement/statement";
import * as Lambda from "aws-sdk/clients/lambda";
import * as Serverless from "serverless";
import {Options} from "serverless";
import {CompileOption} from "./compile.option";
import {CompileOptions} from "./compile.options";
import {defaultCompileOptions} from "./default.compile.options";
import {requiredPermissionsId} from "./required.permissions.id";
import {RequiredPermissionsRequest} from "./required.permissions.request";
import {RequiredPermissionsResponse} from "./required.permissions.response";

export class IamPlugin {

    public hooks = {
        "after:deploy:deploy": () => this.compileStatements(),
    };

    private policyGenerator = new PolicyGenerator();

    constructor(private serverless: Serverless,
                private options: Options) {
    }

    public async extractStatementsFromFunction(functionName: string): Promise<Statement[]> {
        const lambda = new Lambda({region: this.serverless.getProvider("aws").getRegion()});
        const request: RequiredPermissionsRequest = {
            requiredPermissionsRequestId: requiredPermissionsId,
        };
        const response = await lambda.invoke({
            FunctionName: functionName,
            Payload: JSON.stringify(request),
        }).promise();

        if (response.FunctionError) {
            this.serverless.cli.log(`Failed to extract permissions from ${functionName}:`);
            this.serverless.cli.log(response.FunctionError);
            return [];
        }

        const statementsResponse = JSON.parse(response.Payload.toString()) as RequiredPermissionsResponse;
        return statementsResponse.statements;
    }

    public toPolicies(statements: Statement[]): Policy[] {
        return this.policyGenerator.toPolicies(statements);
    }

    public getCompileOptions(): CompileOptions {
        const options = (this.serverless.service.custom || {})[CompileOption.Decorated] as CompileOptions;
        return {
            ...defaultCompileOptions,
            ...options,
        };
    }

    public getFunctionsToCompilePermissionsFor(): string[] {
        const config = this.getCompileOptions();
        const allFunctions = this.serverless.service.getAllFunctions();
        return config.appyToAll ? allFunctions : config.functions;
    }

    public async applyPoliciesToFunction(functionName: string, policies: Policy[]) {
        this.serverless.cli.log(`Applying policies to ${functionName}`);
    }

    public async compileStatements() {
        this.serverless.cli.log("Compiling IAM statements...");
        const allFunctions = this.getFunctionsToCompilePermissionsFor();
        if (allFunctions.length) {
            this.serverless.cli.log("Applying permissions to:");
            for (const functionName of allFunctions) {
                this.serverless.cli.log(` - ${functionName}`);
                const statements = await this.extractStatementsFromFunction(functionName);
                this.serverless.cli.log(`Found ${statements.length} statements for ${functionName}`);
                const policies = await this.toPolicies(statements);
                this.serverless.cli.log(`Generated ${policies.length} policies for ${functionName}`);
                await this.applyPoliciesToFunction(functionName, policies);
            }
        }

    }

}
