export default function TopBanner() {
  const items = [
    '✦ Unlimited free clips — no daily limit, ever',
    '✦ Free: up to 2 min clips, up to 1080p quality',
    '✦ Pro: 4K & MOV format, clips up to 30 min (1080p) & 15 min (4K), MP3 up to 45 min — from $5.99/mo',
    '✦ New: save clips in any language audio track — Hindi, French, Spanish & more',
    '✦ New: clip history — revisit your past saves instantly',
    '✦ No watermark. No software. Just paste, trim, save.',
    '✦ International payments — Visa, Mastercard & UPI accepted',
  ];

  return (
    <div className="bg-purple-600/10 border-b border-purple-500/20 overflow-hidden py-2">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((text, i) => (
          <span key={i} className="text-purple-300/70 text-xs mx-6 flex-shrink-0">{text}</span>
        ))}
      </div>
    </div>
  );
}
