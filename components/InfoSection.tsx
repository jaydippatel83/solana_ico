'use client';

export function InfoSection() {
  const benefits = [
    {
      icon: '✓',
      title: 'Early Access',
      subtitle: 'Limited Presale',
      color: 'bg-purple-500',
    },
    {
      icon: '🎀',
      title: 'For You',
      subtitle: 'Exclusive Benefits',
      color: 'bg-green-500',
    },
    {
      icon: '🏷️',
      title: 'Low Starting',
      subtitle: 'Special Price',
      color: 'bg-purple-500',
    },
    {
      icon: '🔄',
      title: 'Earn More',
      subtitle: 'Referral Program',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="flex-1 px-8 py-12">
      <div className="mb-8">
        <p className="text-white/60 text-sm mb-4">BUILD & DEPLOY</p>
        <div className="w-16 h-16 rounded-full bg-gradient-teal-purple mb-6 flex items-center justify-center">
          <div className="w-12 h-12 bg-white/10 rounded-full flex flex-col items-center justify-center gap-1">
            <div className="w-6 h-1 bg-gradient-teal-purple rounded"></div>
            <div className="w-6 h-1 bg-gradient-teal-purple rounded"></div>
            <div className="w-6 h-1 bg-gradient-teal-purple rounded"></div>
          </div>
        </div>
        <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
          <p className="text-xs text-white">Presale Live Now • Limited Time Offer</p>
        </div>
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-white">SOLANA</span>{' '}
          <span className="gradient-text">ICO</span>
        </h1>
        <p className="text-xl mb-2">
          <span className="text-purple-400">Token Presale</span>{' '}
          <span className="text-green-400">• Stage 1</span>
        </p>
        <p className="text-white/70 text-lg mt-6 max-w-lg">
          Join the future of blockchain innovation. Our revolutionary platform combines cutting-edge technology with decentralized finance to create a seamless ecosystem for digital assets.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-dark-card rounded-xl p-4 border border-white/10"
          >
            <div className={`w-10 h-10 ${benefit.color} rounded-full flex items-center justify-center mb-3 text-white text-lg`}>
              {benefit.icon}
            </div>
            <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
            <p className="text-white/60 text-sm">{benefit.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

