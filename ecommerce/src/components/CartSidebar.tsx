import { X } from "lucide-react";
import { Button } from "./ui/Button";
import { useNavigate } from "react-router-dom";

export const CartSidebar = ({ products, cart, onClose }: any) => {
  const navigate = useNavigate();
  const cartItems = products?.filter((p: any) => cart[p?.id]);

  const total = cartItems.reduce((sum: any, product: any) => {
    const quantity = cart[product.id];
    return sum + (product.price ?? 0) * quantity;
  }, 0);

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((product: any) => (
              <li key={product.id} className="flex items-center gap-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-16 h-16 rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-sm text-gray-500">
                    {cart[product.id]} × ${product.price?.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    cartItems: cartItems,
                    cartQuantities: cart,
                  },
                })
              }
            >
              Go to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
