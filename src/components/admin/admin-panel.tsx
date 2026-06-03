"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CATEGORY_MAP, CATEGORY_SLUGS } from "@/lib/constants";
import {
  X, LogOut, Package, Store, MessageSquare, Settings as SettingsIcon,
  Plus, Pencil, Trash2, Upload, Image as ImageIcon, Star, LogIn,
  ChevronLeft, ChevronRight, Eye, EyeOff
} from "lucide-react";

// ============ Types ============
interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  originalPrice: string;
  category: string;
  images: string;
  videoUrl: string;
  features: string;
  specs: string;
  technology: string;
  capacity: string;
  warranty: string;
  tdsRange: string;
  order: number;
  active: boolean;
}

interface Store {
  id: string;
  name: string;
  phone: string;
  address: string;
  googleMapUrl: string;
  googleReviewUrl: string;
  hours: string;
  isVerified: boolean;
  order: number;
  active: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  image: string;
  order: number;
  active: boolean;
}

// ============ Admin Panel ============
export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/admin/auth')
      .then(r => r.json())
      .then(data => {
        if (data.authenticated) setIsAuthenticated(true);
      })
      .catch(() => {});
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true);
        toast({ title: 'Welcome back!', description: `Logged in as ${data.admin.username}` });
      } else {
        toast({ title: 'Login failed', description: data.error, variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to login', variant: 'destructive' });
    }
    setLoginLoading(false);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    toast({ title: 'Logged out' });
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">🔒 Admin Login</CardTitle>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label>Username</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" required />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
              </div>
              <Button type="submit" className="w-full bg-saffron-500 hover:bg-saffron-600 text-white" disabled={loginLoading}>
                {loginLoading ? 'Logging in...' : <><LogIn className="mr-2 h-4 w-4" /> Login</>}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] flex flex-col">
        <CardHeader className="flex-shrink-0 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">🛠️ Admin Panel — Gau Amrit Traders</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" /> Logout
              </Button>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-0">
          <Tabs defaultValue="products" className="h-full flex flex-col">
            <TabsList className="flex-shrink-0 w-full rounded-none border-b bg-saffron-50/50 p-0 h-auto">
              <TabsTrigger value="products" className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none">
                <Package className="h-4 w-4 mr-2" /> Products
              </TabsTrigger>
              <TabsTrigger value="stores" className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none">
                <Store className="h-4 w-4 mr-2" /> Stores
              </TabsTrigger>
              <TabsTrigger value="testimonials" className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none">
                <MessageSquare className="h-4 w-4 mr-2" /> Testimonials
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-none">
                <SettingsIcon className="h-4 w-4 mr-2" /> Settings
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <TabsContent value="products" className="m-0 p-6"><ProductsManager /></TabsContent>
              <TabsContent value="stores" className="m-0 p-6"><StoresManager /></TabsContent>
              <TabsContent value="testimonials" className="m-0 p-6"><TestimonialsManager /></TabsContent>
              <TabsContent value="settings" className="m-0 p-6"><SettingsManager /></TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// ============ Products Manager ============
function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) setProducts(await res.json());
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Product deleted' });
        fetchProducts();
      }
    } catch {
      toast({ title: 'Error deleting product', variant: 'destructive' });
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading products...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Products ({products.length})</h3>
        <Button size="sm" className="bg-saffron-500 hover:bg-saffron-600 text-white" onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </Button>
      </div>

      <div className="space-y-3">
        {products.map(product => (
          <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-saffron-50/50 transition-colors">
            <div className="w-16 h-16 bg-saffron-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {(() => {
                const imgs = JSON.parse(product.images || '[]');
                return imgs.length > 0 ? (
                  <img src={imgs[0]} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <Package className="h-6 w-6 text-saffron-400" />
                );
              })()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium truncate">{product.name}</h4>
                {!product.active && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">Inactive</span>}
              </div>
              <p className="text-sm text-gray-500">₹{product.price} • {CATEGORY_MAP[product.category] || product.category} • Order: {product.order}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button size="icon" variant="ghost" onClick={() => setEditingProduct(product)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-700" onClick={() => handleDelete(product.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {(isCreating || editingProduct) && (
        <ProductForm
          product={editingProduct}
          onClose={() => { setIsCreating(false); setEditingProduct(null); }}
          onSave={fetchProducts}
        />
      )}
    </div>
  );
}

// ============ Product Form ============
function ProductForm({ product, onClose, onSave }: { product: Product | null; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    originalPrice: product?.originalPrice || '',
    category: product?.category || 'ghee',
    videoUrl: product?.videoUrl || '',
    technology: product?.technology || '',
    capacity: product?.capacity || '',
    warranty: product?.warranty || '1 Year',
    tdsRange: product?.tdsRange || '',
    order: product?.order || 0,
    active: product?.active !== undefined ? product.active : true,
  });
  const [images, setImages] = useState<string[]>(JSON.parse(product?.images || '[]'));
  const [features, setFeatures] = useState<string[]>(JSON.parse(product?.features || '[]'));
  const [specs, setSpecs] = useState<Record<string, string>>(JSON.parse(product?.specs || '{}'));
  const [newFeature, setNewFeature] = useState('');
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        if (res.ok) {
          const data = await res.json();
          setImages(prev => [...prev, data.url]);
        }
      }
      toast({ title: 'Images uploaded' });
    } catch {
      toast({ title: 'Upload failed', variant: 'destructive' });
    }
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures(prev => [...prev, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== index));
  };

  const addSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setSpecs(prev => ({ ...prev, [newSpecKey.trim()]: newSpecValue.trim() }));
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const removeSpec = (key: string) => {
    setSpecs(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        images,
        features,
        specs,
      };

      const url = product ? `/api/admin/products/${product.id}` : '/api/admin/products';
      const method = product ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({ title: product ? 'Product updated' : 'Product created', variant: 'success' });
        onSave();
        onClose();
      } else {
        const data = await res.json();
        toast({ title: 'Error', description: data.error, variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error saving product', variant: 'destructive' });
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-2xl my-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{product ? 'Edit Product' : 'Add New Product'}</CardTitle>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name *</Label>
              <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Product name" />
            </div>
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORY_SLUGS.map(slug => (
                    <SelectItem key={slug} value={slug}>{CATEGORY_MAP[slug]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Product description" rows={3} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Price (₹) *</Label>
              <Input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="e.g., 799" />
            </div>
            <div>
              <Label>Original Price (₹)</Label>
              <Input value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} placeholder="e.g., 999" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Technology</Label>
              <Input value={form.technology} onChange={e => setForm(f => ({ ...f, technology: e.target.value }))} placeholder="e.g., Bilona Method" />
            </div>
            <div>
              <Label>Capacity</Label>
              <Input value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} placeholder="e.g., 500ml" />
            </div>
            <div>
              <Label>Warranty</Label>
              <Input value={form.warranty} onChange={e => setForm(f => ({ ...f, warranty: e.target.value }))} placeholder="e.g., 1 Year" />
            </div>
          </div>

          <div>
            <Label>Video URL</Label>
            <Input value={form.videoUrl} onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))} placeholder="YouTube video URL" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Order (sort)</Label>
              <Input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <Switch checked={form.active} onCheckedChange={v => setForm(f => ({ ...f, active: v }))} />
              <Label>Active</Label>
            </div>
          </div>

          <Separator />

          {/* Images */}
          <div>
            <Label>Product Images</Label>
            <div className="mt-2 grid grid-cols-4 gap-2 mb-2">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square bg-saffron-50 rounded-lg overflow-hidden group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <label className="inline-flex items-center gap-2 cursor-pointer bg-saffron-50 text-saffron-700 px-4 py-2 rounded-lg hover:bg-saffron-100 transition-colors text-sm">
              <Upload className="h-4 w-4" />
              {uploading ? 'Uploading...' : 'Upload Images'}
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
          </div>

          <Separator />

          {/* Features */}
          <div>
            <Label>Features</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {features.map((f, idx) => (
                <span key={idx} className="bg-saffron-50 text-saffron-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  {f}
                  <button onClick={() => removeFeature(idx)} className="text-saffron-400 hover:text-saffron-700"><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={newFeature} onChange={e => setNewFeature(e.target.value)} placeholder="Add feature" className="flex-1" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
              <Button size="sm" variant="outline" onClick={addFeature}>Add</Button>
            </div>
          </div>

          <Separator />

          {/* Specs */}
          <div>
            <Label>Specifications</Label>
            <div className="mt-2 space-y-1 mb-2">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between bg-gray-50 px-3 py-1 rounded text-sm">
                  <span><strong>{key}:</strong> {value}</span>
                  <button onClick={() => removeSpec(key)} className="text-gray-400 hover:text-red-500"><X className="h-3 w-3" /></button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input value={newSpecKey} onChange={e => setNewSpecKey(e.target.value)} placeholder="Key" className="flex-1" />
              <Input value={newSpecValue} onChange={e => setNewSpecValue(e.target.value)} placeholder="Value" className="flex-1" />
              <Button size="sm" variant="outline" onClick={addSpec}>Add</Button>
            </div>
          </div>
        </CardContent>

        <div className="p-6 pt-0 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-saffron-500 hover:bg-saffron-600 text-white" onClick={handleSave} disabled={saving || !form.name}>
            {saving ? 'Saving...' : 'Save Product'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ============ Stores Manager ============
function StoresManager() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const fetchStores = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/stores');
      if (res.ok) setStores(await res.json());
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchStores(); }, [fetchStores]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this store?')) return;
    try {
      const res = await fetch(`/api/admin/stores/${id}`, { method: 'DELETE' });
      if (res.ok) { toast({ title: 'Store deleted' }); fetchStores(); }
    } catch {
      toast({ title: 'Error', variant: 'destructive' });
    }
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading stores...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Stores ({stores.length})</h3>
        <Button size="sm" className="bg-saffron-500 hover:bg-saffron-600 text-white" onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add Store
        </Button>
      </div>

      <div className="space-y-3">
        {stores.map(store => (
          <div key={store.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-saffron-50/50 transition-colors">
            <div className="w-12 h-12 bg-saffron-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Store className="h-6 w-6 text-saffron-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium truncate">{store.name}</h4>
                {store.isVerified && <Star className="h-4 w-4 text-green-500 fill-green-500" />}
                {!store.active && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">Inactive</span>}
              </div>
              <p className="text-sm text-gray-500 truncate">{store.address} • {store.phone}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button size="icon" variant="ghost" onClick={() => setEditingStore(store)}><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(store.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      {(isCreating || editingStore) && (
        <StoreForm store={editingStore} onClose={() => { setIsCreating(false); setEditingStore(null); }} onSave={fetchStores} />
      )}
    </div>
  );
}

function StoreForm({ store, onClose, onSave }: { store: Store | null; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    name: store?.name || '',
    phone: store?.phone || '',
    address: store?.address || '',
    googleMapUrl: store?.googleMapUrl || '',
    googleReviewUrl: store?.googleReviewUrl || '',
    hours: store?.hours || 'Mon-Sun 9AM-8PM',
    isVerified: store?.isVerified || false,
    order: store?.order || 0,
    active: store?.active !== undefined ? store.active : true,
  });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = store ? `/api/admin/stores/${store.id}` : '/api/admin/stores';
      const method = store ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast({ title: store ? 'Store updated' : 'Store created' });
        onSave();
        onClose();
      } else {
        toast({ title: 'Error', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', variant: 'destructive' });
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-lg my-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{store ? 'Edit Store' : 'Add New Store'}</CardTitle>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div><Label>Phone</Label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
          <div><Label>Address</Label><Textarea value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} rows={2} /></div>
          <div><Label>Google Map URL</Label><Input value={form.googleMapUrl} onChange={e => setForm(f => ({ ...f, googleMapUrl: e.target.value }))} /></div>
          <div><Label>Google Review URL</Label><Input value={form.googleReviewUrl} onChange={e => setForm(f => ({ ...f, googleReviewUrl: e.target.value }))} /></div>
          <div><Label>Hours</Label><Input value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Order</Label><Input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} /></div>
            <div className="flex items-center gap-3 pt-6">
              <Switch checked={form.isVerified} onCheckedChange={v => setForm(f => ({ ...f, isVerified: v }))} />
              <Label>Verified</Label>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={form.active} onCheckedChange={v => setForm(f => ({ ...f, active: v }))} />
            <Label>Active</Label>
          </div>
        </CardContent>
        <div className="p-6 pt-0 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-saffron-500 hover:bg-saffron-600 text-white" onClick={handleSave} disabled={saving || !form.name}>
            {saving ? 'Saving...' : 'Save Store'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ============ Testimonials Manager ============
function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      if (res.ok) setTestimonials(await res.json());
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) { toast({ title: 'Deleted' }); fetchData(); }
    } catch {}
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Testimonials ({testimonials.length})</h3>
        <Button size="sm" className="bg-saffron-500 hover:bg-saffron-600 text-white" onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add Testimonial
        </Button>
      </div>

      <div className="space-y-3">
        {testimonials.map(t => (
          <div key={t.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-saffron-50/50">
            <div className="w-12 h-12 bg-saffron-100 rounded-full flex items-center justify-center flex-shrink-0">
              {t.image ? <img src={t.image} alt={t.name} className="w-full h-full rounded-full object-cover" /> : t.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{t.name}</h4>
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`h-3 w-3 ${i < t.rating ? 'text-saffron-400 fill-saffron-400' : 'text-gray-200'}`} />)}</div>
                {!t.active && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">Inactive</span>}
              </div>
              <p className="text-sm text-gray-500 truncate">{t.review}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button size="icon" variant="ghost" onClick={() => setEditing(t)}><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(t.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>

      {(isCreating || editing) && (
        <TestimonialForm testimonial={editing} onClose={() => { setIsCreating(false); setEditing(null); }} onSave={fetchData} />
      )}
    </div>
  );
}

function TestimonialForm({ testimonial, onClose, onSave }: { testimonial: Testimonial | null; onClose: () => void; onSave: () => void }) {
  const [form, setForm] = useState({
    name: testimonial?.name || '',
    location: testimonial?.location || '',
    rating: testimonial?.rating || 5,
    review: testimonial?.review || '',
    image: testimonial?.image || '',
    order: testimonial?.order || 0,
    active: testimonial?.active !== undefined ? testimonial.active : true,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        setForm(f => ({ ...f, image: data.url }));
      }
    } catch {}
    setUploading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = testimonial ? `/api/admin/testimonials/${testimonial.id}` : '/api/admin/testimonials';
      const method = testimonial ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast({ title: testimonial ? 'Updated' : 'Created' });
        onSave();
        onClose();
      }
    } catch {}
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
      <Card className="w-full max-w-lg my-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{testimonial ? 'Edit Testimonial' : 'Add Testimonial'}</CardTitle>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
          <div><Label>Location</Label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
          <div>
            <Label>Rating</Label>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))}>
                  <Star className={`h-6 w-6 ${n <= form.rating ? 'text-saffron-400 fill-saffron-400' : 'text-gray-200'}`} />
                </button>
              ))}
            </div>
          </div>
          <div><Label>Review *</Label><Textarea value={form.review} onChange={e => setForm(f => ({ ...f, review: e.target.value }))} rows={3} /></div>
          <div>
            <Label>Photo</Label>
            <div className="flex items-center gap-3 mt-1">
              {form.image && <img src={form.image} alt="" className="w-12 h-12 rounded-full object-cover" />}
              <label className="cursor-pointer bg-saffron-50 text-saffron-700 px-3 py-1.5 rounded-lg text-sm hover:bg-saffron-100">
                {uploading ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Order</Label><Input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} /></div>
            <div className="flex items-center gap-3 pt-6">
              <Switch checked={form.active} onCheckedChange={v => setForm(f => ({ ...f, active: v }))} />
              <Label>Active</Label>
            </div>
          </div>
        </CardContent>
        <div className="p-6 pt-0 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-saffron-500 hover:bg-saffron-600 text-white" onClick={handleSave} disabled={saving || !form.name}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ============ Settings Manager ============
function SettingsManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const settingsFields = [
    { key: 'site_name', label: 'Site Name', type: 'text' },
    { key: 'tagline', label: 'Tagline', type: 'text' },
    { key: 'phone', label: 'Phone', type: 'text' },
    { key: 'whatsapp', label: 'WhatsApp Number', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'hero_title', label: 'Hero Title', type: 'text' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text' },
    { key: 'about_text', label: 'About Text', type: 'textarea' },
    { key: 'facebook_url', label: 'Facebook URL', type: 'text' },
    { key: 'instagram_url', label: 'Instagram URL', type: 'text' },
    { key: 'youtube_url', label: 'YouTube URL', type: 'text' },
  ];

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        toast({ title: 'Settings saved successfully' });
      }
    } catch {}
    setSaving(false);
  };

  if (loading) return <div className="text-center py-8 text-gray-500">Loading settings...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Site Settings</h3>
        <Button className="bg-saffron-500 hover:bg-saffron-600 text-white" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsFields.map(field => (
          <div key={field.key}>
            <Label>{field.label}</Label>
            {field.type === 'textarea' ? (
              <Textarea
                value={settings[field.key] || ''}
                onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
                rows={3}
              />
            ) : (
              <Input
                value={settings[field.key] || ''}
                onChange={e => setSettings(s => ({ ...s, [field.key]: e.target.value }))}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button className="bg-saffron-500 hover:bg-saffron-600 text-white" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save All Settings'}
        </Button>
      </div>
    </div>
  );
}
