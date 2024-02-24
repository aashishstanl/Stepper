import "./App.css";
import CheckoutStepper from "./components/stepper";

const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Please provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your Shipping Address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete your payment via any mode.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div>Your order has been delivered.</div>,
  },
];

function App() {
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Checkout</h1>

        <CheckoutStepper stepsConfig={CHECKOUT_STEPS}></CheckoutStepper>
      </div>
    </>
  );
}

export default App;
