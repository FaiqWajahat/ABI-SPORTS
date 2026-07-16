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
  Shirt,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedId, setSelectedId] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [minOrderQuantity, setMinOrderQuantity] = useState(50);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState('active');
  const [images, setImages] = useState([]);

  // Specifications
  const [material, setMaterial] = useState('');
  const [weight, setWeight] = useState('');
  const [sizing, setSizing] = useState('S - XXL');
  const [customization, setCustomization] = useState('');

  // Helpers
  const [imageInput, setImageInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch initial datasets
  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ]);

      if (prodRes.ok && catRes.ok) {
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        setProducts(prodData.products || []);
        setCategories(catData.categories || []);
      }
    } catch (err) {
      console.error('Failed to load products data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter, statusFilter]);

  // Auto-generate slug when name changes (in create mode)
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
    setCategory('');
    setSubcategory('');
    setMinOrderQuantity(50);
    setFeatured(false);
    setStatus('active');
    setImages([]);
    setMaterial('');
    setWeight('');
    setSizing('S - XXL');
    setCustomization('');
    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (product) => {
    setModalMode('edit');
    setSelectedId(product._id);
    setName(product.name);
    setSlug(product.slug);
    setDescription(product.description || '');
    setCategory(product.category?._id || product.category || '');
    setSubcategory(product.subcategory?._id || product.subcategory || '');
    setMinOrderQuantity(product.minOrderQuantity || 50);
    setFeatured(product.featured || false);
    setStatus(product.status || 'active');
    setImages(product.images || []);

    const specs = product.specifications || {};
    setMaterial(specs.material || '');
    setWeight(specs.weight || '');
    setSizing(specs.sizing || 'S - XXL');
    setCustomization(specs.customization || '');

    setFormError('');
    setFormSuccess('');
    setModalOpen(true);
  };

  // Handle multi-image upload
  const handleImageUpload = async (e) => {
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

      setImages((prev) => [...prev, data.url]);
      setFormSuccess('Image uploaded and added to list');
    } catch (err) {
      setFormError(err.message || 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const addImageByUrl = () => {
    if (!imageInput) return;
    setImages((prev) => [...prev, imageInput]);
    setImageInput('');
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Form Submit: Create / Edit Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setSubmitting(true);

    if (!name || !slug || !description || !category) {
      setFormError('Name, Slug, Description, and Main Category are required fields');
      setSubmitting(false);
      return;
    }

    const payload = {
      name,
      slug,
      description,
      images,
      category,
      subcategory: subcategory || null,
      minOrderQuantity: Number(minOrderQuantity) || 50,
      featured,
      status,
      specifications: {
        material,
        weight,
        sizing,
        customization,
      },
    };

    if (modalMode === 'edit') {
      payload.id = selectedId;
    }

    try {
      const res = await fetch('/api/admin/products', {
        method: modalMode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Operation failed');
      }

      setFormSuccess(
        modalMode === 'create' ? 'Product created successfully' : 'Product updated successfully'
      );
      fetchData();

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
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete product');
      }

      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Derived stats
  const totalCount = products.length;
  const featuredCount = products.filter((p) => p.featured).length;
  const activeCount = products.filter((p) => p.status === 'active').length;
  const draftCount = products.filter((p) => p.status === 'draft').length;

  // Status badge helper
  const statusBadge = (s) => {
    if (s === 'active')
      return 'bg-green-950/20 text-green-500 border border-green-900/30';
    if (s === 'draft')
      return 'bg-yellow-950/20 text-yellow-500 border border-yellow-900/30';
    return 'bg-neutral-900/60 text-neutral-500 border border-neutral-800';
  };

  // Filter products based on search & category & status
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const catId = product.category?._id || product.category;
    const matchesCategory = !categoryFilter || catId === categoryFilter;
    const matchesStatus = !statusFilter || product.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans select-none">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[9px] text-neutral-500 font-extrabold uppercase tracking-widest">
            Inventory Management
          </span>
          <h2 className="text-xl font-black text-white uppercase tracking-tight leading-none mt-1">
            Products
          </h2>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-black font-black text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-xl cursor-pointer transition-all"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Products', value: totalCount },
          { label: 'Featured', value: featuredCount },
          { label: 'Active', value: activeCount },
          { label: 'Draft', value: draftCount },
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

      {/* Search + Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-3 bg-neutral-900/40 border border-neutral-900 rounded-xl px-4 py-3">
          <Search className="h-4 w-4 text-neutral-600 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by name or slug…"
            className="bg-transparent border-none text-xs text-white placeholder-neutral-600 outline-none w-full"
          />
        </div>
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none bg-neutral-900 border border-neutral-900 rounded-xl px-4 py-3 pr-8 text-xs text-neutral-400 outline-none cursor-pointer w-full sm:w-44"
          >
            <option value="">All Categories</option>
            {categories
              .filter((cat) => !cat.parentCategory)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-600 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-neutral-900 border border-neutral-900 rounded-xl px-4 py-3 pr-8 text-xs text-neutral-400 outline-none cursor-pointer w-full sm:w-36"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archive">Archive</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-600 pointer-events-none" />
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-neutral-950 border border-neutral-900 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 bg-neutral-900 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Shirt className="h-12 w-12 text-neutral-800" />
            <p className="text-xs text-neutral-500 uppercase tracking-widest">
              No products found
            </p>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-black font-black text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-xl cursor-pointer transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Product</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-900">
                  <th className="py-3.5 pl-6 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 w-16">Image</th>
                  <th className="py-3.5 px-4 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">Name</th>
                  <th className="py-3.5 px-4 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">Category</th>
                  <th className="py-3.5 px-4 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">MOQ</th>
                  <th className="py-3.5 px-4 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">Status</th>
                  <th className="py-3.5 pr-6 text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 text-right w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/40">
                {filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
                  <tr key={product._id} className="hover:bg-neutral-900/20 transition-colors">
                    {/* Image */}
                    <td className="py-3.5 pl-6">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-12 w-12 rounded-xl object-cover border border-neutral-800 bg-neutral-900 flex-shrink-0"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-xl border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-600 flex-shrink-0">
                          <Shirt className="h-4.5 w-4.5" />
                        </div>
                      )}
                    </td>

                    {/* Name + description */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <span className="font-bold text-white uppercase tracking-tight block truncate">{product.name}</span>
                      <span className="text-[9px] text-neutral-500 block mt-0.5 truncate">{product.description || product.slug}</span>
                    </td>

                    {/* Category Badge */}
                    <td className="py-3.5 px-4">
                      <span className="inline-block rounded-full text-[8px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-400">
                        {product.category?.name || '—'}
                      </span>
                    </td>

                    {/* MOQ */}
                    <td className="py-3.5 px-4 font-mono text-neutral-300 font-semibold">
                      {product.minOrderQuantity || 50}
                      <span className="text-neutral-600 ml-1">pcs</span>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1.5">
                        <span
                          className={`inline-block rounded-full text-[8px] font-black uppercase tracking-wider px-2.5 py-0.5 ${statusBadge(product.status)}`}
                        >
                          {product.status}
                        </span>
                        {product.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full text-[8px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-yellow-950/20 text-yellow-500 border border-yellow-900/30">
                            <Sparkles className="h-2 w-2" />
                            Featured
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
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
      {!loading && filteredProducts.length > itemsPerPage && (
        <div className="flex items-center justify-end gap-2 bg-neutral-950 border border-neutral-900 rounded-xl p-4 mt-4 select-none">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-2 text-[9px] font-black uppercase tracking-widest bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed border border-neutral-800 hover:border-neutral-600 hover:text-white rounded-lg transition-colors cursor-pointer text-neutral-400"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => i + 1).map(page => (
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
            onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredProducts.length / itemsPerPage), p + 1))}
            disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}
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
              className="fixed right-0 top-0 h-screen w-full max-w-md bg-neutral-950 border-l border-neutral-900 z-50 overflow-y-auto shadow-2xl"
            >
              <div className="p-8">
                {/* Panel Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 mb-1">
                      {modalMode === 'create' ? 'New Entry' : 'Editing'}
                    </p>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">
                      {modalMode === 'create' ? 'Add Product' : 'Edit Product'}
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

                {/* Alerts */}
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

                  {/* Product Name */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. AeroDry B2B Team Polo"
                      className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                      disabled={submitting}
                    />
                  </div>

                  {/* Slug */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                      Slug Path
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="aerodry-b2b-team-polo"
                      className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none font-mono transition-colors"
                      disabled={submitting}
                    />
                  </div>

                  {/* Category + Subcategory */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                        Main Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-3 py-3 text-xs text-white outline-none cursor-pointer transition-colors"
                        disabled={submitting}
                      >
                        <option value="">Select…</option>
                        {categories
                          .filter((cat) => !cat.parentCategory)
                          .map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                        Subcategory
                      </label>
                      <select
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-3 py-3 text-xs text-white outline-none cursor-pointer transition-colors"
                        disabled={submitting}
                      >
                        <option value="">None</option>
                        {categories
                          .filter(
                            (cat) =>
                              cat.parentCategory?._id === category ||
                              cat.parentCategory === category
                          )
                          .map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                      Product Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Full technical parameters, sewing specs, printing capabilities, pack sizes…"
                      rows={3}
                      className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none resize-none transition-colors"
                      disabled={submitting}
                    />
                  </div>

                  {/* Technical Specifications */}
                  <div className="space-y-3">
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">
                      Technical Specifications
                    </p>
                    <div className="bg-neutral-900/30 border border-neutral-900 rounded-xl p-4 grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                          Fabric Material
                        </label>
                        <input
                          type="text"
                          value={material}
                          onChange={(e) => setMaterial(e.target.value)}
                          placeholder="100% Micro-Interlock Polyester"
                          className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-3 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                          disabled={submitting}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                          Weight (GSM)
                        </label>
                        <input
                          type="text"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="140 - 160 GSM"
                          className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-3 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                          disabled={submitting}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                          Sizing Range
                        </label>
                        <input
                          type="text"
                          value={sizing}
                          onChange={(e) => setSizing(e.target.value)}
                          placeholder="S - XXXL"
                          className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-3 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                          disabled={submitting}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                          Customization
                        </label>
                        <input
                          type="text"
                          value={customization}
                          onChange={(e) => setCustomization(e.target.value)}
                          placeholder="Sublimation, Heat Seal…"
                          className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-3 py-2.5 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                          disabled={submitting}
                        />
                      </div>
                    </div>
                  </div>

                  {/* B2B Controls: MOQ + Status + Featured */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                        MOQ (pcs)
                      </label>
                      <input
                        type="number"
                        value={minOrderQuantity}
                        onChange={(e) => setMinOrderQuantity(Number(e.target.value))}
                        className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white outline-none font-mono transition-colors"
                        disabled={submitting}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500 block">
                        Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white outline-none cursor-pointer transition-colors"
                        disabled={submitting}
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="archive">Archive</option>
                      </select>
                    </div>
                  </div>

                  {/* Featured toggle */}
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="h-4 w-4 bg-neutral-900 border border-neutral-800 rounded focus:ring-0 cursor-pointer accent-white"
                      disabled={submitting}
                    />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                      Featured on Homepage
                    </span>
                  </label>

                  {/* Image Upload Zone */}
                  <div className="space-y-3">
                    <p className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">
                      Product Image Catalog
                    </p>

                    {/* Existing images grid */}
                    {images.length > 0 && (
                      <div className="grid grid-cols-4 gap-2.5">
                        {images.map((imgUrl, index) => (
                          <div
                            key={index}
                            className="aspect-square border border-neutral-800 rounded-lg overflow-hidden relative group bg-neutral-900/40"
                          >
                            <img
                              src={imgUrl}
                              alt={`Product ${index}`}
                              className="object-cover w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 h-5 w-5 bg-black/70 hover:bg-red-900 rounded-full flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload zone */}
                    <label className="flex flex-col items-center justify-center w-full h-24 border border-dashed border-neutral-800 hover:border-neutral-600 bg-neutral-900/20 rounded-xl cursor-pointer transition-colors group">
                      {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-5 w-5 text-neutral-400 animate-spin" />
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-500">
                            Uploading…
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-neutral-600 group-hover:text-neutral-400 transition-colors">
                          <Upload className="h-5 w-5" />
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-center px-4">
                            Drop image files or click to upload
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploading || submitting}
                      />
                    </label>

                    {/* URL input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={imageInput}
                        onChange={(e) => setImageInput(e.target.value)}
                        placeholder="Add image URL directly…"
                        className="flex-1 bg-neutral-900/50 border border-neutral-800 focus:border-neutral-600 rounded-lg px-4 py-3 text-xs text-white placeholder-neutral-600 outline-none transition-colors"
                        disabled={submitting}
                      />
                      <button
                        type="button"
                        onClick={addImageByUrl}
                        className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-white font-extrabold text-[10px] uppercase tracking-wider px-4 rounded-lg cursor-pointer transition-colors whitespace-nowrap"
                      >
                        Add URL
                      </button>
                    </div>
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
                      <span>Save Product</span>
                    )}
                  </button>
                </form>
              </div>
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
                Are you sure you want to permanently delete product <span className="text-white font-bold">{deleteTargetName || "this product"}</span>? This process cannot be undone.
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
