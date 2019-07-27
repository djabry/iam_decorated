import {Iam} from "../../iam/iam";
import {fooStatement} from "./foo.statement";

@Iam(fooStatement)
export class Foo {

}
