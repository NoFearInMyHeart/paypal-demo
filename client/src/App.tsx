import {useState} from 'react'
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";
import {CLIENT_ID} from "./constants";
import {
    CreateOrderActions,
    CreateOrderData,
    OnApproveActions,
    OnApproveData,
    PayPalButtonsComponentOptions
} from "@paypal/paypal-js/types/components/buttons";

function App() {

    const createOrder: PayPalButtonsComponentOptions["createOrder"] = (data: CreateOrderData,
                                                                       actions: CreateOrderActions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "9.99"
                    }
                }
            ]
        })
    }

    const onApprove: PayPalButtonsComponentOptions["onApprove"] = async (data: OnApproveData,
                                                                   actions: OnApproveActions) => {
        const orderData = await actions.order?.capture();
        console.log('orderData', orderData);

        if (orderData?.purchase_units[0].payments.captures[0].status === "COMPLETED") {
            alert("支付成功")
        }
    }

    const onError: PayPalButtonsComponentOptions["onError"] = (err: Record<string, unknown>) => {
        console.log("onError", err);
        alert("支付失败")
    }

    return (
        <div className="App">
            <PayPalScriptProvider options={{"client-id": CLIENT_ID}}>
                <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                    style={{layout: "vertical"}}/>
            </PayPalScriptProvider>
        </div>
    )
}

export default App
