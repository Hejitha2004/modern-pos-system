import React, { useState, useEffect } from 'react';

const DashboardPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Dummy data for the dashboard
  const stats = [
    { 
      title: 'Today\'s Sales', 
      value: '$2,847', 
      icon: '💰', 
      color: '#4CAF50',
      change: '+12.5%'
    },
    { 
      title: 'Orders', 
      value: '156', 
      icon: '📋', 
      color: '#2196F3',
      change: '+8.2%'
    },
    { 
      title: 'Products', 
      value: '1,247', 
      icon: '📦', 
      color: '#FF9800',
      change: '+3.1%'
    },
    { 
      title: 'Low Stock', 
      value: '23', 
      icon: '⚠️', 
      color: '#F44336',
      change: '-2.4%'
    }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', amount: '$45.50', status: 'Completed', time: '10:30 AM' },
    { id: '#ORD-002', customer: 'Sarah Wilson', amount: '$78.20', status: 'Pending', time: '10:45 AM' },
    { id: '#ORD-003', customer: 'Mike Johnson', amount: '$123.00', status: 'Processing', time: '11:15 AM' },
    { id: '#ORD-004', customer: 'Emma Davis', amount: '$67.80', status: 'Completed', time: '11:30 AM' },
  ];

  const topProducts = [
    { name: 'Coffee Latte', sold: 45, revenue: '$225.00' },
    { name: 'Chocolate Cake', sold: 32, revenue: '$320.00' },
    { name: 'Caesar Salad', sold: 28, revenue: '$280.00' },
    { name: 'Burger Deluxe', sold: 25, revenue: '$375.00' },
  ];

  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header Section */}
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
            Dashboard Overview
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#718096',
            margin: 0
          }}>
            Welcome back! Here's what's happening in your store today.
          </p>
        </div>
        
        <div style={{
          backgroundColor: 'white',
          padding: '15px 20px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a202c'
          }}>
            {currentTime.toLocaleDateString()}
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#667eea'
          }}>
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {stats.map((stat, index) => (
          <div key={index} style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              <div style={{
                fontSize: '30px',
                padding: '12px',
                backgroundColor: stat.color + '20',
                borderRadius: '12px'
              }}>
                {stat.icon}
              </div>
              <div style={{
                fontSize: '14px',
                color: stat.change.startsWith('+') ? '#10b981' : '#ef4444',
                fontWeight: '600',
                backgroundColor: (stat.change.startsWith('+') ? '#10b981' : '#ef4444') + '15',
                padding: '4px 8px',
                borderRadius: '6px'
              }}>
                {stat.change}
              </div>
            </div>
            
            <div style={{
              fontSize: '28px',
              fontWeight: '700',
              color: stat.color,
              marginBottom: '8px'
            }}>
              {stat.value}
            </div>
            
            <div style={{
              fontSize: '14px',
              color: '#64748b',
              fontWeight: '500'
            }}>
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px'
      }}>
        {/* Recent Orders */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center'
          }}>
            📊 Recent Orders
          </h3>
          
          <div>
            {recentOrders.map((order, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px 0',
                borderBottom: index < recentOrders.length - 1 ? '1px solid #e2e8f0' : 'none'
              }}>
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#1a202c',
                    marginBottom: '4px'
                  }}>
                    {order.id}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    {order.customer} • {order.time}
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontWeight: '700',
                    color: '#1a202c',
                    marginBottom: '4px'
                  }}>
                    {order.amount}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    backgroundColor: 
                      order.status === 'Completed' ? '#10b98115' :
                      order.status === 'Processing' ? '#f59e0b15' : '#ef444415',
                    color: 
                      order.status === 'Completed' ? '#10b981' :
                      order.status === 'Processing' ? '#f59e0b' : '#ef4444'
                  }}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1a202c',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center'
          }}>
            🏆 Top Products
          </h3>
          
          <div>
            {topProducts.map((product, index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: index < topProducts.length - 1 ? '1px solid #e2e8f0' : 'none'
              }}>
                <div>
                  <div style={{
                    fontWeight: '600',
                    color: '#1a202c',
                    marginBottom: '4px'
                  }}>
                    {product.name}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#64748b'
                  }}>
                    {product.sold} sold
                  </div>
                </div>
                
                <div style={{
                  fontWeight: '700',
                  color: '#10b981'
                }}>
                  {product.revenue}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        marginTop: '30px',
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        {['💳 New Sale', '📦 Add Product', '📊 View Reports', '⚙️ Settings'].map((action, index) => (
          <button key={index} style={{
            padding: '12px 24px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
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
            {action}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;