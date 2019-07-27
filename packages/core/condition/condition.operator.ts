import {DateConditionOperator} from "./date.condition.operator";
import {ArnConditionOperator} from "./arn.condition.operator";
import {BinaryConditionOperator} from "./binary.condition.operator";
import {BooleanConditionOperator} from "./boolean.condition.operator";
import {NullConditionOperator} from "./null.condition.operator";
import {NumericConditionOperator} from "./numeric.condition.operator";
import {StringConditionOperator} from "./string.condition.operator";

export type ConditionOperator = NumericConditionOperator | StringConditionOperator |
    DateConditionOperator | BooleanConditionOperator | BinaryConditionOperator | ArnConditionOperator |
    NullConditionOperator | string;
