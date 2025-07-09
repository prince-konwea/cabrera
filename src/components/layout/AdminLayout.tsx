import React from 'react';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-50">
      {children}
    </div>
  );
};

export default AdminLayout; 