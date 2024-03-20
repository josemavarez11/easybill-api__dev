import { Ref, prop, getModelForClass, plugin, modelOptions } from "@typegoose/typegoose";
import { AutoIncrementSimple } from "@typegoose/auto-increment"
import { User } from "./userModel";
import { Person } from "./personModel";

@plugin(AutoIncrementSimple, {
    field: 'code',
    startAt: 1,
    incrementBy: 1
})
@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Bill {

    @prop({ required: true, unique: true, type: Number })
    public code?: number;

    @prop({ required: false, default: 0, type: Number })
    total?: number;

    @prop({ required: true, default: false, type: Number })
    payed?: boolean;

    @prop({ required: true, ref: () => Person, type: () => Person })
    customer?: Ref<Person>;

    @prop({ required: true, ref: () => User, type: () => User })
    cashier?: Ref<User>;

}

const BillModel = getModelForClass(Bill);
export default BillModel;