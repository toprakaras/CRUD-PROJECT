import React from 'react';
import { Users, Server, HardDrive, RefreshCw } from 'lucide-react';

const StatsBar = ({ users, resetDatabase }) => {
  const totalUsers = users.length;
  const apiUsers = users.filter(u => !u.isLocal).length;
  const localUsers = users.filter(u => u.isLocal).length;

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Total Stat */}
      <div className="card flex-1 p-5 flex items-center justify-between border-l-4 border-l-emeraldLight">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Toplam Kullanıcı</p>
          <h3 className="text-3xl font-bold text-white">{totalUsers}</h3>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg text-emeraldLight">
          <Users size={28} />
        </div>
      </div>

      {/* API Stat */}
      <div className="card flex-1 p-5 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">API'den Gelen</p>
          <h3 className="text-3xl font-bold text-slate-300">{apiUsers}</h3>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg text-slate-400">
          <Server size={28} />
        </div>
      </div>

      {/* Local Stat */}
      <div className="card flex-1 p-5 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">Yeni Eklenenler</p>
          <h3 className="text-3xl font-bold text-emeraldLight">{localUsers}</h3>
        </div>
        <div className="bg-slate-800 p-3 rounded-lg text-emeraldDark">
          <HardDrive size={28} />
        </div>
      </div>

      {/* Reset Button */}
      <button 
        onClick={resetDatabase}
        className="card flex-none p-5 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors border-emeraldDark/30 cursor-pointer group"
      >
        <RefreshCw className="text-slate-400 group-hover:text-emeraldLight transition-colors" />
        <span className="font-medium text-slate-300 group-hover:text-white">Verileri Sıfırla</span>
      </button>
    </div>
  );
};

export default StatsBar;
