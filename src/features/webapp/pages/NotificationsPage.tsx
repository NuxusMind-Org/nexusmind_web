export const NotificationsPage = () => {
  return (
    <div className="flex flex-col gap-6 text-left animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Bildirişlər</h1>
        <p className="text-gray-400 text-xs mt-1">Son bildirişlərinizi və seans xatırlatmalarını oxuyun.</p>
      </div>
      <div className="p-8 bg-white/[0.01] border border-white/5 rounded-2xl flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
        <span className="text-sm text-gray-300 relative z-10 font-medium">Bildirişlər bölməsi tezliklə aktiv olacaq.</span>
      </div>
    </div>
  );
};
