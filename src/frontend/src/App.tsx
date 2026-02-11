import { useState } from 'react';
import { Heart, Sparkles, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useLocalAudio } from '@/hooks/useLocalAudio';

type ViewState = 'initial' | 'success';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('initial');
  const [girlfriendName, setGirlfriendName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);

  const audio = useLocalAudio({
    src: '/assets/audio/music.mp3',
    autoPlay: false,
  });

  const displayName = girlfriendName.trim() || 'Beautiful';
  const displayMessage = personalMessage.trim() || 'You make every day feel like Valentine\'s Day';
  const displayAffirmation = affirmation.trim() || 'You are worth it, you deserve it.';

  const handleYesClick = () => {
    setViewState('success');
  };

  const handleNoHover = () => {
    // Move the No button to a random position when hovered
    const maxX = window.innerWidth - 200;
    const maxY = window.innerHeight - 100;
    const newX = Math.random() * Math.min(maxX, 400) - 200;
    const newY = Math.random() * Math.min(maxY, 200) - 100;
    setNoButtonPosition({ x: newX, y: newY });
    setNoClickCount(prev => prev + 1);
  };

  const noButtonMessages = [
    'No',
    'Are you sure?',
    'Really?',
    'Think again...',
    'Please? 🥺',
    'One more chance?'
  ];

  const currentNoMessage = noButtonMessages[Math.min(noClickCount, noButtonMessages.length - 1)];

  // Music controls component
  const MusicControls = () => (
    <Card className="bg-white/95 backdrop-blur-sm border-romantic-accent/20 shadow-lg">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="text-romantic-accent" size={16} fill="currentColor" />
            <span className="text-sm font-medium text-romantic-dark">Background Music</span>
          </div>
          <Button
            onClick={audio.togglePlay}
            disabled={!!audio.error || audio.isLoading}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-romantic-accent/10"
          >
            {audio.isPlaying ? (
              <Pause className="h-4 w-4 text-romantic-accent" />
            ) : (
              <Play className="h-4 w-4 text-romantic-accent" />
            )}
          </Button>
        </div>

        {audio.error ? (
          <p className="text-xs text-romantic-medium/70 italic">
            {audio.error}
          </p>
        ) : (
          <div className="flex items-center gap-3">
            <Button
              onClick={audio.toggleMute}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-romantic-accent/10 flex-shrink-0"
            >
              {audio.isMuted ? (
                <VolumeX className="h-4 w-4 text-romantic-medium" />
              ) : (
                <Volume2 className="h-4 w-4 text-romantic-accent" />
              )}
            </Button>
            <Slider
              value={[audio.isMuted ? 0 : audio.volume * 100]}
              onValueChange={(values) => {
                audio.setVolume(values[0] / 100);
                if (audio.isMuted && values[0] > 0) {
                  audio.toggleMute();
                }
              }}
              max={100}
              step={1}
              className="flex-1"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );

  // Corner image component
  const CornerImage = () => (
    <div className="absolute top-4 left-4 z-20">
      <img 
        src="/assets/generated/girlfriend-corner.dim_256x256.png" 
        alt="Her" 
        className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white shadow-lg"
      />
    </div>
  );

  if (viewState === 'success') {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/generated/valentine-hero-bg.dim_1920x1080.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-romantic-light/95 via-romantic-medium/90 to-romantic-dark/95" />
        
        {/* Floating hearts animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Heart
              key={i}
              className="absolute text-romantic-accent animate-float-heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 20}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 3}s`,
                opacity: 0.6 + Math.random() * 0.4,
                fontSize: `${20 + Math.random() * 30}px`
              }}
              fill="currentColor"
            />
          ))}
        </div>

        {/* Corner image - top left */}
        <CornerImage />

        {/* Music controls - top right */}
        <div className="absolute top-4 right-4 z-20 w-80 max-w-[calc(100vw-2rem)]">
          <MusicControls />
        </div>

        {/* Success content */}
        <Card className="relative z-10 max-w-2xl w-full bg-white/95 backdrop-blur-sm border-romantic-accent/20 shadow-2xl">
          <CardContent className="p-8 md:p-12 text-center space-y-6">
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/generated/heart-icon.dim_256x256.png" 
                alt="Heart" 
                className="w-24 h-24 animate-pulse-slow"
              />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-romantic-dark">
                Yay! 💕
              </h1>
              <p className="text-2xl md:text-3xl font-display text-romantic-medium">
                {displayName}, you just made me the happiest person alive!
              </p>
              <p className="text-lg md:text-xl text-romantic-dark/80 max-w-lg mx-auto leading-relaxed">
                I can't wait to spend this Valentine's Day with you. Get ready for an amazing time together! 🌹
              </p>
              <p className="text-xl md:text-2xl font-display text-romantic-accent italic pt-4">
                {displayAffirmation}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 justify-center pt-6">
              <Sparkles className="text-romantic-accent animate-bounce" size={24} />
              <Heart className="text-romantic-accent animate-pulse" size={24} fill="currentColor" />
              <Sparkles className="text-romantic-accent animate-bounce" size={24} style={{ animationDelay: '0.2s' }} />
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-romantic-dark/60 z-10">
          <p>
            © {new Date().getFullYear()} · Built with <Heart className="inline w-4 h-4 text-romantic-accent" fill="currentColor" /> using{' '}
            <a 
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-romantic-accent transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/generated/valentine-hero-bg.dim_1920x1080.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-romantic-light/90 via-romantic-medium/85 to-romantic-dark/90" />

      {/* Corner image - top left */}
      <CornerImage />

      {/* Music controls - top right */}
      <div className="absolute top-4 right-4 z-20 w-80 max-w-[calc(100vw-2rem)]">
        <MusicControls />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl w-full space-y-8">
        {/* Customization card */}
        <Card className="bg-white/95 backdrop-blur-sm border-romantic-accent/20 shadow-xl">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-romantic-dark flex items-center gap-2">
              <Sparkles className="text-romantic-accent" size={20} />
              Personalize Your Message
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-romantic-dark">Her Name</Label>
                <Input
                  id="name"
                  placeholder="Enter her name..."
                  value={girlfriendName}
                  onChange={(e) => setGirlfriendName(e.target.value)}
                  className="border-romantic-accent/30 focus:border-romantic-accent focus:ring-romantic-accent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-romantic-dark">Personal Message (Optional)</Label>
                <Input
                  id="message"
                  placeholder="Add a sweet message..."
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  className="border-romantic-accent/30 focus:border-romantic-accent focus:ring-romantic-accent"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="affirmation" className="text-romantic-dark">Affirmation (Optional)</Label>
                <Input
                  id="affirmation"
                  placeholder="You are worth it, you deserve it."
                  value={affirmation}
                  onChange={(e) => setAffirmation(e.target.value)}
                  className="border-romantic-accent/30 focus:border-romantic-accent focus:ring-romantic-accent"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposal card */}
        <Card className="bg-white/95 backdrop-blur-sm border-romantic-accent/20 shadow-2xl">
          <CardContent className="p-8 md:p-12 text-center space-y-8">
            <div className="flex justify-center mb-4">
              <img 
                src="/assets/generated/heart-icon.dim_256x256.png" 
                alt="Heart" 
                className="w-20 h-20 md:w-28 md:h-28 animate-pulse-slow"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-romantic-dark leading-tight">
                Hey {displayName}!
              </h1>
              <p className="text-xl md:text-2xl text-romantic-medium font-medium">
                {displayMessage}
              </p>
              <p className="text-lg md:text-xl text-romantic-accent italic font-display">
                {displayAffirmation}
              </p>
              <p className="text-2xl md:text-4xl font-display font-semibold text-romantic-dark pt-4">
                Will you be my Valentine?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 relative">
              <Button
                onClick={handleYesClick}
                size="lg"
                className="bg-romantic-accent hover:bg-romantic-accent/90 text-white font-semibold text-xl px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Yes! 💕
              </Button>
              
              <Button
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                onClick={handleNoHover}
                size="lg"
                variant="outline"
                className="border-2 border-romantic-dark/30 text-romantic-dark hover:bg-romantic-dark/5 font-semibold text-xl px-12 py-6 rounded-full transition-all relative"
                style={{
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {currentNoMessage}
              </Button>
            </div>

            {noClickCount > 0 && (
              <p className="text-sm text-romantic-medium/70 animate-fade-in italic">
                {noClickCount === 1 && "The button is shy... just like my feelings for you 🥰"}
                {noClickCount === 2 && "It's running away because it knows 'Yes' is the right answer 💖"}
                {noClickCount === 3 && "Come on, you know you want to say yes... 😊"}
                {noClickCount >= 4 && "I'll keep trying until you say yes! 💕"}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-romantic-dark/60 z-10">
        <p>
          © {new Date().getFullYear()} · Built with <Heart className="inline w-4 h-4 text-romantic-accent" fill="currentColor" /> using{' '}
          <a 
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-romantic-accent transition-colors underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
