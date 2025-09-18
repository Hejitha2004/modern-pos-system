import React, { useState } from 'react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Beverages', description: 'Hot and cold drinks', itemCount: 15, color: '#3b82f6', icon: '☕' },
    { id: 2, name: 'Food', description: 'Main dishes and meals', itemCount: 28, color: '#10b981', icon: '🍔' },
    { id: 3, name: 'Desserts', description: 'Sweet treats and cakes', itemCount: 12, color: '#f59e0b', icon: '🍰' },
    { id: 4, name: 'Snacks', description: 'Light bites and chips', itemCount: 8, color: '#ef4444', icon: '🍿' },
    { id: 5, name: 'Salads', description: 'Fresh and healthy options', itemCount: 6, color: '#06b6d4', icon: '🥗' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#667eea',
    icon: '📦'
  });

  const colorOptions = [
    '#667eea', '#3b82f6', '#10b981', '#f59e0b', 
    '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'
  ];

  const iconOptions = [
    '☕', '🍔', '🍰', '🍿', '🥗', '🍕', '🥪', '🍜',
    '🍲', '🥤', '🧃', '🍪', '🍎', '🥯', '🌮', '📦'
  ];

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.name && newCategory.description) {
      const category = {
        id: categories.length + 1,
        name: newCategory.name,
        description: newCategory.description,
        color: newCategory.color,
        icon: newCategory.icon,
        itemCount: 0
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', description: '', color: '#667eea', icon: '📦' });
      setShowAddForm(false);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category.id);
    setNewCategory({
      name: category.name,
      description: category.description,
      color: category.color,
      icon: category.icon
    });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    const updatedCategories = categories.map(category => 
      category.id === editingCategory 
        ? {
            ...category,
            name: newCategory.name,
            description: newCategory.description,
            color: newCategory.color,
            icon: newCategory.icon
          }
        : category
    );
    setCategories(updatedCategories);
    setEditingCategory(null);
    setNewCategory({ name: '', description: '', color: '#667eea', icon: '📦' });
  };

  const handleDeleteCategory = (id) => {
    const category = categories.find(c => c.id === id);
    if (category.itemCount > 0) {
      alert(`Cannot delete "${category.name}" because it contains ${category.itemCount} items. Please move or delete the items first.`);
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete "${category.name}"?`)) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = categories.reduce((sum, category) => sum + category.itemCount, 0);

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
            🏷️ Categories Management
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#718096',
            margin: 0
          }}>
            Organize your products into categories
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
          ➕ Add New Category
        </button>
      </div>

      {/* Stats Row */}
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
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#667eea',
            marginBottom: '8px'
          }}>
            {categories.length}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '500'
          }}>
            Total Categories
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#10b981',
            marginBottom: '8px'
          }}>
            {totalItems}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '500'
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
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#f59e0b',
            marginBottom: '8px'
          }}>
            {Math.round(totalItems / categories.length) || 0}
          </div>
          <div style={{
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '500'
          }}>
            Avg Items per Category
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        marginBottom: '20px'
      }}>
        <input
          type="text"
          placeholder="🔍 Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '15px 20px',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s ease'
          }}
          onFocus={(e) => e.target.style.borderColor = '#667eea'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
      </div>

      {/* Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {filteredCategories.map((category) => (
          <div key={category.id} style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            transition: 'transform 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => e.target.closest('div').style.transform = 'translateY(-4px)'}
          onMouseLeave={(e) => e.target.closest('div').style.transform = 'translateY(0)'}
          >
            {/* Color Strip */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              backgroundColor: category.color
            }}></div>

            {/* Category Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <div style={{
                  fontSize: '40px',
                  padding: '15px',
                  backgroundColor: category.color + '15',
                  borderRadius: '12px'
                }}>
                  {category.icon}
                </div>
                
                <div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#1a202c',
                    marginBottom: '5px'
                  }}>
                    {category.name}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0
                  }}>
                    {category.description}
                  </p>
                </div>
              </div>

              <div style={{
                fontSize: '12px',
                padding: '6px 12px',
                borderRadius: '20px',
                backgroundColor: category.color + '15',
                color: category.color,
                fontWeight: '600'
              }}>
                {category.itemCount} items
              </div>
            </div>

            {/* Progress Bar */}
            <div style={{
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: '#64748b'
                }}>
                  Usage
                </span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: category.color
                }}>
                  {Math.round((category.itemCount / totalItems) * 100) || 0}%
                </span>
              </div>
              
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#e2e8f0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(category.itemCount / totalItems) * 100}%`,
                  height: '100%',
                  backgroundColor: category.color,
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '10px'
            }}>
              <button
                onClick={() => handleEditCategory(category)}
                style={{
                  flex: 1,
                  padding: '12px',
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
                onClick={() => handleDeleteCategory(category.id)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: category.itemCount > 0 ? '#9ca3af' : '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: category.itemCount > 0 ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (category.itemCount === 0) {
                    e.target.style.backgroundColor = '#dc2626';
                  }
                }}
                onMouseLeave={(e) => {
                  if (category.itemCount === 0) {
                    e.target.style.backgroundColor = '#ef4444';
                  }
                }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {(showAddForm || editingCategory) && (
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
              {editingCategory ? '✏️ Edit Category' : '➕ Add New Category'}
            </h2>

            <form onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter category name"
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
                  Description
                </label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    minHeight: '80px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter category description"
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
                  Category Color
                </label>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  {colorOptions.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewCategory({...newCategory, color})}
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: color,
                        border: newCategory.color === color ? '3px solid #1a202c' : '2px solid #e2e8f0',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  Category Icon
                </label>
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}>
                  {iconOptions.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setNewCategory({...newCategory, icon})}
                      style={{
                        padding: '10px',
                        border: newCategory.icon === icon ? '2px solid #667eea' : '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '20px',
                        cursor: 'pointer',
                        backgroundColor: newCategory.icon === icon ? '#667eea20' : 'white'
                      }}
                    >
                      {icon}
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
                    setEditingCategory(null);
                    setNewCategory({ name: '', description: '', color: '#667eea', icon: '📦' });
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
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;