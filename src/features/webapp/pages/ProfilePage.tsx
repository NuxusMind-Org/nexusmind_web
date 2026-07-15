export const ProfilePage = () => {
  return (
    <div className="flex flex-col gap-6 text-left animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Profil Parametrləri</h1>
        <p className="text-gray-400 text-xs mt-1">Şəxsi məlumatlarınızı və təhlükəsizlik tənzimləmələrini idarə edin.</p>
      </div>
      <div className="p-6 bg-white/[0.01] border border-white/5 rounded-2xl">
        <span className="text-sm text-gray-300">Profil tənzimləmələri bölməsi tezliklə aktiv olacaq.</span>
      </div>
    </div>
  );
};
