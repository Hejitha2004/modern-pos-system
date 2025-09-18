import React, { useState } from 'react';

const ItemsPage = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Coffee Latte', category: 'Beverages', price: 5.00, stock: 50, image: '☕' },
    { id: 2, name: 'Chocolate Cake', category: 'Desserts', price: 12.50, stock: 15, image: '🍰' },
    { id: 3, name: 'Caesar Salad', category: 'Food', price: 8.75, stock: 25, image: '🥗' },
    { id: 4, name: 'Burger Deluxe', category: 'Food', price: 15.00, stock: 30, image: '🍔' },
    { id: 5, name: 'Green Tea', category: 'Beverages', price: 3.50, stock: 40, image: '🍵' },
    { id: 6, name: 'Pizza Slice', category: 'Food', price: 6.99, stock: 20, image: '🍕' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    image: '📦'
  });

  const categories = ['All', 'Beverages', 'Food', 'Desserts', 'Snacks'];
  const itemEmojis = ['☕', '🍰', '🥗', '🍔', '🍵', '🍕', '🥪', '🍪', '🧃', '🍎', '📦'];

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.name && newItem.category && newItem.price && newItem.stock) {
      const item = {
        id: items.length + 1,
        name: newItem.name,
        category: newItem.category,
        price: parseFloat(newItem.price),
        stock: parseInt(newItem.stock),
        image: newItem.image
      };
      setItems([...items, item]);
      setNewItem({ name: '', category: '', price: '', stock: '', image: '📦' });
      setShowAddForm(false);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item.id);
    setNewItem({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      stock: item.stock.toString(),
      image: item.image
    });
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    const updatedItems = items.map(item => 
      item.id === editingItem 
        ? {
            ...item,
            name: newItem.name,
            category: newItem.category,
            price: parseFloat(newItem.price),
            stock: parseInt(newItem.stock),
            image: newItem.image
          }
        : item
    );
    setItems(updatedItems);
    setEditingItem(null);
    setNewItem({ name: '', category: '', price: '', stock: '', image: '📦' });
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStockColor = (stock) => {
    if (stock <= 10) return '#ef4444';
    if (stock <= 25) return '#f59e0b';
    return '#10b981';
  };

  const getStockLabel = (stock) => {
    if (stock <= 10) return 'Low Stock';
    if (stock <= 25) return 'Medium Stock';
    return 'In Stock';
  };

  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1a202c',
            margin: '0 0 10px 0'
          }}>
            📦 Items Management
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#718096',
            margin: 0
          }}>
            Manage your store inventory and product catalog
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#5a67d8';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#667eea';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          ➕ Add New Item
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        marginBottom: '20px',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <input
            type="text"
            placeholder="🔍 Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '12px 16px',
            border: '2px solid #e2e8f0',
            borderRadius: '10px',
            fontSize: '16px',
            outline: 'none',
            backgroundColor: 'white',
            cursor: 'pointer'
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <div style={{
          backgroundColor: '#f7fafc',
          padding: '12px 16px',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          color: '#4a5568'
        }}>
          {filteredItems.length} Items
        </div>
      </div>

      {/* Items Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {filteredItems.map((item) => (
          <div key={item.id} style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.closest('div').style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.closest('div').style.transform = 'translateY(0)'}
          >
            {/* Item Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              <div style={{
                fontSize: '40px',
                padding: '12px',
                backgroundColor: '#f7fafc',
                borderRadius: '12px'
              }}>
                {item.image}
              </div>
              
              <div style={{
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '20px',
                backgroundColor: getStockColor(item.stock) + '15',
                color: getStockColor(item.stock),
                fontWeight: '600'
              }}>
                {getStockLabel(item.stock)}
              </div>
            </div>

            {/* Item Info */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '8px'
              }}>
                {item.name}
              </h3>
              
              <div style={{
                fontSize: '14px',
                color: '#64748b',
                marginBottom: '12px'
              }}>
                {item.category}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#10b981'
                }}>
                  ${item.price.toFixed(2)}
                </div>
                
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#4a5568'
                }}>
                  Stock: {item.stock}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
              <button
                onClick={() => handleEditItem(item)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                ✏️ Edit
              </button>
              
              <button
                onClick={() => handleDeleteItem(item.id)}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#dc2626'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#ef4444'}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingItem) && (
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
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1a202c',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {editingItem ? '✏️ Edit Item' : '➕ Add New Item'}
            </h2>

            <form onSubmit={editingItem ? handleUpdateItem : handleAddItem}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Item Name
                </label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                  placeholder="Enter item name"
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Category
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                  required
                >
                  <option value="">Select category</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={newItem.stock}
                    onChange={(e) => setNewItem({...newItem, stock: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                    placeholder="0"
                    required
                  />
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Item Icon
                </label>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  {itemEmojis.map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewItem({...newItem, image: emoji})}
                      style={{
                        padding: '10px',
                        border: newItem.image === emoji ? '2px solid #667eea' : '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '20px',
                        cursor: 'pointer',
                        backgroundColor: newItem.image === emoji ? '#667eea20' : 'white'
                      }}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '15px'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                    setNewItem({ name: '', category: '', price: '', stock: '', image: '📦' });
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsPage;