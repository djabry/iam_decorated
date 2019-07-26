import {Action} from "./action";
import {Resource} from "./resource";
import {Condition} from "./condition/condition";
import {Effect} from "./effect";
import {Principal} from "./principal";

export interface Statement {
    Version?: string;
    Principal?: Principal;
    NotPrincipal?: Principal;
    Sid?: string;
    Effect: Effect;
    Action: Action;
    NotAction?: Action;
    Resource: Resource;
    NotResource?: Resource;
    conditions?: Condition;
}
