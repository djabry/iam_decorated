import {PrincipalType} from "./principal.type";

export type Principal = Partial<Record<PrincipalType, string | Record<string, string>>> | string;
