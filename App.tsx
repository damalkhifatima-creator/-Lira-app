
import React, { useState, useEffect } from 'react';
/* Added 'X' to the lucide-react imports to resolve "Cannot find name 'X'" error */
import { Layout, Calculator, Coins, Grid, ShieldCheck, Lock, AlertCircle, Bot, MessageSquare, Send, Sparkles, X } from 'lucide-react';
import Header from './components/Layout/Header';
import Hero from './components/Home/Hero';
import ValuationCalculator from './components/Calculator/ValuationCalculator';
import QuickConverter from './components/Converter/QuickConverter';
import MarketPulse from './components/Market/MarketPulse';
import BanknoteGallery from './components/Gallery/BanknoteGallery';
import PinPad from './components/Admin/PinPad';
import Dashboard from './components/Admin/Dashboard';
import GoldMarket from './components/Market/GoldMarket';
import { AppSettings, NumberMode, ChatMessage } from './types';
import { INITIAL_SETTINGS } from './constants';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinPad, setShowPinPad] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'calc' | 'conv' | 'gallery' | 'gold'>('home');
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('syr_app_settings_v2');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });
  const [numberMode, setNumberMode] = useState<NumberMode>('latin');
  const [showAiChat, setShowAiChat] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem('syr_app_settings_v2', JSON.stringify(settings));
  }, [settings]);

  const toggleNumberMode = () => setNumberMode(prev => prev === 'latin' ? 'arabic' : 'latin');

  const formatNumber = (num: number): string => {
    if (numberMode === 'latin') return num.toLocaleString('en-US');
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num.toLocaleString('en-US').replace(/\d/g, d => arabicDigits[parseInt(d)]);
  };

  const handleAdminAuth = (pin: string) => {
    if (pin === '123456') {
      setIsAdmin(true);
      setShowPinPad(false);
      return true;
    }
    return false;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const newMessage: ChatMessage = { role: 'user', text: userInput };
    setChatHistory(prev => [...prev, newMessage]);
    setUserInput('');
    setIsTyping(true);

    try {
      /* Use the recommended client initialization */
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userInput,
        config: {
          systemInstruction: `أنت "خبير العملة السورية 2026". وظيفتك مساعدة المواطنين في فهم نظام العملة الجديد حيث 100 ليرة قديمة تساوي 1 ليرة جديدة. سعر صرف الدولار هو ${settings.usdRate} ليرة جديدة. كن ودوداً، مهنياً، ودقيقاً جداً في الحسابات. أجب باللغة العربية بلهجة سورية خفيفة ومحترمة.`
        }
      });
      /* Use response.text directly as a property */
      setChatHistory(prev => [...prev, { role: 'model', text: response.text || 'عذراً، لم أستطع معالجة الطلب.' }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'model', text: 'حدث خطأ في الاتصال بالخبير الذكي.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (isAdmin) {
    return <Dashboard settings={settings} setSettings={setSettings} onLogout={() => setIsAdmin(false)} />;
  }

  return (
    <div className="min-h-screen relative pb-20">
      <div className="animated-bg" />
      
      {/* News Ticker */}
      <div className="fixed top-0 left-0 right-0 h-8 bg-emerald-600 z-[60] flex items-center overflow-hidden whitespace-nowrap">
        <div className="px-4 bg-emerald-800 h-full flex items-center font-bold text-xs text-white z-10 shadow-lg">عاجل</div>
        <div className="animate-marquee inline-block text-xs font-bold text-white pr-full">
          • المصرف المركزي السوري يؤكد استقرار سعر الصرف الجديد عند {settings.usdRate} ليرة للدولار الواحد • غرام الذهب عيار 21 يسجل {settings.goldRates.k21} ليرة جديدة • تطبيق خبير العملة هو رفيقك الموثوق في عام 2026 •
        </div>
      </div>

      <Header 
        onAdminClick={() => setShowPinPad(true)} 
        settings={settings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="container mx-auto px-4 pt-32 space-y-12">
        {activeTab === 'home' && (
          <>
            <Hero onStart={() => setActiveTab('calc')} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MarketPulse settings={settings} formatNumber={formatNumber} />
              <GoldMarket rates={settings.goldRates} formatNumber={formatNumber} />
              <div className="glass p-8 rounded-2xl flex flex-col justify-center items-center text-center space-y-4 cursor-pointer hover:bg-emerald-500/5 transition-all group" onClick={() => setShowAiChat(true)}>
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold">الخبير الذكي (AI)</h3>
                <p className="text-gray-400 text-sm">تحدث مع مساعدنا الذكي حول تفاصيل العملة والتحويلات المالية.</p>
              </div>
            </div>
            <QuickConverter settings={settings} formatNumber={formatNumber} />
          </>
        )}

        {activeTab === 'calc' && <ValuationCalculator settings={settings} formatNumber={formatNumber} />}
        {activeTab === 'conv' && <div className="max-w-2xl mx-auto"><QuickConverter settings={settings} formatNumber={formatNumber} /></div>}
        {activeTab === 'gallery' && <BanknoteGallery />}
        {activeTab === 'gold' && <div className="max-w-4xl mx-auto"><GoldMarket rates={settings.goldRates} formatNumber={formatNumber} isFull /></div>}
      </main>

      {/* Floating Buttons */}
      <div className="fixed bottom-24 left-6 flex flex-col gap-4 z-40">
        <button 
          onClick={() => setShowAiChat(!showAiChat)}
          className="p-4 bg-emerald-500 text-white rounded-full shadow-2xl hover:scale-110 transition-transform shadow-emerald-500/40"
          title="المساعد الذكي"
        >
          <MessageSquare size={24} />
        </button>
        <button 
          onClick={toggleNumberMode}
          className="p-4 glass rounded-full shadow-2xl hover:scale-110 transition-transform text-emerald-400 border border-emerald-500/20"
        >
          <div className="text-lg font-bold">{numberMode === 'latin' ? '١٢٣' : '123'}</div>
        </button>
      </div>

      {/* AI Chat Drawer */}
      {showAiChat && (
        <div className="fixed bottom-24 left-6 w-[calc(100%-3rem)] md:w-96 h-[500px] glass rounded-3xl z-50 border-emerald-500/30 flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="p-4 emerald-gradient flex justify-between items-center">
            <div className="flex items-center gap-2 text-white">
              <Bot size={20} />
              <span className="font-bold">الخبير المالي الذكي</span>
            </div>
            <button onClick={() => setShowAiChat(false)} className="text-white/70 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length === 0 && (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                  <Sparkles size={32} />
                </div>
                <p className="text-gray-400 text-sm">مرحباً! كيف يمكنني مساعدتك اليوم في شؤون العملة السورية الجديدة؟</p>
              </div>
            )}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-emerald-500 text-white rounded-bl-none' : 'bg-white/10 text-gray-200 rounded-br-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl animate-pulse text-xs text-gray-400">الخبير يفكر...</div>
              </div>
            )}
          </div>
          <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
            <input 
              type="text" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="اسأل عن أي شيء مالي..."
              className="flex-1 bg-transparent outline-none text-sm font-medium"
            />
            <button onClick={handleSendMessage} className="text-emerald-500 hover:scale-110 transition-transform">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      {showPinPad && <PinPad onClose={() => setShowPinPad(false)} onSubmit={handleAdminAuth} />}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
