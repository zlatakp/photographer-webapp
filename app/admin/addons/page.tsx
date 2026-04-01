'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit3, X, Save, Check } from 'lucide-react';

interface Addon {
  id: string;
  name: string;
  slug: string;
  price: string;
  description: string;
  category: string;
  order_index: number;
}

export default function AdminAddonsPage() {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingAddon, setEditingAddon] = useState<Partial<Addon> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAddons = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/addons');
      const data = await res.json();
      if (data.success) {
        setAddons(data.addons);
      }
    } catch (error) {
      console.error('Error fetching addons:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddons();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddon?.name || !editingAddon?.slug || !editingAddon?.price) return;

    const method = editingAddon.id ? 'PUT' : 'POST';
    const url = editingAddon.id 
      ? `/api/admin/addons/${editingAddon.id}` 
      : '/api/admin/addons';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAddon),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingAddon(null);
        fetchAddons();
      }
    } catch (error) {
      console.error('Error saving addon:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this addon?')) return;

    try {
      const res = await fetch(`/api/admin/addons/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchAddons();
      }
    } catch (error) {
      console.error('Error deleting addon:', error);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Service <span style={{ color: 'var(--accent)' }}>Add-ons</span></h1>
          <p className="text-muted">Manage extra services and custom options offered to clients.</p>
        </div>
        <button 
          onClick={() => {
            setEditingAddon({ category: 'photo', order_index: addons.length });
            setIsModalOpen(true);
          }}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} /> Add New Add-on
        </button>
      </div>

      {isLoading ? (
        <div style={{ padding: '4rem', textAlign: 'center' }} className="text-muted">Loading addons...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {['photo', 'video'].map((cat) => (
            <div key={cat}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 600, textTransform: 'capitalize', marginBottom: '1rem', color: 'var(--accent)' }}>{cat} Services</h2>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1rem' }}>
                {addons.filter(a => a.category === cat).map((addon) => (
                  <div key={addon.id} className="glass-panel" style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{addon.name}</h3>
                        <span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 700 }}>{addon.price}</span>
                      </div>
                      {addon.description && <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>{addon.description}</p>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginLeft: '1rem' }}>
                      <button 
                        onClick={() => {
                          setEditingAddon(addon);
                          setIsModalOpen(true);
                        }}
                        style={{ color: 'var(--text-muted)' }}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(addon.id)}
                        style={{ color: '#ef4444' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal/Form */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '2rem'
        }}>
          <div className="glass-panel" style={{ 
            width: '100%', 
            maxWidth: '500px', 
            maxHeight: '90vh', 
            overflowY: 'auto',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>{editingAddon?.id ? 'Edit' : 'Create'} Add-on</h2>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem' }}>Name</label>
                <input 
                  value={editingAddon?.name || ''} 
                  onChange={(e) => setEditingAddon({...editingAddon, name: e.target.value})}
                  style={inputStyle}
                  placeholder="e.g. Rush Delivery"
                />
              </div>

              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem' }}>Slug</label>
                  <input 
                    value={editingAddon?.slug || ''} 
                    onChange={(e) => setEditingAddon({...editingAddon, slug: e.target.value})}
                    style={inputStyle}
                    placeholder="e.g. photo-rush"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem' }}>Price</label>
                  <input 
                    value={editingAddon?.price || ''} 
                    onChange={(e) => setEditingAddon({...editingAddon, price: e.target.value})}
                    style={inputStyle}
                    placeholder="e.g. £150"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem' }}>Category</label>
                <select 
                  value={editingAddon?.category || 'photo'} 
                  onChange={(e) => setEditingAddon({...editingAddon, category: e.target.value})}
                  style={inputStyle}
                >
                  <option value="photo">Photo Service</option>
                  <option value="video">Video Service</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem' }}>Description (Optional)</label>
                <textarea 
                  value={editingAddon?.description || ''} 
                  onChange={(e) => setEditingAddon({...editingAddon, description: e.target.value})}
                  style={{ ...inputStyle, minHeight: '80px' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label style={{ fontSize: '0.9rem' }}>Order Index</label>
                <input 
                  type="number"
                  value={editingAddon?.order_index || 0} 
                  onChange={(e) => setEditingAddon({...editingAddon, order_index: parseInt(e.target.value)})}
                  style={{ ...inputStyle, width: '80px' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                <Save size={18} /> Save Add-on
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '4px',
  border: '1px solid var(--border-color)',
  background: 'rgba(0,0,0,0.2)',
  color: 'var(--text-main)',
  outline: 'none',
  width: '100%'
};
