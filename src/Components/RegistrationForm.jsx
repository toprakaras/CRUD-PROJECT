import React, { useState, useEffect } from 'react';
import { UserPlus, User, Mail, Phone, Building, Save, X } from 'lucide-react';

const RegistrationForm = ({ onAddUser, onUpdateUser, editingUser, setEditingUser }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: ''
  });

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({ fullName: '', email: '', phone: '', company: '' });
    }
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;
    
    if (editingUser) {
      onUpdateUser(formData);
      setEditingUser(null);
    } else {
      onAddUser(formData);
    }
    
    setFormData({ fullName: '', email: '', phone: '', company: '' }); // Reset
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ fullName: '', email: '', phone: '', company: '' });
  }

  return (
    <div className="card p-6 h-fit sticky top-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-emeraldLight/20 p-2 rounded-lg text-emeraldLight">
            {editingUser ? <Save size={24} /> : <UserPlus size={24} />}
          </div>
          <h2 className="text-xl font-bold text-white">
            {editingUser ? 'Kaydı Güncelle' : 'Yeni Kayıt Oluştur'}
          </h2>
        </div>
        {editingUser && (
          <button onClick={handleCancel} className="text-slate-400 hover:text-white" title="İptal Et">
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Ad Soyad *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <User size={18} />
            </div>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Örn: Toprak Aras" 
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">E-Posta Adresi *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Mail size={18} />
            </div>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Örn: ornek@mail.com" 
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Telefon Numarası</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Phone size={18} />
            </div>
            <input 
              type="tel" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Örn: 0555 123 4567" 
              className="input-field pl-10"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Şirket / Kurum</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Building size={18} />
            </div>
            <input 
              type="text" 
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Örn: Tech Solutions" 
              className="input-field pl-10"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary w-full mt-6 flex items-center justify-center gap-2 py-3">
          {editingUser ? <Save size={18} /> : <UserPlus size={18} />}
          <span>{editingUser ? 'Değişiklikleri Kaydet' : 'Sisteme Kaydet'}</span>
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
