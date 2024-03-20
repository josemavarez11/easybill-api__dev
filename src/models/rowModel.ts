import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { Bill } from "./billModel";
import { Product } from "./productModel";

class Row {
    @prop({ required: true, ref: () => Bill, type: () => Bill })
    bill?: Ref<Bill>;

    @prop({ required: true, ref: () => Product, type: () => Product })
    product?: Ref<Product>;
}

const RowModel = getModelForClass(Row);

export default RowModel;