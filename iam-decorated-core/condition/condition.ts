import {ConditionOperator} from "./condition.operator";

export type Condition = Record<ConditionOperator, Record<string, string | string[]>>;
