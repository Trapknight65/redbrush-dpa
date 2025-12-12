'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, GripVertical, CheckCircle, Package } from 'lucide-react';
import { getServices, createService, updateService, deleteService, seedInitialServices } from '@/actions/service.actions';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[];
    order: number;
}

export default function AdminServices() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Service>>({});
    const [isCreating, setIsCreating] = useState(false);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setIsLoading(true);
        const result = await getServices();
        if (result.success && result.data) {
            setServices(result.data as Service[]);
        }
        setIsLoading(false);
    };

    const handleEditClick = (service: Service) => {
        setIsEditing(service.id);
        setEditForm({ ...service });
    };

    const handleCancel = () => {
        setIsEditing(null);
        setIsCreating(false);
        setEditForm({});
    };

    const showNotification = (message: string, type: 'success' | 'error') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = async () => {
        if (isCreating) {
            const title = editForm.title || 'New Service';
            const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            const res = await createService({
                title,
                slug,
                description: editForm.description || '',
                icon: editForm.icon || 'Box',
                features: editForm.features || [],
                order: services.length, // simple append
            });
            if (res.success) {
                showNotification('Service created', 'success');
                fetchServices();
                handleCancel();
            } else {
                showNotification('Failed to create', 'error');
            }
        } else if (isEditing) {
            const res = await updateService(isEditing, {
                title: editForm.title,
                description: editForm.description,
                icon: editForm.icon,
                features: editForm.features,
            });
            if (res.success) {
                showNotification('Service updated', 'success');
                fetchServices();
                handleCancel();
            } else {
                showNotification('Failed to update', 'error');
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            const res = await deleteService(id);
            if (res.success) {
                showNotification('Service deleted', 'success');
                fetchServices();
            } else {
                showNotification('Failed to delete', 'error');
            }
        }
    };

    const handleSeed = async () => {
        const res = await seedInitialServices();
        if (res.success) {
            showNotification('Services seeded', 'success');
            fetchServices();
        }
    }

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...(editForm.features || [])];
        newFeatures[index] = value;
        setEditForm({ ...editForm, features: newFeatures });
    };

    const addFeature = () => {
        setEditForm({ ...editForm, features: [...(editForm.features || []), ''] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...(editForm.features || [])];
        newFeatures.splice(index, 1);
        setEditForm({ ...editForm, features: newFeatures });
    };

    return (
        <div className="p-6 text-white min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600">
                    Services Management
                </h1>
                <div className="flex gap-4">
                    {services.length === 0 && (
                        <button
                            onClick={handleSeed}
                            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2 transition-colors border border-gray-700"
                        >
                            <Package size={18} />
                            Seed Defaults
                        </button>
                    )}
                    <button
                        onClick={() => { setIsCreating(true); setEditForm({ features: [''] }); }}
                        className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 flex items-center gap-2 transition-colors"
                    >
                        <Plus size={20} />
                        Add Service
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
                    >
                        {notification.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Creation Form Card */}
                {isCreating && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-zinc-900 border border-yellow-500/50 rounded-xl p-6 relative shadow-xl shadow-yellow-500/10"
                    >
                        <h3 className="text-xl font-bold mb-4 text-yellow-400">New Service</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Service Title"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-yellow-500 outline-none"
                                value={editForm.title || ''}
                                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                            />
                            <textarea
                                placeholder="Description"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-yellow-500 outline-none h-24"
                                value={editForm.description || ''}
                                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Icon Name (e.g. Code, Database)"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-yellow-500 outline-none"
                                value={editForm.icon || ''}
                                onChange={e => setEditForm({ ...editForm, icon: e.target.value })}
                            />

                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Features</label>
                                {editForm.features?.map((feat, idx) => (
                                    <div key={idx} className="flex gap-2 mb-2">
                                        <input
                                            className="flex-1 bg-zinc-800 border border-zinc-700 rounded p-1 text-sm"
                                            value={feat}
                                            onChange={e => handleFeatureChange(idx, e.target.value)}
                                        />
                                        <button onClick={() => removeFeature(idx)} className="text-red-400 hover:text-red-300"><X size={16} /></button>
                                    </div>
                                ))}
                                <button onClick={addFeature} className="text-sm text-yellow-500 hover:text-yellow-400 flex items-center gap-1">+ Add Feature</button>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                                <button onClick={handleCancel} className="px-3 py-1 bg-zinc-700 rounded hover:bg-zinc-600">Cancel</button>
                                <button onClick={handleSave} className="px-3 py-1 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400">Save</button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* List of Services */}
                {services.map((service) => (
                    <motion.div
                        key={service.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`bg-zinc-900 border ${isEditing === service.id ? 'border-yellow-500' : 'border-zinc-800'} rounded-xl p-6 relative group hover:border-zinc-600 transition-colors`}
                    >
                        {isEditing === service.id ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-yellow-500 outline-none"
                                    value={editForm.title || ''}
                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                />
                                <textarea
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-yellow-500 outline-none h-24"
                                    value={editForm.description || ''}
                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:border-yellow-500 outline-none"
                                    value={editForm.icon || ''}
                                    onChange={e => setEditForm({ ...editForm, icon: e.target.value })}
                                />
                                <div>
                                    <label className="text-sm text-gray-400 mb-2 block">Features</label>
                                    {editForm.features?.map((feat, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <input
                                                className="flex-1 bg-zinc-800 border border-zinc-700 rounded p-1 text-sm"
                                                value={feat}
                                                onChange={e => handleFeatureChange(idx, e.target.value)}
                                            />
                                            <button onClick={() => removeFeature(idx)} className="text-red-400 hover:text-red-300"><X size={16} /></button>
                                        </div>
                                    ))}
                                    <button onClick={addFeature} className="text-sm text-yellow-500 hover:text-yellow-400 flex items-center gap-1">+ Add Feature</button>
                                </div>
                                <div className="flex justify-end gap-2 mt-4">
                                    <button onClick={handleCancel} className="px-3 py-1 bg-zinc-700 rounded hover:bg-zinc-600">Cancel</button>
                                    <button onClick={handleSave} className="px-3 py-1 bg-yellow-500 text-black font-semibold rounded hover:bg-yellow-400">Save</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-yellow-500">
                                        {/* Icon placeholder since we need dynamic icon rendering, maybe just show text or first letter if not valid icon */}
                                        <span className="text-xs">{service.icon.slice(0, 2)}</span>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEditClick(service)} className="p-2 bg-zinc-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(service.id)} className="p-2 bg-zinc-800 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{service.description}</p>
                                <div className="space-y-2">
                                    {service.features.slice(0, 3).map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-zinc-500">
                                            <CheckCircle size={12} className="text-yellow-500/50" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                    {service.features.length > 3 && (
                                        <div className="text-xs text-zinc-600 italic">+{service.features.length - 3} more</div>
                                    )}
                                </div>
                            </>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
