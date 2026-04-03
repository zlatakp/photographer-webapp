'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit3, X, Save, GripVertical, Settings2 } from 'lucide-react';
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
import { PACKAGE_TIERS, SERVICES, PackageTier } from '@/config/packages.config';

function SortablePackageItem({
  pkg,
  onEdit,
  onDelete
}: {
  pkg: PackageTier,
  onEdit: (pkg: PackageTier) => void,
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => onEdit(pkg)} style={{ color: 'var(--text-muted)' }}><Edit3 size={18} /></button>
              <button onClick={() => onDelete(pkg.id)} style={{ color: '#ef4444' }}><Trash2 size={18} /></button>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

          <div style={{ fontSize: '0.8rem', marginTop: '0.5rem' }} className="text-muted">
            {pkg.slug} • {Object.keys(pkg.services).length} active services
          </div>
          {pkg.isPopular && (
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

      </div>


    </div>
  );
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageTier[]>(PACKAGE_TIERS);
  const [editingPackage, setEditingPackage] = useState<Partial<PackageTier> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = packages.findIndex((pkg) => pkg.id === active.id);
      const newIndex = packages.findIndex((pkg) => pkg.id === over.id);
      setPackages(arrayMove(packages, oldIndex, newIndex));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPackage?.name || !editingPackage?.slug || !editingPackage?.price) return;

    // Use current state to update local tiers
    const updated = editingPackage.id
      ? packages.map(p => p.id === editingPackage.id ? (editingPackage as PackageTier) : p)
      : [...packages, { ...editingPackage, id: Math.random().toString(36).substr(2, 9) } as PackageTier];

    setPackages(updated);
    setIsModalOpen(false);
    setEditingPackage(null);

    // TODO: In a production environment, this would call an API 
    // to write the updated config back to the file system.
    alert("Configuration updated in local state. To persist permanently, update /config/packages.config.ts");
  };

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this package from local state?')) return;
    setPackages(packages.filter(p => p.id !== id));
  };

  const updateServiceValue = (serviceId: string, value: any) => {
    if (!editingPackage) return;
    const currentServices = editingPackage.services || {};
    setEditingPackage({
      ...editingPackage,
      services: {
        ...currentServices,
        [serviceId]: value
      }
    });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', // Slightly smaller for admin but matching style
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
            background: 'linear-gradient(to right, var(--text-main), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Service <span style={{ color: 'var(--accent)' }}>Tiers</span>
          </h1>
          <p className="text-muted">Configuration-driven package management. Changes reflect source of truth.</p>
        </div>
        <button
          onClick={() => {
            setEditingPackage({
              isPopular: false,
              services: {},
              name: '',
              slug: '',
              price: '',
              description: ''
            });
            setIsModalOpen(true);
          }}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Plus size={18} /> Add Config Entry
        </button>
      </div>

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
              <h2 style={{ fontSize: '1.5rem' }}>{editingPackage?.id ? 'Adjust' : 'Define'} Package Tier</h2>
              <button onClick={() => { setIsModalOpen(false); setEditingPackage(null); }}><X /></button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem' }}>Tier Name</label>
                  <input
                    value={editingPackage?.name || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem' }}>Identifier (Slug)</label>
                  <input
                    value={editingPackage?.slug || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, slug: e.target.value })}
                    placeholder="e.g. standard"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem' }}>Price Point</label>
                  <input
                    value={editingPackage?.price || ''}
                    onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
                    placeholder="e.g. £500"
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem' }}>Popularity</label>
                  <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <input
                      type="checkbox"
                      checked={editingPackage?.isPopular || false}
                      onChange={(e) => setEditingPackage({ ...editingPackage, isPopular: e.target.checked })}
                      style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--accent)' }}
                    />
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.9rem' }}>Show Badge</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem' }}>Public Description</label>
                <textarea
                  value={editingPackage?.description || ''}
                  onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                  style={{ ...inputStyle, minHeight: '60px' }}
                />
              </div>

              {/* Dynamic Services Section */}
              <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <Settings2 size={18} color="var(--accent)" />
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--accent)' }}>Config-Defined Services</h3>
                </div>

                <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {SERVICES.map((service) => (
                    <div key={service.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem' }}>{service.label}</label>
                      {service.type === 'number' ? (
                        <input
                          type="number"
                          value={editingPackage?.services ? (editingPackage.services[service.id] || 0) : 0}
                          onChange={(e) => updateServiceValue(service.id, parseInt(e.target.value))}
                          style={inputStyle}
                        />
                      ) : (
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.75rem', borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.1)', border: '1px solid var(--border-color)' }}>
                          <input
                            type="checkbox"
                            checked={editingPackage?.services ? !!editingPackage.services[service.id] : false}
                            onChange={(e) => updateServiceValue(service.id, e.target.checked)}
                            style={{ accentColor: 'var(--accent)', width: '1.1rem', height: '1.1rem' }}
                          />
                          <span style={{ fontSize: '0.85rem' }}>Included in Tier</span>
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem', fontWeight: 600 }}>
                <Save size={18} style={{ marginRight: '0.5rem' }} /> Update Config Manifest
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
