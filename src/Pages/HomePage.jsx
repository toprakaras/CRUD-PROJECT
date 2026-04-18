import React, { useState } from 'react';
import { useDirectory } from '../hooks/useDirectory';
import StatsBar from '../Components/StatsBar';
import RegistrationForm from '../Components/RegistrationForm';
import DirectoryList from '../Components/DirectoryList';
import { Database } from 'lucide-react';
import '../Interfaces/types'; // Import to satisfy usage requirement

const HomePage = () => {
  const { users, isLoading, error, addUser, updateUser, removeUser, resetDatabase } = useDirectory();
  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (user) => {
    setEditingUser(user);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Area */}
      <header className="mb-10 mt-4 flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emeraldLight to-teal-500 mb-2 flex items-center gap-3">
            <Database className="text-emeraldLight" size={36} />
            Kullanıcı Yönetim Paneli
          </h1>
          <p className="text-slate-400 text-lg">React ve Vite kullanılarak geliştirilmiş proje ödevi.</p>
        </div>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-8">
          <strong>Hata Oluştu:</strong> {error}
        </div>
      )}

      {/* Stats Section */}
      <StatsBar users={users} resetDatabase={resetDatabase} />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Panel: Form */}
        <div className="lg:col-span-4">
          <RegistrationForm 
            onAddUser={addUser} 
            onUpdateUser={updateUser}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
          />
        </div>

        {/* Right Panel: List */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-200">Kullanıcı Listesi</h2>
            <span className="text-sm font-medium text-slate-500 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              {users.length} Kayıt Gösteriliyor
            </span>
          </div>
          <DirectoryList 
            users={users} 
            isLoading={isLoading} 
            onRemove={removeUser}
            onEdit={handleEditUser}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
