
import React, { useState, useEffect, useRef } from 'react';
import HeartBurst from './components/HeartBurst';

type Step = 'hero' | 'moment' | 'interactive' | 'final';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [hugTrigger, setHugTrigger] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const steps: Step[] = ['hero', 'moment', 'interactive', 'final'];

  useEffect(() => {
    // The requested birthday song for Shayra
    audioRef.current = new Audio('https://files.catbox.moe/io1sih.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const startMusic = () => {
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.play().catch((err) => console.log("Autoplay prevented:", err));
      setIsMusicPlaying(true);
    }
  };

  const next = () => { 
    if (step === 0) startMusic(); // Start music on first interaction
    if (step < steps.length - 1) setStep(step + 1); 
  };
  
  const prev = () => { if (step > 0) setStep(step - 1); };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const renderContent = () => {
    switch (steps[step]) {
      case 'hero':
        return (
          <div className="flex flex-col items-center justify-center text-center fade-up pt-10">
            <div className="mb-12 relative flex flex-col items-center">
              <div className="polaroid absolute -right-20 -top-20 hidden md:block w-32 rotate-6">
                <img src="https://i.imgur.com/c4ypQsY.png" alt="Memory" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" />
              </div>
              <span className="text-pink-300/40 text-[10rem] md:text-[18rem] font-serif absolute -top-24 md:-top-44 left-1/2 -translate-x-1/2 select-none z-0">19</span>
              <h1 className="text-6xl md:text-[7rem] font-serif text-gray-800 z-10 relative leading-none">
                Shayra <br />
                <span className="font-signature text-pink-400 text-5xl md:text-8xl lowercase -mt-4 block">the girl who shines</span>
              </h1>
            </div>
            <p className="text-gray-400 tracking-[0.3em] uppercase text-[10px] md:text-xs mb-10 font-medium">Nineteen Years of Pure Magic</p>
            <button 
              onClick={next}
              className="btn-stylish px-12 py-5 rounded-full text-pink-500 font-semibold tracking-widest text-sm active:scale-95"
            >
              EXPLORE THE CHAPTERS
            </button>
          </div>
        );

      case 'moment':
        return (
          <div className="max-w-4xl mx-auto px-6 fade-up">
            <div className="glass-card p-10 md:p-16 text-center relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
              <div className="w-full md:w-1/2">
                <div className="polaroid rotate-1">
                   <img src="https://i.imgur.com/udvmBQ0.png" alt="Shayra" className="w-full aspect-[4/5] object-cover rounded-sm" />
                   <div className="polaroid-caption">pure radiance</div>
                </div>
              </div>
              <div className="w-full md:w-1/2 text-left">
                <span className="font-signature text-pink-400 text-5xl md:text-6xl mb-4 block">Chapter One</span>
                <h2 className="text-2xl md:text-3xl font-serif text-gray-800 mb-6 leading-tight italic">
                  "You make the softest parts of life feel even more beautiful."
                </h2>
                <p className="text-gray-500 font-light text-base md:text-lg leading-relaxed mb-10">
                  My favorite human, my safe haven, and the girl who deserves everything pink and pretty in this world. 
                </p>
                <div className="flex items-center gap-6">
                  <button onClick={prev} className="text-gray-400 uppercase tracking-widest text-[10px] hover:text-pink-400 transition-colors">Back</button>
                  <button onClick={next} className="btn-stylish px-8 py-3 rounded-xl text-pink-500 font-bold uppercase tracking-widest text-[10px]">Continue</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'interactive':
        return (
          <div className="text-center fade-up px-6 flex flex-col items-center">
            <div className="flex gap-4 mb-10">
               <div className="polaroid -rotate-3 w-28 md:w-40">
                  <img src="https://i.imgur.com/B1jJOkW.png" alt="Fun" className="w-full" />
               </div>
               <div className="polaroid rotate-3 w-28 md:w-40 mt-6">
                  <img src="https://i.imgur.com/4eUxkre.png" alt="Bestie" className="w-full" />
               </div>
            </div>
            <span className="text-pink-400 tracking-[0.4em] uppercase text-[10px] mb-4 block font-bold">Touch for a digital hug</span>
            <div className="relative inline-block mb-12 group">
              <div className="absolute inset-0 bg-pink-200 blur-[80px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <button 
                onClick={() => setHugTrigger(t => t + 1)}
                className="relative w-40 h-40 md:w-48 md:h-48 glass-card flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <span className="text-5xl mb-2">💗</span>
                <span className="text-pink-400 text-[10px] tracking-widest uppercase font-bold">Send Warmth</span>
              </button>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-gray-700 italic mb-10">Because 19 should feel like a warm embrace.</h3>
            <button onClick={next} className="text-pink-400 font-semibold border-b border-pink-100 pb-1 hover:border-pink-400 transition-all">Go to the last gift</button>
          </div>
        );

      case 'final':
        return (
          <div className="w-full max-w-4xl mx-auto px-6 fade-up flex flex-col md:flex-row gap-12 items-start pt-10">
            <div className="w-full md:w-2/3 glass-card p-10 md:p-14 border-2 border-white/50 relative">
               <div className="absolute -top-6 -right-6 w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-2xl animate-bounce shadow-lg">💌</div>
               <h4 className="font-serif text-3xl mb-6 text-gray-800">Dear Shayra,</h4>
               <div className="space-y-4 text-gray-600 font-light text-base md:text-lg leading-relaxed">
                 <p>Happy 19th Birthday. You are entering a year of growth, but I hope you never lose that soft spark that makes you, <span className="text-pink-500 font-medium italic">you</span>.</p>
                 <p>In a world of noise, your friendship is my favorite melody. Thank you for being the partner in crime who actually makes the crime look aesthetic.</p>
                 <p>May your year be filled with vintage coffee shops, high-fashion moments, and endless happiness.</p>
                 <div className="pt-6">
                   <p className="font-signature text-pink-400 text-5xl">Love you always,</p>
                   <p className="text-[10px] tracking-[0.5em] uppercase text-gray-400 font-bold mt-2">Your Forever Bestie</p>
                 </div>
               </div>
            </div>
            
            <div className="w-full md:w-1/3 flex flex-col gap-6">
               <div className="polaroid -rotate-2">
                  <img src="https://i.imgur.com/c4ypQsY.png" alt="Shayra Portrait" className="w-full h-auto" />
               </div>
               <div className="mt-4 flex flex-col gap-4">
                 <button onClick={prev} className="text-gray-400 hover:text-pink-400 text-xs tracking-widest transition-colors uppercase text-center">Rewind</button>
                 <button 
                  onClick={toggleMusic} 
                  className={`flex items-center justify-center gap-3 px-6 py-4 rounded-full transition-all ${isMusicPlaying ? 'bg-pink-500 text-white shadow-pink-200 shadow-xl' : 'glass-card text-pink-500'}`}
                 >
                   <span className="text-xs font-bold tracking-widest uppercase">{isMusicPlaying ? 'Playing' : 'Play Music'}</span>
                   <span className="text-sm">{isMusicPlaying ? '🌸' : '🎵'}</span>
                 </button>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-canvas min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden py-10">
      
      {/* Visual Navigation Progress */}
      <div className="fixed top-12 left-0 w-full flex justify-center gap-3 z-50">
        {steps.map((_, i) => (
          <div key={i} className={`dot ${i === step ? 'active' : ''}`} />
        ))}
      </div>

      <HeartBurst trigger={hugTrigger} />

      {/* Main Content Stage */}
      <main className="w-full h-full flex items-center justify-center transition-all duration-1000">
        {renderContent()}
      </main>

      {/* Music Status Bar */}
      {!isMusicPlaying && step === 0 && (
        <div className="fixed top-20 text-[8px] text-pink-300 tracking-[0.3em] uppercase font-bold animate-pulse">
          Click to begin & start the music
        </div>
      )}

      {/* Subtle Aesthetic Footer */}
      <div className="fixed bottom-6 flex flex-col items-center gap-2 opacity-30 select-none">
        <div className="w-[1px] h-12 bg-pink-400"></div>
        <span className="text-[8px] tracking-[1em] uppercase font-bold text-pink-800">S.XIX • DIGITAL KEEPSAKE</span>
      </div>
    </div>
  );
};

export default App;
