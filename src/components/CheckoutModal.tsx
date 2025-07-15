import React from 'react';
import { toast } from 'react-toastify';

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  category?: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
}

const wallets = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    address: 'bc1qexamplebtcaddress1234567890',
    logo: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#F7931A"/><path d="M18.5 13.5c.5-1.5-1-2.5-2.5-2.5h-2v2h2c.5 0 1 .5.5 1s-1.5.5-2.5.5v2c1 0 2 .5 2.5 1s0 1.5-.5 1.5h-2v2h2c1.5 0 3-1 3.5-2.5.5-1.5-.5-2.5-1.5-3z" fill="#fff"/></svg>
    ),
  },
  {
    name: 'Tether (USDT)',
    symbol: 'USDT',
    address: 'TUSDTexampleaddress1234567890',
    logo: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#26A17B"/><path d="M22 10.5h-4.25V8h-3.5v2.5H10v2h4.25v7.5h3.5v-7.5H22v-2z" fill="#fff"/></svg>
    ),
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    address: '0xExampleEthAddress1234567890',
    logo: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#627EEA"/><path d="M16 7l-6 10 6 3 6-3-6-10zm0 13.5l-6-3.5 6 8 6-8-6 3.5z" fill="#fff"/></svg>
    ),
  },
];

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cartItems, total }) => {
  if (!isOpen) return null;

  const handlePaid = () => {
    toast.info('Pending Order, awaiting approval');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Checkout Invoice</h2>
        <div className="divide-y divide-gray-200 mb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center py-3">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
              <div className="flex-1">
                <div className="font-semibold">{item.title}</div>
                <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
              </div>
              <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-lg">Total:</span>
          <span className="text-amber-600 font-bold text-lg">${total.toFixed(2)}</span>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Send Payment To:</h3>
          <div className="space-y-3">
            {wallets.map((wallet) => (
              <div key={wallet.symbol} className="flex items-center space-x-2 bg-gray-50 rounded p-2">
                {wallet.logo}
                <span className="font-medium">{wallet.symbol}</span>
                <span className="truncate text-xs bg-gray-200 px-2 py-1 rounded select-all">{wallet.address}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-gray-500 text-center mt-4">
          Please send the exact amount and include your order details in the transaction note.
        </div>
        <button
          className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-colors"
          onClick={handlePaid}
        >
          I have paid
        </button>
      </div>
    </div>
  );
};

export default CheckoutModal; 