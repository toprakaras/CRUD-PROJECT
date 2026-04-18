import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useDirectory = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const storedUsers = localStorage.getItem('directory_users');
      let localData = [];
      if (storedUsers) {
        localData = JSON.parse(storedUsers);
      }

      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('API verisi çekilemedi.');
      const apiData = await response.json();

      const formattedApiData = apiData.slice(0, 10).map(user => ({
        id: user.id.toString(),
        fullName: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company.name,
        isLocal: false
      }));

      // Çakışmaları önlemek için API ve LocalStorage verilerini birleştiriyoruz
      const localMap = new Map(localData.map(u => [u.id, u]));
      
      const mergedUsers = formattedApiData.map(apiUser => 
        localMap.has(apiUser.id) ? localMap.get(apiUser.id) : apiUser
      );

      // Sadece yerelde eklenen kullanıcılar
      const apiIds = new Set(formattedApiData.map(u => u.id));
      const localOnlyUsers = localData.filter(u => !apiIds.has(u.id));

      setUsers([...mergedUsers, ...localOnlyUsers]);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToLocal = (data) => {
    localStorage.setItem('directory_users', JSON.stringify(data));
  };

  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: uuidv4(),
      isLocal: true,
    };
    
    const storedUsers = localStorage.getItem('directory_users');
    const localData = storedUsers ? JSON.parse(storedUsers) : [];
    saveToLocal([...localData, newUser]);
    
    setUsers([...users, newUser]);
  };

  const updateUser = (updatedData) => {
    const storedUsers = localStorage.getItem('directory_users');
    const localData = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Kullanıcının localData içinde olup olmadığını kontrol et
    const existingLocalIndex = localData.findIndex(u => u.id === updatedData.id);
    
    if (existingLocalIndex >= 0) {
      localData[existingLocalIndex] = updatedData;
    } else {
      // Eğer API'den gelen bir kayıt güncelleniyorsa, yerel depolamaya ekle
      localData.push({...updatedData, isLocal: true});
    }
    
    saveToLocal(localData);

    setUsers(users.map(u => u.id === updatedData.id ? {...updatedData, isLocal: true} : u));
  };

  const removeUser = (id, isLocal) => {
    const storedUsers = localStorage.getItem('directory_users');
    if (storedUsers) {
      const localData = JSON.parse(storedUsers);
      const updatedLocal = localData.filter(user => user.id !== id);
      saveToLocal(updatedLocal);
    }
    setUsers(users.filter(user => user.id !== id));
  };

  const resetDatabase = () => {
    localStorage.removeItem('directory_users');
    loadData(); 
  };

  return {
    users,
    isLoading,
    error,
    addUser,
    updateUser,
    removeUser,
    resetDatabase
  };
};
