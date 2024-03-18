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

    @prop({ required: true, unique: true })
    public code?: number;

    @prop({ required: false, default: 0 })
    totalAmount?: number;

    @prop({ required: true, default: false })
    payed?: boolean;

    @prop({ required: true, ref: () => Person })
    customer?: Ref<Person>;

    @prop({ required: true, ref: () => User })
    cashier?: Ref<User>;

}

const BillModel = getModelForClass(Bill);
export default BillModel;