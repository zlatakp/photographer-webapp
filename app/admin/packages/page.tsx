'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit3, X, Save, Check, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Package {
  id: string;
  name: string;
  slug: string;
  price: string;
  description: string;
  is_popular: boolean;
  order_index: number;
  duration_min: number;
  photos_count: number;
  has_unedited: boolean;
  has_mua: boolean;
  has_hair: boolean;
  has_studio: boolean;
  has_online_gallery: boolean;
  has_cloud_storage: boolean;
}

function SortablePackageItem({ 
  pkg, 
  onEdit, 
  onDelete 
}: { 
  pkg: Package, 
  onEdit: (pkg: Package) => void, 
  onDelete: (id: string) => void 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: pkg.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="glass-panel" 
      style={{ ...style, padding: '1.25rem', position: 'relative', display: 'flex', gap: '1rem', alignItems: 'center' }}
    >
      <div {...attributes} {...listeners} style={{ cursor: 'grab', color: 'var(--text-muted)' }}>
        <GripVertical size={20} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{pkg.name}</h3>
            <div style={{ fontSize: '1rem', color: 'var(--accent)', fontWeight: 700 }}>{pkg.price}</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => onEdit(pkg)} style={{ color: 'var(--text-muted)' }}><Edit3 size={18} /></button>
            <button onClick={() => onDelete(pkg.id)} style={{ color: '#ef4444' }}><Trash2 size={18} /></button>
          </div>
        </div>
        
        <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }} className="text-muted">
          {pkg.duration_min} min • {pkg.photos_count} photos • {pkg.slug}
        </div>
      </div>

      {pkg.is_popular && (
        <div style={{
          backgroundColor: 'var(--accent)',
          color: '#000',
          fontSize: '0.6rem',
          padding: '2px 6px',
          borderRadius: '4px',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>Popular</div>
      )}
    </div>
  );
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPackage, setEditingPackage] = useState<Partial<Package> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/packages');
      const data = await res.json();
      if (data.success) {
        setPackages(data.packages);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = packages.findIndex((pkg) => pkg.id === active.id);
      const newIndex = packages.findIndex((pkg) => pkg.id === over.id);

      const newPackages = arrayMove(packages, oldIndex, newIndex);
      setPackages(newPackages);

      // Save new order to DB
      try {
        const reorderData = newPackages.map((pkg, idx) => ({
          id: pkg.id,
          order_index: idx
        }));

        await fetch('/api/admin/packages/reorder', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orders: reorderData }),
        });
      } catch (error) {
        console.error('Error reordering packages:', error);
        fetchPackages(); // Rollback UI if save fails
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage?.name || !editingPackage?.slug || !editingPackage?.price) return;

    const method = editingPackage.id ? 'PUT' : 'POST';
    const url = editingPackage.id 
      ? `/api/admin/packages/${editingPackage.id}` 
      : '/api/admin/packages';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPackage),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setEditingPackage(null);
        fetchPackages();
      }
    } catch (error) {
      console.error('Error saving package:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      const res = await fetch(`/api/admin/packages/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchPackages();
      }
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>Photography <span style={{ color: 'var(--accent)' }}>Packages</span></h1>
          <p className="text-muted">Drag to reorder. Use structured fields for consistent service tiers.</p>
        </div>
        <button 
          onClick={() => {
            setEditingPackage({ 
                is_popular: false, 
                order_index: packages.length,
                duration_min: 60,
                photos_count: 10,
                has_online_gallery: true,
                has_mua: false,
                has_hair: false,
                has_unedited: false,
                has_studio: false,
                has_cloud_storage: false
            });
            setIsModalOpen(true);
          }}
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} /> Add New Package
        </button>
      </div>

      {isLoading ? (
        <div style={{ padding: '4rem', textAlign: 'center' }} className="text-muted">Loading packages...</div>
      ) : (
        <div style={{ maxWidth: '800px' }}>
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={packages.map(p => p.id)}
              strategy={verticalListSortingStrategy}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {packages.map((pkg) => (
                  <SortablePackageItem 
                    key={pkg.id} 
                    pkg={pkg} 
                    onEdit={setEditingPackage}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Modal/Form */}
      {isModalOpen || editingPackage && (
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
            maxWidth: '700px', 
            maxHeight: '90vh', 
            overflowY: 'auto',
            padding: '2rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>{editingPackage?.id ? 'Edit' : 'Create'} Package</h2>
              <button onClick={() => { setIsModalOpen(false); setEditingPackage(null); }}><X /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem' }}>Name</label>
                  <input 
                    value={editingPackage?.name || ''} 
                    onChange={(e) => setEditingPackage({...editingPackage, name: e.target.value})}
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem' }}>Slug (URL ID)</label>
                  <input 
                    value={editingPackage?.slug || ''} 
                    onChange={(e) => setEditingPackage({...editingPackage, slug: e.target.value})}
                    placeholder="e.g. standard"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem' }}>Price (Display String)</label>
                    <input 
                        value={editingPackage?.price || ''} 
                        onChange={(e) => setEditingPackage({...editingPackage, price: e.target.value})}
                        placeholder="e.g. £500"
                        style={inputStyle}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem' }}>Popular Package</label>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <input 
                            type="checkbox"
                            checked={editingPackage?.is_popular || false} 
                            onChange={(e) => setEditingPackage({...editingPackage, is_popular: e.target.checked})}
                            style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }}
                        />
                        <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>Featured with Badge</span>
                    </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem' }}>Description</label>
                <textarea 
                  value={editingPackage?.description || ''} 
                  onChange={(e) => setEditingPackage({...editingPackage, description: e.target.value})}
                  style={{ ...inputStyle, minHeight: '60px' }}
                />
              </div>

              {/* Structured Fields Section */}
              <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--accent)' }}>Service Specifications</h3>
                
                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem' }}>Duration (minutes)</label>
                        <input 
                            type="number"
                            value={editingPackage?.duration_min || 0} 
                            onChange={(e) => setEditingPackage({...editingPackage, duration_min: parseInt(e.target.value)})}
                            style={inputStyle}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.85rem' }}>Retouched Photos Count</label>
                        <input 
                            type="number"
                            value={editingPackage?.photos_count || 0} 
                            onChange={(e) => setEditingPackage({...editingPackage, photos_count: parseInt(e.target.value)})}
                            style={inputStyle}
                        />
                    </div>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {[
                        { key: 'has_online_gallery', label: 'Online private gallery' },
                        { key: 'has_unedited', label: 'Access to unedited gallery' },
                        { key: 'has_mua', label: 'Professional MUA' },
                        { key: 'has_hair', label: 'Professional Hair Stylist' },
                        { key: 'has_studio', label: 'Studio rental included' },
                        { key: 'has_cloud_storage', label: 'Cloud storage included' },
                    ].map((item) => (
                        <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '4px', border: '1px solid transparent', transition: 'border 0.2s' }}>
                            <input 
                                type="checkbox"
                                checked={editingPackage ? (editingPackage as any)[item.key] : false}
                                onChange={(e) => setEditingPackage({ ...editingPackage, [item.key]: e.target.checked })}
                                style={{ accentColor: 'var(--accent)', width: '1rem', height: '1rem' }}
                            />
                            <span style={{ fontSize: '0.85rem' }}>{item.label}</span>
                        </label>
                    ))}
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem', fontWeight: 600 }}>
                <Save size={18} style={{ marginRight: '0.5rem' }} /> Save Package Configuration
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
  width: '100%',
  fontSize: '0.9rem'
};
