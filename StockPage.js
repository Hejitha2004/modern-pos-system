import React, { useState } from 'react';

const StockPage = () => {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Coffee Latte', category: 'Beverages', currentStock: 45, minStock: 20, maxStock: 100, price: 5.00, lastRestocked: '2024-01-15', supplier: 'Bean Co.', image: '☕' },
    { id: 2, name: 'Chocolate Cake', category: 'Desserts', currentStock: 8, minStock: 10, maxStock: 50, price: 12.50, lastRestocked: '2024-01-14', supplier: 'Sweet Treats', image: '🍰' },
    { id: 3, name: 'Caesar Salad', category: 'Food', currentStock: 25, minStock: 15, maxStock: 60, price: 8.75, lastRestocked: '2024-01-16', supplier: 'Fresh Foods', image: '🥗' },
    { id: 4, name: 'Burger Deluxe', category: 'Food', currentStock: 30, minStock: 20, maxStock: 80, price: 15.00, lastRestocked: '2024-01-15', supplier: 'Meat Masters', image: '🍔' },
    { id: 5, name: 'Green Tea', category: 'Beverages', currentStock: 5, minStock: 15, maxStock: 100, price: 3.50, lastRestocked: '2024-01-10', supplier: 'Tea World', image: '🍵' },
    { id: 6, name: 'Pizza Slice', category: 'Food', currentStock: 20, minStock: 25, maxStock: 75, price: 6.99, lastRestocked: '2024-01-16', supplier: 'Italian Kitchen', image: '🍕' },
    { id: 7, name: 'Ice Cream', category: 'Desserts', currentStock: 35, minStock: 20, maxStock: 60, price: 4.25, lastRestocked: '2024-01-15', supplier: 'Cold Treats', image: '🍨' },
    { id: 8, name: 'Sandwich', category: 'Food', currentStock: 2, minStock: 10, maxStock: 40, price: 7.50, lastRestocked: '2024-01-12', supplier: 'Deli Express', image: '🥪' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRestockForm, setShowRestockForm] = useState(false);
  const [restockingItem, setRestockingItem] = useState(null);
  const [restockQuantity, setRestockQuantity] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const categories = ['All', 'Beverages', 'Food', 'Desserts'];
  const statusOptions = ['All', 'Critical', 'Low Stock', 'Normal', 'Overstock'];

  const getStockStatus = (item) => {
    if (item.currentStock <= 5) return 'Critical';
    if (item.currentStock < item.minStock) return 'Low Stock';
    if (item.currentStock > item.maxStock) return 'Overstock';
    return 'Normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Critical': return '#ef4444';
      case 'Low Stock': return '#f59e0b';
      case 'Overstock': return '#3b82f6';
      case 'Normal': return '#10b981';
      default: return '#64748b';
    }
  };

  const getStockPercentage = (item) => {
    return Math.min((item.currentStock / item.maxStock) * 100, 100);
  };

  const handleRestock = (item) => {
    setRestockingItem(item);
    setRestockQuantity('');
    setShowRestockForm(true);
  };

  const processRestock = () => {
    if (restockingItem && restockQuantity && parseInt(restockQuantity) > 0) {
      const newQuantity = restockingItem.currentStock + parseInt(restockQuantity);
      setInventory(inventory.map(item =>
        item.id === restockingItem.id
          ? {
              ...item,
              currentStock: newQuantity,
              lastRestocked: new Date().toISOString().split('T')[0]
            }
          : item
      ));
      setShowRestockForm(false);
      setRestockingItem(null);
      setRestockQuantity('');
    }
  };

  const filteredAndSortedInventory = inventory
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const itemStatus = getStockStatus(item);
      const matchesStatus = selectedStatus === 'All' || itemStatus === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'stock':
          aValue = a.currentStock;
          bValue = b.currentStock;
          break;
        case 'status':
          aValue = getStockStatus(a);
          bValue = getStockStatus(b);
          break;
        case 'category':
          aValue = a.category;
          bValue = b.category;
          break;
        case 'lastRestocked':
          aValue = new Date(a.lastRestocked);
          bValue = new Date(b.lastRestocked);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const stockStats = {
    total: inventory.length,
    critical: inventory.filter(item => getStockStatus(item) === 'Critical').length,
    lowStock: inventory.filter(item => getStockStatus(item) === 'Low Stock').length,
    normal: inventory.filter(item => getStockStatus(item) === 'Normal').length,
    overstock: inventory.filter(item => getStockStatus(item) === 'Overstock').length,
    totalValue: inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0)
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
            📈 Stock Management
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#718096',
            margin: 0
          }}>
            Monitor and manage your inventory levels
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <button
            onClick={() => alert('Stock Report Generated! 📊')}
            style={{
              padding: '12px 20px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            📊 Generate Report
          </button>

          <button
            onClick={() => alert('Bulk Restock Feature Coming Soon! 📦')}
            style={{
              padding: '12px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#5a67d8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
          >
            📦 Bulk Restock
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>📦</div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '5px'
          }}>
            {stockStats.total}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b'
          }}>
            Total Items
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>🚨</div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#ef4444',
            marginBottom: '5px'
          }}>
            {stockStats.critical}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b'
          }}>
            Critical Stock
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>⚠️</div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#f59e0b',
            marginBottom: '5px'
          }}>
            {stockStats.lowStock}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b'
          }}>
            Low Stock
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>✅</div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#10b981',
            marginBottom: '5px'
          }}>
            {stockStats.normal}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b'
          }}>
            Normal Stock
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>💰</div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#667eea',
            marginBottom: '5px'
          }}>
            ${stockStats.totalValue.toLocaleString()}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b'
          }}>
            Total Value
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        marginBottom: '20px',
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <input
          type="text"
          placeholder="🔍 Search items or suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 250px',
            padding: '12px',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '16px',
            outline: 'none'
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '12px',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            backgroundColor: 'white'
          }}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{
            padding: '12px',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            backgroundColor: 'white'
          }}
        >
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            setSortBy(field);
            setSortOrder(order);
          }}
          style={{
            padding: '12px',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            backgroundColor: 'white'
          }}
        >
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="stock-asc">Stock Low-High</option>
          <option value="stock-desc">Stock High-Low</option>
          <option value="status-asc">Status</option>
          <option value="lastRestocked-desc">Recently Restocked</option>
        </select>
      </div>

      {/* Inventory Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        overflow: 'hidden'
      }}>
        <div style={{
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f8fafc',
                borderBottom: '2px solid #e2e8f0'
              }}>
                <th style={{ padding: '20px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Item</th>
                <th style={{ padding: '20px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Category</th>
                <th style={{ padding: '20px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Current Stock</th>
                <th style={{ padding: '20px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Status</th>
                <th style={{ padding: '20px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Min/Max</th>
                <th style={{ padding: '20px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Value</th>
                <th style={{ padding: '20px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Last Restocked</th>
                <th style={{ padding: '20px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedInventory.map((item, index) => {
                const status = getStockStatus(item);
                const statusColor = getStatusColor(status);
                const stockPercentage = getStockPercentage(item);
                
                return (
                  <tr key={item.id} style={{
                    borderBottom: '1px solid #e2e8f0',
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafbfc'
                  }}>
                    <td style={{ padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '24px' }}>{item.image}</div>
                        <div>
                          <div style={{
                            fontWeight: '600',
                            color: '#1a202c',
                            marginBottom: '4px'
                          }}>
                            {item.name}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: '#64748b'
                          }}>
                            {item.supplier}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td style={{ padding: '20px' }}>
                      <span style={{
                        padding: '4px 12px',
                        backgroundColor: '#667eea15',
                        color: '#667eea',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {item.category}
                      </span>
                    </td>
                    
                    <td style={{ padding: '20px' }}>
                      <div>
                        <div style={{
                          fontWeight: '700',
                          fontSize: '18px',
                          color: '#1a202c',
                          marginBottom: '4px'
                        }}>
                          {item.currentStock}
                        </div>
                        <div style={{
                          width: '60px',
                          height: '4px',
                          backgroundColor: '#e2e8f0',
                          borderRadius: '2px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${stockPercentage}%`,
                            height: '100%',
                            backgroundColor: statusColor
                          }}></div>
                        </div>
                      </div>
                    </td>
                    
                    <td style={{ padding: '20px' }}>
                      <span style={{
                        padding: '6px 12px',
                        backgroundColor: statusColor + '15',
                        color: statusColor,
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {status}
                      </span>
                    </td>
                    
                    <td style={{ padding: '20px' }}>
                      <div style={{
                        fontSize: '14px',
                        color: '#64748b'
                      }}>
                        {item.minStock} - {item.maxStock}
                      </div>
                    </td>
                    
                    <td style={{ padding: '20px' }}>
                      <div style={{
                        fontWeight: '600',
                        color: '#10b981'
                      }}>
                        ${(item.currentStock * item.price).toLocaleString()}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#64748b'
                      }}>
                        ${item.price} each
                      </div>
                    </td>
                    
                    <td style={{ padding: '20px' }}>
                      <div style={{
                        fontSize: '14px',
                        color: '#64748b'
                      }}>
                        {new Date(item.lastRestocked).toLocaleDateString()}
                      </div>
                    </td>
                    
                    <td style={{ padding: '20px' }}>
                      <button
                        onClick={() => handleRestock(item)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#5a67d8'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#667eea'}
                      >
                        📦 Restock
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Modal */}
      {showRestockForm && restockingItem && (
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
            width: '450px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1a202c',
              marginBottom: '10px'
            }}>
              📦 Restock Item
            </h2>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
              marginBottom: '25px'
            }}>
              <div style={{ fontSize: '30px' }}>{restockingItem.image}</div>
              <div>
                <div style={{
                  fontWeight: '600',
                  fontSize: '18px',
                  color: '#1a202c'
                }}>
                  {restockingItem.name}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b'
                }}>
                  Current Stock: {restockingItem.currentStock}
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '25px', textAlign: 'left' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Quantity to Add
              </label>
              <input
                type="number"
                value={restockQuantity}
                onChange={(e) => setRestockQuantity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  textAlign: 'center',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter quantity"
                min="1"
              />
              
              {restockQuantity && (
                <div style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#0369a1'
                }}>
                  New Stock Level: {restockingItem.currentStock + parseInt(restockQuantity || 0)}
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              gap: '15px'
            }}>
              <button
                onClick={() => {
                  setShowRestockForm(false);
                  setRestockingItem(null);
                  setRestockQuantity('');
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
                onClick={processRestock}
                disabled={!restockQuantity || parseInt(restockQuantity) <= 0}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: !restockQuantity || parseInt(restockQuantity) <= 0 ? '#9ca3af' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: !restockQuantity || parseInt(restockQuantity) <= 0 ? 'not-allowed' : 'pointer'
                }}
              >
                Confirm Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPage;