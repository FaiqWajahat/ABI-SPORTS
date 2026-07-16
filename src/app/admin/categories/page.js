'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Upload,
  Loader2,
  X,
  AlertCircle,
  Check,
  Folder,
} from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedId, setSelectedId] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [parentCategory, setParentCategory] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Sync Slug automatically when name changes (in create mode)
  useEffect(() => {
    if (modalMode === 'create') {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
      setSlug(generatedSlug);
    }
  }, [name, modalMode]);

  // Open modal for creating
  const openCreateModal = () => {
    setModalMode('create');
    setSelectedId(null);
    setName('');
    setSlug('');
    setDescription('');
    setParentCategory('');
    setImage('');
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (cat) => {
    setModalMode('edit');
    setSelectedId(cat._id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setParentCategory(cat.parentCategory?._id || cat.parentCategory || '');
    setImage(cat.image || '');
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  // File Upload handler (Cloudinary API route)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFormError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload request failed');
      }

      setImage(data.url);
      setFormSuccess('Image uploaded successfully');
    } catch (err) {
      setFormError(err.message || 'Failed to upload image file');
    } finally {
      setUploading(false);
    }
  };

  // Submit Form: Create / Edit Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    if (!name || !slug) {
      setFormError('Name and Slug fields are required');
      setSubmitting(false);
      return;
    }

    const payload = {
      name,
      slug,
      description,
      parentCategory: parentCategory || null,
      image,
    };

    if (modalMode === 'edit') {
      payload.id = selectedId;
    }

    try {
      const res = await fetch('/api/admin/categories', {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Operation failed');
      }

      setFormSuccess(
        modalMode === 'create'
          ? 'Category created successfully'
          : 'Category updated successfully'
      );
      fetchCategories();

      setTimeout(() => {
        setModalOpen(false);
      }, 800);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Confirmation triggers
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteTargetName, setDeleteTargetName] = useState('');

  const handleDelete = (id, name) => {
    setDeleteTargetId(id);
    setDeleteTargetName(name);
    setDeleteConfirmOpen(true);
  };

  const executeDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete category');
      }

      fetchCategories();
    } catch (err) {
      alert(err.message);
    }
  };

  // Derived stats
  const totalCount = categories.length;
  const parentCount = categories.filter((c) => !c.parentCategory).length;
  const subCount = categories.filter((c) => !!c.parentCategory).length;

  // Filter lists based on search query
  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans select-none">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[9px] text-neutral-500 font-extrabold uppercase tracking-widest">
            Inventory Management
          </span>
          <h2 className="text-xl font-black text-white uppercase tracking-tight leading-none mt-1">
            Categories
          </h2>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-black font-black text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-xl cursor-pointer transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: totalCount },
          { label: 'Parent Categories', value: parentCount },
          { label: 'Subcategories', value: subCount },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-neutral-950 border border-neutral-900 rounded-xl px-5 py-3 flex items-center justify-between"
          >
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">
              {stat.label}
            </span>
            <span className="text-lg font-black text-white tabular-nums">
              {loading ? (
                <span className="inline-block h-5 w-6 bg-neutral-900 rounded animate-pulse" />
              ) : (
                stat.value
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-neutral-900/40 border border-neutral-900 rounded-xl px-4 py-3">
        <Search className="h-4 w-4 text-neutral-600 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search categories by name or slug…"
          className="bg-transparent border-none text-xs text-white placeholder-neutral-600 outline-none w-full"
        />
      </div>

      {/* Table Card */}
      <div className="bg-neutral-950 border border-neutral-900 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 bg-neutral-900 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Folder className="h-12 w-12 text-neutral-800" />
            <p className="text-xs text-neutral-500 uppercase tracking-widest">
              No categories found
            </p>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-black font-black text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-xl cursor-pointer transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Category</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-900">
                  <th className="py-3.5 pl-6 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 w-14">Image</th>
                  <th className="py-3.5 px-4 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">Name</th>
                  <th className="py-3.5 px-4 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">Slug</th>
                  <th className="py-3.5 px-4 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">Parent</th>
                  <th className="py-3.5 px-4 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">Description</th>
                  <th className="py-3.5 pr-6 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/40">
                {filteredCategories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((cat) => (
                  <tr key={cat._id} className="hover:bg-neutral-900/20 transition-colors">
                    <td className="py-3.5 pl-6">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="h-10 w-10 rounded-lg object-cover border border-neutral-800 bg-neutral-900 flex-shrink-0"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-600 flex-shrink-0">
                          <Folder className="h-4 w-4" />
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white uppercase tracking-tight">{cat.name}</td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-neutral-500">{cat.slug}</td>
                    <td className="py-3.5 px-4">
                      {cat.parentCategory?.name ? (
                        <span className="inline-block rounded-full text-[8px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-400">
                          {cat.parentCategory.name}
                        </span>
                      ) : (
                        <span className="text-neutral-600 text-[10px]">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-neutral-400 truncate max-w-xs">{cat.description || '—'}</td>
                    <td className="py-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id, cat.name)}
                          className="p-2 bg-red-950/10 hover:bg-red-950/30 border border-red-900/20 hover:border-red-900/50 rounded-lg text-red-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && filteredCategories.length > itemsPerPage && (
        <div className="flex items-center justify-end gap-2 bg-neutral-950 border border-neutral-900 rounded-xl p-4 mt-4 select-none">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-2 text-[9px] font-black uppercase tracking-widest bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(filteredCategories.length / itemsPerPage) }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-8 w-8 text-[9px] font-black rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-white border-white text-black font-extrabold'
                  : 'bg-neutral-900 border-neutral-850 text-neutral-400 hover:border-neutral-600 hover:text-white'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredCategories.length / itemsPerPage), p + 1))}
            disabled={currentPage === Math.ceil(filteredCategories.length / itemsPerPage)}
            className="px-3.5 py-2 text-[9px] font-black uppercase tracking-widest bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Next
          </button>
        </div>
      )}

      {/* Right-Side Slide-In Panel Modal */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setModalOpen(false)}
              className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              key="panel"
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 h-screen w-full max-w-md bg-neutral-950 border-l border-neutral-900 z-50 overflow-y-auto p-8 shadow-2xl"
            >
              {/* Panel Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 mb-1">
                    {modalMode === 'create' ? 'New Entry' : 'Editing'}
                  </p>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">
                    {modalMode === 'create' ? 'Create Category' : 'Edit Category'}
                  </h3>
                </div>
                <button
                  onClick={() => !submitting && setModalOpen(false)}
                  disabled={submitting}
                  className="p-2 text-neutral-500 hover:text-white hover:bg-neutral-900 rounded-lg cursor-pointer transition-colors mt-0.5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {formError && (
                <div className="mb-5 p-4 bg-red-950/20 border border-red-900/30 rounded-lg text-xs font-bold text-red-400 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}
              {formSuccess && (
                <div className="mb-5 p-4 bg-green-950/20 border border-green-900/30 rounded-lg text-xs font-bold text-green-400 flex items-start gap-2">
                  <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{formSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Category Name */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Compression Wear"
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                    disabled={submitting}
                  />
                </div>

                {/* URL Slug */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="compression-wear"
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none font-mono transition-colors"
                    disabled={submitting}
                  />
                </div>

                {/* Parent Category */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                    Parent Category
                  </label>
                  <select
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white outline-none cursor-pointer transition-colors"
                    disabled={submitting}
                  >
                    <option value="">None (Root Level Category)</option>
                    {categories
                      .filter((cat) => cat._id !== selectedId && !cat.parentCategory)
                      .map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide short B2B specifications details about this category…"
                    rows={3}
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none resize-none transition-colors"
                    disabled={submitting}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                    Category Thumbnail
                  </label>
                  <label className="relative flex flex-col items-center justify-center w-full h-28 border border-dashed border-neutral-800 hover:border-neutral-600 bg-neutral-900/30 rounded-xl cursor-pointer transition-colors group">
                    {image ? (
                      <>
                        <img
                          src={image}
                          alt="Preview"
                          className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-40"
                        />
                        <div className="relative z-10 flex flex-col items-center gap-1">
                          <Check className="h-5 w-5 text-green-400" />
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-green-400">
                            Image Ready
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setImage(''); }}
                          className="absolute top-2 right-2 z-20 h-6 w-6 bg-black/70 hover:bg-red-900/80 rounded-full flex items-center justify-center text-white transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </>
                    ) : uploading ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-5 w-5 text-neutral-400 animate-spin" />
                        <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">
                          Uploading…
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-neutral-600 group-hover:text-neutral-400 transition-colors">
                        <Upload className="h-5 w-5" />
                        <span className="text-[9px] font-extrabold uppercase tracking-widest">
                          Click to upload image
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading || submitting}
                    />
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="Or paste image URL directly…"
                    className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                    disabled={submitting}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="w-full bg-white hover:bg-neutral-100 disabled:bg-neutral-900 text-black disabled:text-neutral-600 font-extrabold text-[10px] uppercase tracking-widest py-3.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Saving…</span>
                    </>
                  ) : (
                    <span>Save Category</span>
                  )}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reusable Delete Confirmation Dialog Modal */}
      <AnimatePresence>
        {deleteConfirmOpen && (
          <div className="fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              key="delete-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmOpen(false)}
              className="absolute inset-0 w-screen h-screen bg-black/75 backdrop-blur-xs"
            />
            {/* Modal Body */}
            <motion.div
              key="delete-body"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-neutral-950 border border-neutral-900 rounded-xl p-6 shadow-2xl z-10 text-center"
            >
              <div className="h-12 w-12 bg-red-950/20 border border-red-900/30 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
                <Trash2 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-white mb-2">Confirm Destruction</h3>
              <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
                Are you sure you want to permanently delete category <span className="text-white font-bold">{deleteTargetName || "this category"}</span>? This process cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmOpen(false)}
                  className="flex-1 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-neutral-400 hover:text-white font-bold text-[9px] uppercase tracking-widest py-3 rounded-lg cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setDeleteConfirmOpen(false);
                    await executeDelete(deleteTargetId);
                  }}
                  className="flex-1 bg-white hover:bg-neutral-200 text-black font-extrabold text-[9px] uppercase tracking-widest py-3 rounded-lg cursor-pointer transition-all"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
