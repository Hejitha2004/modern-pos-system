import React, { useState } from 'react';

const POSPage = () => {
  const [products] = useState([
    { id: 1, name: 'Coffee Latte', price: 5.00, category: 'Beverages', image: '☕', stock: 50 },
    { id: 2, name: 'Chocolate Cake', price: 12.50, category: 'Desserts', image: '🍰', stock: 15 },
    { id: 3, name: 'Caesar Salad', price: 8.75, category: 'Food', image: '🥗', stock: 25 },
    { id: 4, name: 'Burger Deluxe', price: 15.00, category: 'Food', image: '🍔', stock: 30 },
    { id: 5, name: 'Green Tea', price: 3.50, category: 'Beverages', image: '🍵', stock: 40 },
    { id: 6, name: 'Pizza Slice', price: 6.99, category: 'Food', image: '🍕', stock: 20 },
    { id: 7, name: 'Ice Cream', price: 4.25, category: 'Desserts', image: '🍨', stock: 35 },
    { id: 8, name: 'Sandwich', price: 7.50, category: 'Food', image: '🥪', stock: 18 }
  ]);

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const categories = ['All', 'Beverages', 'Food', 'Desserts'];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      }
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      const product = products.find(p => p.id === productId);
      if (newQuantity <= product.stock) {
        setCart(cart.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        ));
      }
    }
  };

  const clearCart = () => {
    setCart([]);
    setCustomerName('');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateTotal() * 0.1; // 10% tax
  };

  const calculateGrandTotal = () => {
    return calculateTotal() + calculateTax();
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    setShowCheckout(true);
  };

  const processPayment = () => {
    // Simulate payment processing
    setOrderComplete(true);
    setTimeout(() => {
      setOrderComplete(false);
      setShowCheckout(false);
      clearCart();
      alert(`Order completed successfully!\nTotal: $${calculateGrandTotal().toFixed(2)}\nPayment: ${paymentMethod.toUpperCase()}`);
    }, 2000);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8fafc'
    }}>
      {/* Left Panel - Products */}
      <div style={{
        flex: 2,
        padding: '20px',
        overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a202c',
            margin: '0 0 10px 0'
          }}>
            🛒 Point of Sale
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#718096',
            margin: 0
          }}>
            Select products to add to cart
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          marginBottom: '20px',
          display: 'flex',
          gap: '15px',
          alignItems: 'center'
        }}>
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              backgroundColor: 'white'
            }}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '2px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-4px)';
                e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                e.target.style.borderColor = '#667eea';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
                e.target.style.borderColor = 'transparent';
              }}
            >
              <div style={{
                fontSize: '40px',
                textAlign: 'center',
                marginBottom: '12px'
              }}>
                {product.image}
              </div>

              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                {product.name}
              </h3>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#10b981'
                }}>
                  ${product.price.toFixed(2)}
                </span>
                
                <span style={{
                  fontSize: '12px',
                  color: product.stock <= 10 ? '#ef4444' : '#64748b',
                  fontWeight: '500'
                }}>
                  Stock: {product.stock}
                </span>
              </div>

              <div style={{
                fontSize: '12px',
                color: '#667eea',
                backgroundColor: '#667eea15',
                padding: '4px 8px',
                borderRadius: '12px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                {product.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Cart */}
      <div style={{
        flex: 1,
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '-4px 0 6px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Cart Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '15px',
          borderBottom: '2px solid #e2e8f0'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1a202c',
            margin: 0
          }}>
            🛍️ Cart ({cart.length})
          </h2>
          
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              style={{
                padding: '8px 12px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          )}
        </div>

        {/* Customer Name */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Customer Name (Optional)"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '20px'
        }}>
          {cart.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#64748b',
              fontSize: '16px',
              marginTop: '50px'
            }}>
              <div style={{ fontSize: '60px', marginBottom: '20px' }}>🛒</div>
              Cart is empty<br />
              Click products to add them
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                marginBottom: '10px'
              }}>
                <div style={{
                  fontSize: '30px',
                  marginRight: '15px'
                }}>
                  {item.image}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: '600',
                    color: '#1a202c',
                    marginBottom: '4px'
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#10b981',
                    fontWeight: '600'
                  }}>
                    ${item.price.toFixed(2)} each
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    -
                  </button>

                  <span style={{
                    minWidth: '30px',
                    textAlign: 'center',
                    fontWeight: '600'
                  }}>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: '30px',
                      height: '30px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      marginLeft: '10px',
                      padding: '6px',
                      backgroundColor: 'transparent',
                      color: '#ef4444',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '18px'
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        {cart.length > 0 && (
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '20px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span>Subtotal:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <span>Tax (10%):</span>
              <span>${calculateTax().toFixed(2)}</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '18px',
              fontWeight: '700',
              color: '#1a202c',
              paddingTop: '8px',
              borderTop: '1px solid #e2e8f0'
            }}>
              <span>Total:</span>
              <span>${calculateGrandTotal().toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          disabled={cart.length === 0}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: cart.length === 0 ? '#e2e8f0' : '#667eea',
            color: cart.length === 0 ? '#9ca3af' : 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (cart.length > 0) {
              e.target.style.backgroundColor = '#5a67d8';
              e.target.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (cart.length > 0) {
              e.target.style.backgroundColor = '#667eea';
              e.target.style.transform = 'translateY(0)';
            }
          }}
        >
          💳 Checkout
        </button>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '20px',
            width: '500px',
            textAlign: 'center'
          }}>
            {orderComplete ? (
              <div>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
                <h2 style={{ color: '#10b981', marginBottom: '10px' }}>Order Complete!</h2>
                <p>Processing payment...</p>
                <div style={{
                  width: '40px',
                  height: '40px',
                  border: '4px solid #e2e8f0',
                  borderTop: '4px solid #667eea',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  margin: '20px auto'
                }}></div>
              </div>
            ) : (
              <div>
                <h2 style={{ marginBottom: '20px' }}>💳 Complete Payment</h2>
                
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '20px'
                }}>
                  <h3>Order Summary</h3>
                  <div style={{ textAlign: 'left' }}>
                    {cart.map(item => (
                      <div key={item.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}>
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <hr />
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: '700',
                      fontSize: '18px'
                    }}>
                      <span>Total:</span>
                      <span>${calculateGrandTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '10px',
                    fontWeight: '600'
                  }}>
                    Payment Method:
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  >
                    <option value="cash">💵 Cash</option>
                    <option value="card">💳 Credit Card</option>
                    <option value="digital">📱 Digital Wallet</option>
                  </select>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '15px'
                }}>
                  <button
                    onClick={() => setShowCheckout(false)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={processPayment}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Pay ${calculateGrandTotal().toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default POSPage;