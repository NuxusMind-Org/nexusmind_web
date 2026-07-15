import { useState } from 'react';
import { Send, ShieldCheck, CheckCheck } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  major: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
  unreadCount: number;
}

interface Message {
  id: number;
  sender: 'user' | 'doctor';
  content: string;
  time: string;
}

export const ChatPage = () => {
  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Leyla Əliyeva',
      major: 'Klinik Psixoloq',
      avatar: 'LA',
      status: 'online',
      lastMessage: 'Növbəti seansımız üçün vaxtı təsdiqlədik.',
      unreadCount: 2,
    },
    {
      id: 2,
      name: 'Dr. Fərhad Həsənov',
      major: 'Psixoterapevt',
      avatar: 'FH',
      status: 'offline',
      lastMessage: 'Göndərdiyiniz qeydləri nəzərdən keçirdim, hər şey yaxşıdır.',
      unreadCount: 0,
    },
  ];

  const [activeDoctor, setActiveDoctor] = useState<Doctor>(doctors[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'doctor', content: 'Salam, özünüzü necə hiss edirsiniz bugünkü rituallardan sonra?', time: '14:20' },
    { id: 2, sender: 'user', content: 'Salam, həqiqətən meditasiya çox kömək etdi. Daha sakit və diqqətliyəm.', time: '14:22' },
    { id: 3, sender: 'doctor', content: 'Çox şadam! Ritualları davamlı etmək çox vacibdir. Hər hansı bir çətinlik çəkmədiniz ki?', time: '14:25' },
    { id: 4, sender: 'user', content: 'Xeyr, sadəcə bəzən vaxtı tənzimləməkdə çətinlik çəkirəm.', time: '14:26' },
    { id: 5, sender: 'doctor', content: 'Növbəti seansımız üçün vaxtı təsdiqlədik. Orada bunu ətraflı danışarıq.', time: '14:28' },
  ]);

  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: 'user',
      content: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setInputValue('');
  };

  return (
    <div className="h-[calc(100vh-120px)] w-full border border-white/5 bg-white/[0.01] rounded-2xl flex overflow-hidden animate-fade-in text-left">
      {/* 1. Conversations / Doctor list */}
      <aside className="w-[320px] h-full border-r border-white/5 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-sm font-bold text-white tracking-wide">Mütəxəssislər</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {doctors.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDoctor(doc)}
              className={`w-full p-3 rounded-xl flex gap-3 items-center transition-colors text-left ${
                activeDoctor.id === doc.id
                  ? 'bg-white/[0.04] border border-white/5'
                  : 'hover:bg-white/[0.02] border border-transparent'
              }`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600/30 to-[#00F2FF]/30 border border-white/10 flex items-center justify-center font-bold text-xs text-white">
                  {doc.avatar}
                </div>
                <span
                  className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-[#0D1117] ${
                    doc.status === 'online' ? 'bg-emerald-500' : 'bg-gray-500'
                  }`}
                />
              </div>

              {/* Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-xs font-semibold text-white truncate">{doc.name}</h4>
                  {doc.unreadCount > 0 && (
                    <span className="text-[9px] bg-[#00F2FF] text-black font-bold px-1.5 py-0.5 rounded-full">
                      {doc.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-[#00F2FF] font-medium mb-1">{doc.major}</p>
                <p className="text-[10px] text-gray-500 truncate leading-relaxed">
                  {doc.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* 2. Active Chat Area */}
      <main className="flex-1 h-full flex flex-col justify-between bg-black/10">
        {/* Active Doctor Header */}
        <div className="h-[60px] border-b border-white/5 px-6 flex items-center justify-between flex-shrink-0 bg-[#0D1117]/35">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500/20 to-[#00F2FF]/20 flex items-center justify-center font-bold text-[10px] text-white">
              {activeDoctor.avatar}
            </div>
            <div>
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                {activeDoctor.name}
                <ShieldCheck size={14} className="text-[#00F2FF]" />
              </h4>
              <span className="text-[10px] text-gray-500 font-medium">
                {activeDoctor.major} • {activeDoctor.status === 'online' ? 'Onlayn' : 'Oflayn'}
              </span>
            </div>
          </div>
        </div>

        {/* Messaging Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map((msg) => {
            const isMe = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[70%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-gradient-to-r from-purple-600/90 to-[#00F2FF]/95 text-white rounded-tr-sm shadow-md'
                      : 'bg-white/[0.03] border border-white/5 text-gray-200 rounded-tl-sm'
                  }`}
                >
                  {msg.content}
                </div>
                <div className="flex items-center gap-1.5 mt-1 px-1">
                  <span className="text-[9px] text-gray-500 font-medium">{msg.time}</span>
                  {isMe && <CheckCheck size={10} className="text-[#00F2FF]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Send Action Toolbar */}
        <div className="p-4 border-t border-white/5 bg-[#0D1117]/25 flex-shrink-0">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Mesajınızı yazın..."
              className="w-full bg-white/[0.03] border border-white/5 hover:border-white/10 focus:border-[#00F2FF]/40 text-xs text-white rounded-xl py-3 pl-4 pr-12 outline-none transition-colors"
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-2 w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-[#00F2FF] hover:opacity-90 flex items-center justify-center text-white transition-opacity cursor-pointer"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
