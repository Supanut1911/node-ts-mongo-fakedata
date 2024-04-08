import mongoose, {Schema, Document} from "mongoose"

interface IOrder extends Document {
  customer_data: {
    customerName: string
    tel: string
    email: string
    address: string
    addressCity: string
    addressSubCity: string
    addressProvine: string
    zipcode: string
  },
  express: {
    expressName: string
    expressCost: number,
    trackingNumber: string
  },
  ticket_id: string
  social_network_ref_id: string
  social_user_ref_id: string
  status: string
  created_at: Date
  updated_at: Date
  __v: number,
  bill_ref_id: string
  payment: {
    balance: number
    timestamp: Date
    type: string
  },
  channel: string
  type: string
}

  const orderSchema: Schema = new mongoose.Schema({
    customer_data: {
      customerName: { type: String, required: true},
      tel: { type: String, required: true},
      email: { type: String, required: true},
      address: { type: String, required: true},
      addressCity: { type: String, required: true},
      addressSubCity: { type: String, required: true},
      addressProvine: { type: String, required: true},
      zipcode: { type: String, required: true},
    },
    express: {
      expressName: { type: String, required: true},
      expressCost: { type: Number, required: true},
      trackingNumber: { type: String, required: true},
    },
    ticket_id: { type: String, required: true},
    social_network_ref_id: { type: String, required: true},
    social_user_ref_id: { type: String, required: true},
    status: { type: String, required: true},
    created_at: { type: Date, required: true},
    updated_at: { type: Date, required: true},
    __v: { type: Number, required: true},
    bill_ref_id: { type: String, required: true},
    payment: {
      balance: { type: Number, required: true},
      timestamp: { type: Date, required: true},
      type: { type: String, required: true},
    },
    channel: { type: String, required: true},
    type: { type: String, required: true},
  }, {versionKey: false})

const Order = mongoose.model<IOrder>('Order', orderSchema)

export default Order