import React from 'react';
import { Mail, Phone, Building, Trash2, ShieldCheck, User, Edit2 } from 'lucide-react';

const DirectoryList = ({ users, isLoading, onRemove, onEdit }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emeraldLight mb-4"></div>
        <p>Kayıtlar Yükleniyor...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400 card">
        <User size={48} className="mb-4 opacity-50" />
        <p>Henüz sistemde kayıtlı kimse bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      {users.map((user) => (
        <div key={user.id} className="card p-5 hover:border-slate-600 transition-colors group relative overflow-hidden">
          
          {user.isLocal && (
            <div className="absolute top-0 right-0 bg-emeraldDark/90 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm">
              <ShieldCheck size={12} />
              YENİ EKLENDİ
            </div>
          )}

          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-emeraldLight font-bold text-lg">
                {user.fullName ? user.fullName.charAt(0).toUpperCase() : '?'}
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">{user.fullName}</h3>
                <p className="text-xs text-slate-400 mt-0.5">ID: {typeof user.id === 'string' ? user.id.slice(0, 8) : user.id}</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => onEdit(user)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-1 px-3 rounded-md transition-colors duration-200 shadow-sm active:scale-95 text-sm flex items-center gap-1"
                title="Kaydı Güncelle"
              >
                <Edit2 size={14} />
                <span>Düzenle</span>
              </button>
              <button 
                onClick={() => onRemove(user.id, user.isLocal)}
                className="btn-danger flex items-center gap-1 opacity-80 hover:opacity-100"
                title="Kayıt Sil"
              >
                <Trash2 size={14} />
                <span>Sil</span>
              </button>
            </div>
          </div>

          <div className="space-y-2 text-sm text-slate-300 mt-2">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-slate-500" />
              <span className="truncate">{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-slate-500" />
                <span>{user.phone}</span>
              </div>
            )}
            {user.company && (
              <div className="flex items-center gap-2">
                <Building size={16} className="text-slate-500" />
                <span className="truncate">{user.company}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DirectoryList;
