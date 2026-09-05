'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  Briefcase,
  ExternalLink,
  FileText,
  GitBranch,
  Globe2,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Menu,
  Moon,
  RotateCcw,
  Sparkles,
  Sun,
  Turtle,
  Users,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const greetings = [
  { word: 'Hello', language: 'English' },
  { word: 'Kumusta', language: 'Filipino' },
  { word: '你好', language: 'Mandarin' },
  { word: 'Hola', language: 'Spanish' },
  { word: 'こんにちは', language: 'Japanese' },
  { word: 'Olá', language: 'Portuguese' },
  { word: 'Bonjour', language: 'French' },
];

const projects = [
  {
    index: '01',
    title: 'Signal / 01',
    kind: 'Product intelligence',
    description:
      'A calm command center that turns noisy live metrics into clear, useful decisions.',
    tags: ['Product design', 'Next.js', 'Data'],
    accent: 'blue',
    coordinates: '03° 08′ / SYSTEMS',
  },
  {
    index: '02',
    title: 'Atlas / 02',
    kind: 'Travel memory system',
    description:
      'A private, map-minded archive for collecting routes, notes, places, and small discoveries.',
    tags: ['Creative code', 'Maps', 'Motion'],
    accent: 'lime',
    coordinates: '14° 35′ / STORIES',
  },
  {
    index: '03',
    title: 'Forma / 03',
    kind: 'Interface language',
    description:
      'A modular design system that gives multiple products one recognizable voice.',
    tags: ['Systems', 'React', 'A11y'],
    accent: 'coral',
    coordinates: '41° 09′ / CRAFT',
  },
];

const workTimeline = [
  {
    year: '2025—NOW',
    title: 'Independent Studio',
    role: 'Creative Developer',
    note: 'Design systems, product interfaces, and expressive builds.',
  },
  {
    year: '2023—2025',
    title: 'Product Team',
    role: 'Frontend Engineer',
    note: 'Shipped tools used by people across time zones.',
  },
  {
    year: '2021—2023',
    title: 'Digital Practice',
    role: 'Designer / Developer',
    note: 'Connected brand, interaction, and production code.',
  },
];

const studyTimeline = [
  {
    year: '2020—2024',
    title: 'Computer Science',
    role: 'B.Sc. / Software Systems',
    note: 'Human-computer interaction, systems, and the web.',
  },
  {
    year: '2024',
    title: 'Interaction Lab',
    role: 'Independent study',
    note: 'Motion, accessibility, and creative technology.',
  },
];

const places = [
  {
    city: 'Tokyo',
    country: 'Japan',
    code: 'TYO',
    tone: 'coral',
    x: '88%',
    y: '35%',
    note: '35.6762° N / 139.6503° E',
  },
  {
    city: 'Lisbon',
    country: 'Portugal',
    code: 'LIS',
    tone: 'lime',
    x: '45%',
    y: '36%',
    note: '38.7223° N / 9.1393° W',
  },
  {
    city: 'Singapore',
    country: 'Singapore',
    code: 'SIN',
    tone: 'blue',
    x: '79%',
    y: '62%',
    note: '1.3521° N / 103.8198° E',
  },
  {
    city: 'Melbourne',
    country: 'Australia',
    code: 'MEL',
    tone: 'yellow',
    x: '84%',
    y: '79%',
    note: '37.8136° S / 144.9631° E',
  },
  {
    city: 'New York',
    country: 'USA',
    code: 'NYC',
    tone: 'violet',
    x: '25%',
    y: '38%',
    note: '40.7128° N / 74.0060° W',
  },
];

const contributionLevels = Array.from({ length: 364 }, (_, index) => {
  if ((index + Math.floor(index / 7)) % 11 === 0) return 4;
  if ((index * 7 + 3) % 17 === 0) return 3;
  if ((index * 5 + 1) % 13 === 0) return 2;
  if ((index + 6) % 7 === 0 || index % 19 === 0) return 1;
  return 0;
});

const gameTargets = [
  { x: 78, y: 24 },
  { x: 64, y: 72 },
  { x: 28, y: 32 },
  { x: 84, y: 55 },
  { x: 45, y: 18 },
  { x: 18, y: 74 },
];

const gameRewards = [
  { score: 5, label: 'Scout shell', signal: 'Lime field activated' },
  { score: 10, label: 'Current rider', signal: 'Blue current activated' },
  { score: 15, label: 'Orbit keeper', signal: 'Multiverse field activated' },
];

const contactSignals = [
  {
    code: '01',
    label: 'Email',
    detail: 'Direct line',
    href: 'mailto:hello@example.com',
    icon: 'mail',
  },
  {
    code: '02',
    label: 'GitHub',
    detail: 'Build archive',
    href: 'https://github.com/',
    icon: 'git',
  },
  {
    code: '03',
    label: 'LinkedIn',
    detail: 'Professional signal',
    href: 'https://linkedin.com/',
    icon: 'people',
  },
  {
    code: '04',
    label: 'Facebook',
    detail: 'Social field',
    href: 'https://facebook.com/',
    icon: 'facebook',
  },
  {
    code: '05',
    label: 'Instagram',
    detail: 'Visual journal',
    href: 'https://instagram.com/',
    icon: 'instagram',
  },
];

const movement = {
  w: { x: 0, y: -7 },
  a: { x: -7, y: 0 },
  s: { x: 0, y: 7 },
  d: { x: 7, y: 0 },
};

function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const languageTimer = window.setInterval(() => {
      setIndex((current) => (current + 1) % greetings.length);
    }, 460);
    const exitTimer = window.setTimeout(onComplete, 3300);
    return () => {
      window.clearInterval(languageTimer);
      window.clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <dialog
      open
      className="boot-screen"
      aria-label="Welcome screen"
      aria-live="polite"
    >
      <div className="boot-chrome">
        <span>PORTFOLIO OS</span>
        <span>HELLO / {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="boot-orbit" aria-hidden="true">
        <Turtle />
      </div>
      <div className="boot-message" key={greetings[index].word}>
        <p>{greetings[index].language}</p>
        <strong>{greetings[index].word}</strong>
        <span>Swipe up to enter this small universe</span>
      </div>
      <button className="boot-skip" onClick={onComplete}>
        Skip intro <ArrowUpRight />
      </button>
      <div className="boot-progress">
        <span />
      </div>
    </dialog>
  );
}

function Timeline({ items }: { items: typeof workTimeline }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <article className="timeline-row" key={`${item.year}-${item.title}`}>
          <span className="timeline-node" />
          <time>{item.year}</time>
          <div>
            <h4>{item.title}</h4>
            <p>{item.role}</p>
            <small>{item.note}</small>
          </div>
        </article>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className={`project-card project-${project.accent}`}>
      <div className="project-topline">
        <span>{project.index}</span>
        <span>{project.kind}</span>
        <ArrowUpRight />
      </div>
      <div className="project-visual" aria-hidden="true">
        <span className="visual-axis axis-x" />
        <span className="visual-axis axis-y" />
        <span className="visual-core" />
        <span className="visual-orbit ring-a" />
        <span className="visual-orbit ring-b" />
        <span className="visual-label">OPEN / CASE FILE</span>
      </div>
      <div className="project-copy">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-list">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <span className="project-coordinates">{project.coordinates}</span>
    </article>
  );
}

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePlace, setActivePlace] = useState(0);
  const [studioTime, setStudioTime] = useState('00:00');
  const [studioDate, setStudioDate] = useState('Loading local date');
  const [studioDay, setStudioDay] = useState({
    progress: 0,
    phase: 'Calibrating',
  });
  const [visitorTime, setVisitorTime] = useState('00:00');
  const [visitorDate, setVisitorDate] = useState('Detecting local date');
  const [visitorZone, setVisitorZone] = useState('Your timezone');
  const [timeDifference, setTimeDifference] = useState('Comparing clocks');
  const [activeContact, setActiveContact] = useState(0);
  const [gamePosition, setGamePosition] = useState({ x: 18, y: 74 });
  const [gameTarget, setGameTarget] = useState(gameTargets[0]);
  const [gameScore, setGameScore] = useState(0);
  const [gameCatches, setGameCatches] = useState(0);
  const [gameMessage, setGameMessage] = useState(
    'Catch three signals to open a multiverse current.',
  );
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [rewardBurst, setRewardBurst] = useState<
    (typeof gameRewards)[number] | null
  >(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const rewardTimerRef = useRef<number | null>(null);
  const gameRewardLevel =
    gameScore >= 15
      ? 'orbit'
      : gameScore >= 10
        ? 'current'
        : gameScore >= 5
          ? 'scout'
          : 'base';

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem('portfolio-theme');
      const shouldUseDark = stored
        ? stored === 'dark'
        : window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDark(shouldUseDark);
      document.documentElement.classList.toggle('dark', shouldUseDark);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).formatToParts(now);
      const hour =
        Number(parts.find((part) => part.type === 'hour')?.value ?? 0) % 24;
      const minute = Number(
        parts.find((part) => part.type === 'minute')?.value ?? 0,
      );
      const second = Number(
        parts.find((part) => part.type === 'second')?.value ?? 0,
      );
      const progress = ((hour * 3600 + minute * 60 + second) / 86400) * 100;
      const localZone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local timezone';
      const localParts = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).formatToParts(now);
      const localHour =
        Number(localParts.find((part) => part.type === 'hour')?.value ?? 0) %
        24;
      const localMinute = Number(
        localParts.find((part) => part.type === 'minute')?.value ?? 0,
      );
      const rawDifference = localHour * 60 + localMinute - (hour * 60 + minute);
      const normalizedDifference =
        ((((rawDifference + 720) % 1440) + 1440) % 1440) - 720;
      const differenceHours = Math.floor(Math.abs(normalizedDifference) / 60);
      const differenceMinutes = Math.abs(normalizedDifference) % 60;
      const readableDifference =
        `${differenceHours ? `${differenceHours}h ` : ''}${differenceMinutes ? `${differenceMinutes}m ` : ''}`.trim();

      setStudioTime(
        `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
      );
      setStudioDate(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Manila',
          weekday: 'short',
          day: '2-digit',
          month: 'short',
        })
          .format(now)
          .toUpperCase(),
      );
      setStudioDay({
        progress,
        phase:
          hour < 6
            ? 'Night notes'
            : hour < 12
              ? 'Morning fieldwork'
              : hour < 18
                ? 'Afternoon build'
                : 'Evening studio',
      });
      setVisitorTime(
        `${String(localHour).padStart(2, '0')}:${String(localMinute).padStart(2, '0')}`,
      );
      setVisitorDate(
        new Intl.DateTimeFormat('en-GB', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
        })
          .format(now)
          .toUpperCase(),
      );
      setVisitorZone(
        localZone.split('/').pop()?.replaceAll('_', ' ') ?? 'Local timezone',
      );
      setTimeDifference(
        normalizedDifference === 0
          ? 'Our clocks are aligned'
          : `Studio is ${readableDifference} ${normalizedDifference > 0 ? 'behind you' : 'ahead of you'}`,
      );
    };
    updateClock();
    const timer = window.setInterval(updateClock, 15000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(
    () => () => {
      if (audioContextRef.current) void audioContextRef.current.close();
      if (rewardTimerRef.current) window.clearTimeout(rewardTimerRef.current);
    },
    [],
  );

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    window.localStorage.setItem('portfolio-theme', next ? 'dark' : 'light');
  };

  const replayHello = () => setBooting(true);

  const playKeyClick = useCallback(
    (key: keyof typeof movement) => {
      if (!soundEnabled) return;

      const context = audioContextRef.current ?? new AudioContext();
      audioContextRef.current = context;
      if (context.state === 'suspended') void context.resume();

      const start = context.currentTime;
      const tone = context.createOscillator();
      const toneGain = context.createGain();
      const clickBuffer = context.createBuffer(
        1,
        Math.floor(context.sampleRate * 0.035),
        context.sampleRate,
      );
      const clickData = clickBuffer.getChannelData(0);
      const click = context.createBufferSource();
      const clickGain = context.createGain();
      const pitches = { w: 420, a: 330, s: 285, d: 365 };

      for (let index = 0; index < clickData.length; index += 1) {
        clickData[index] =
          (Math.random() * 2 - 1) * (1 - index / clickData.length);
      }

      tone.type = 'triangle';
      tone.frequency.setValueAtTime(pitches[key], start);
      tone.frequency.exponentialRampToValueAtTime(
        pitches[key] * 0.58,
        start + 0.045,
      );
      toneGain.gain.setValueAtTime(0.035, start);
      toneGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.055);
      click.buffer = clickBuffer;
      clickGain.gain.setValueAtTime(0.045, start);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.035);

      tone.connect(toneGain).connect(context.destination);
      click.connect(clickGain).connect(context.destination);
      tone.start(start);
      click.start(start);
      tone.stop(start + 0.06);
    },
    [soundEnabled],
  );

  const moveGame = useCallback(
    (key: keyof typeof movement) => {
      const next = {
        x: Math.min(93, Math.max(7, gamePosition.x + movement[key].x)),
        y: Math.min(88, Math.max(12, gamePosition.y + movement[key].y)),
      };
      const reachedTarget =
        Math.hypot(next.x - gameTarget.x, next.y - gameTarget.y) < 12;

      if (!reachedTarget) {
        setGamePosition(next);
        return;
      }

      const nextCatch = gameCatches + 1;
      const isMultiverseCatch = nextCatch % 3 === 0;
      const pointsEarned = isMultiverseCatch ? 3 : 1;
      const nextScore = gameScore + pointsEarned;
      const unlockedReward = gameRewards.find(
        (reward) => gameScore < reward.score && nextScore >= reward.score,
      );
      if (unlockedReward) {
        if (rewardTimerRef.current) window.clearTimeout(rewardTimerRef.current);
        setRewardBurst(unlockedReward);
        rewardTimerRef.current = window.setTimeout(
          () => setRewardBurst(null),
          2100,
        );
      }
      setGameCatches(nextCatch);
      setGameScore(nextScore);
      setGameTarget(gameTargets[nextCatch % gameTargets.length]);
      setGameMessage(
        unlockedReward
          ? `${unlockedReward.label.toUpperCase()} UNLOCKED — ${unlockedReward.signal}.`
          : isMultiverseCatch
            ? 'MULTIVERSE CURRENT! +3 points and a surprise teleport.'
            : `${3 - (nextCatch % 3)} signal${3 - (nextCatch % 3) === 1 ? '' : 's'} until the next multiverse bonus.`,
      );
      setGamePosition(
        isMultiverseCatch ? { x: 100 - next.x, y: 100 - next.y } : next,
      );
    },
    [gameCatches, gamePosition, gameScore, gameTarget],
  );

  const tapGameKey = (key: keyof typeof movement) => {
    setActiveKey(key);
    playKeyClick(key);
    moveGame(key);
    window.setTimeout(
      () => setActiveKey((current) => (current === key ? null : current)),
      130,
    );
  };

  const resetGame = () => {
    if (rewardTimerRef.current) window.clearTimeout(rewardTimerRef.current);
    rewardTimerRef.current = null;
    setRewardBurst(null);
    setGamePosition({ x: 18, y: 74 });
    setGameTarget(gameTargets[0]);
    setGameScore(0);
    setGameCatches(0);
    setGameMessage('Catch three signals to open a multiverse current.');
    setActiveKey(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase() as keyof typeof movement;
      if (!(key in movement) || event.repeat) return;
      event.preventDefault();
      setActiveKey(key);
      playKeyClick(key);
      moveGame(key);
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key in movement) setActiveKey(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [moveGame, playKeyClick]);

  return (
    <main
      className={`site-shell ${rewardBurst ? 'is-global-celebrating' : ''}`}
      data-game-reward={gameRewardLevel}
    >
      {booting && <BootScreen onComplete={() => setBooting(false)} />}

      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Back to the top">
          <span className="wordmark-dot" />
          JR / 04
        </a>
        <nav className="nav-pill" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#signals">Signals</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="top-actions">
          <Button
            className="theme-button replay-button"
            variant="outline"
            size="icon"
            onClick={replayHello}
            aria-label="Replay multilingual welcome"
          >
            <Languages />
          </Button>
          <Button
            className="theme-button"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? 'light' : 'dark'} mode`}
          >
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Button
            className="contact-button"
            nativeButton={false}
            render={
              <a
                href="mailto:hello@example.com"
                aria-label="Email hello@example.com"
              />
            }
          >
            <Mail /> Say hello
          </Button>
          <Button
            className="menu-button"
            variant="outline"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {['work', 'about', 'signals', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
                <ArrowUpRight />
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="hero" id="top">
        <div className="hero-index" aria-hidden="true">
          01 — ARRIVAL
        </div>
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> Portfolio / selected realities
          </p>
          <h1 className="glitch-title" data-text="JETHRO RENDON">
            <span>JETHRO</span> <span>RENDON</span>
          </h1>
          <p className="hero-role">
            Creative developer <em>&amp;</em> digital explorer.
          </p>
          <p className="hero-intro">
            I design expressive interfaces and build them with production-grade
            code— finding the useful path between systems, stories, and a little
            curiosity.
          </p>
          <div className="hero-cta-row">
            <Button
              className="primary-cta resume-button"
              nativeButton={false}
              render={
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="View resume PDF"
                />
              }
            >
              Resume <FileText />
            </Button>
            <span className="availability">
              <i /> Available for thoughtful projects
            </span>
          </div>
        </div>

        <aside className="profile-orbit" aria-label="Profile summary">
          <div className="orbit orbit-one">
            <Turtle aria-hidden="true" />
          </div>
          <div className="orbit orbit-two">
            <Turtle aria-hidden="true" />
          </div>
          <div className="profile-card">
            <div className="profile-photo">
              <Image
                src="/tarts.jpeg"
                alt="Portrait of Jethro Rendon"
                fill
                sizes="(max-width: 720px) 46vw, 244px"
                className="profile-photo-image"
                loading="eager"
              />
            </div>
            <div className="profile-card-copy">
              <span className="profile-kicker">Profile / 01</span>
              <strong>JETHRO RENDON</strong>
              <span className="profile-note">
                Creative developer
                <br />
                Philippines · GMT +08
              </span>
            </div>
          </div>
          <span className="orbit-caption">
            Portrait signal · two tiny guides in orbit
          </span>
        </aside>

        <div className="hero-meta">
          <span>Scroll to explore</span>
          <span>02° 12′ N &nbsp; 102° 15′ E</span>
        </div>
      </section>

      <div className="signal-ticker" aria-hidden="true">
        <div>
          <span>DESIGN WITH A POINT OF VIEW</span>
          <Turtle />
          <span>CODE WITH CARE</span>
          <Turtle />
          <span>STAY CURIOUS</span>
          <Turtle />
          <span>DESIGN WITH A POINT OF VIEW</span>
        </div>
      </div>

      <section className="section-block work-section" id="work">
        <div className="section-heading">
          <span className="section-number">02</span>
          <div>
            <p>Selected work</p>
            <h2>
              Case files from
              <br />
              <em>useful universes.</em>
            </h2>
          </div>
          <p className="section-aside">
            Three explorations across product thinking, visual systems, and
            frontend craft.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.title} />
          ))}
        </div>
        <p className="sample-note">
          Representative project content—replace titles and links with your real
          work.
        </p>
      </section>

      <section className="section-block about-section" id="about">
        <div className="section-heading compact-heading">
          <span className="section-number">03</span>
          <div>
            <p>About / practice</p>
            <h2>
              One person.
              <br />
              <em>Several disciplines.</em>
            </h2>
          </div>
        </div>

        <div className="about-grid">
          <article className="about-statement panel-cut">
            <p className="panel-label">FIELD NOTE / 001</p>
            <h3>
              I like software with a pulse: clear enough to trust, strange
              enough to remember.
            </h3>
            <p>
              I move between interface design and frontend engineering,
              translating ideas into systems that feel coherent from the first
              sketch to the final interaction.
            </p>
            <div className="stack-cloud">
              {[
                'TypeScript',
                'React',
                'Next.js',
                'Node.js',
                'Motion',
                'Figma',
                'Design systems',
                'Accessibility',
              ].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <div className="about-turtle">
              <Turtle />
              <span>Resident quality inspector</span>
            </div>
          </article>

          <article className="experience-panel panel-cut">
            <p className="panel-label">TIMELINE / EXPERIENCE</p>
            <Tabs defaultValue="work">
              <TabsList className="timeline-tabs">
                <TabsTrigger value="work">
                  <Briefcase /> Work
                </TabsTrigger>
                <TabsTrigger value="study">
                  <GraduationCap /> Studies
                </TabsTrigger>
              </TabsList>
              <TabsContent value="work">
                <Timeline items={workTimeline} />
              </TabsContent>
              <TabsContent value="study">
                <Timeline items={studyTimeline} />
              </TabsContent>
            </Tabs>
          </article>

          <article className="now-panel panel-cut">
            <div className="dual-clock">
              <div className="time-readout is-studio">
                <p className="panel-label">
                  <i /> MY STUDIO / PHILIPPINES
                </p>
                <strong>{studioTime}</strong>
                <span>GMT +08 · {studioDate}</span>
              </div>
              <div className="clock-bridge">
                <span>{timeDifference}</span>
                <i />
              </div>
              <div className="time-readout is-visitor">
                <p className="panel-label">WHERE YOU ARE / {visitorZone}</p>
                <strong>{visitorTime}</strong>
                <span>{visitorDate} · Your local time</span>
              </div>
            </div>
            <div className="studio-cycle">
              <div className="studio-cycle-heading">
                <span>{studioDate}</span>
                <b>{studioDay.phase}</b>
              </div>
              <div
                className="studio-day-track"
                aria-label={`${Math.round(studioDay.progress)} percent through the day in the Philippines`}
              >
                <span style={{ width: `${studioDay.progress}%` }} />
                <i style={{ left: `${studioDay.progress}%` }} />
              </div>
              <div className="studio-day-marks">
                <span>00</span>
                <span>06</span>
                <span>12</span>
                <span>18</span>
                <span>24</span>
              </div>
            </div>
            <span className="status-line">
              <i /> Now: shaping interfaces &amp; collecting field notes.
            </span>
          </article>

          <article className="principle-panel panel-cut">
            <Sparkles />
            <p>
              “Make it useful. Then make the useful thing unmistakably yours.”
            </p>
          </article>
        </div>
      </section>

      <section className="section-block signals-section" id="signals">
        <div className="section-heading">
          <span className="section-number">04</span>
          <div>
            <p>Signals / traces</p>
            <h2>
              Proof of practice,
              <br />
              <em>paths through the world.</em>
            </h2>
          </div>
          <p className="section-aside">
            A compact readout of coding rhythm and travel memories—designed to
            become live with your data.
          </p>
        </div>

        <div className="signals-grid">
          <article className="contribution-panel panel-cut">
            <div className="signal-card-heading">
              <div>
                <GitBranch />
                <span>
                  <small>GITHUB SIGNAL</small>
                  <strong>Contribution field</strong>
                </span>
              </div>
              <a href="https://github.com/" aria-label="Open GitHub profile">
                Profile <ExternalLink />
              </a>
            </div>
            <div className="contribution-meta">
              <strong>684</strong>
              <span>contributions in this display year</span>
              <em>2026</em>
            </div>
            <div
              className="heatmap-wrap"
              aria-label="Representative GitHub contribution heatmap"
            >
              <div className="heatmap">
                {contributionLevels.map((level, index) => (
                  <i
                    key={index}
                    data-level={level}
                    title={`Day ${index + 1}: ${level} contribution level`}
                  />
                ))}
              </div>
            </div>
            <div className="heatmap-legend">
              <span>Quiet</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <i key={level} data-level={level} />
              ))}
              <span>Built</span>
            </div>
            <p className="data-note">
              Demo pattern · connect your GitHub username for live activity.
            </p>
          </article>

          <article className="travel-panel panel-cut">
            <div className="signal-card-heading">
              <div>
                <Globe2 />
                <span>
                  <small>FIELD LOG</small>
                  <strong>Places visited</strong>
                </span>
              </div>
              <span className="place-count">05 PLACES</span>
            </div>
            <div
              className="map-field"
              aria-label="Interactive flat world map showing visited places"
            >
              <div className="map-surface">
                <div className="map-artwork">
                  <Image
                    src="/travel-map-2d.png"
                    alt="A flat dark blue world map"
                    width={1536}
                    height={1024}
                    sizes="(max-width: 1100px) calc(100vw - 48px), 50vw"
                  />
                </div>
                {places.map((place, index) => (
                  <button
                    key={place.code}
                    className={`map-pin ${activePlace === index ? 'is-active' : ''}`}
                    data-tone={place.tone}
                    style={{ left: place.x, top: place.y }}
                    onClick={() => setActivePlace(index)}
                    aria-label={`Show ${place.city}, ${place.country}`}
                    aria-pressed={activePlace === index}
                  >
                    <span>{place.code}</span>
                    <small>{place.city}</small>
                  </button>
                ))}
              </div>
              <span className="map-legend">
                <i /> Solid color / visited
              </span>
            </div>
            <div className="active-place">
              <MapPin />
              <span>
                <small>Selected coordinate</small>
                <strong>
                  {places[activePlace].city}, {places[activePlace].country}
                </strong>
                <em>{places[activePlace].note}</em>
              </span>
            </div>
            <p className="data-note">
              Demo journeys · swap these pins for the places you have explored.
            </p>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">
            <span /> Transmission open
          </p>
          <h2>
            Have a good problem?
            <br />
            <em>Let’s make it tangible.</em>
          </h2>
          <div className="contact-links">
            <Button
              className="primary-cta"
              nativeButton={false}
              render={
                <a
                  href="mailto:hello@example.com"
                  aria-label="Email hello@example.com"
                />
              }
            >
              hello@example.com <ArrowUpRight />
            </Button>
            <a href="https://github.com/">
              <GitBranch /> GitHub
            </a>
            <a href="https://linkedin.com/">
              <Users /> LinkedIn
            </a>
          </div>
        </div>
        <div className="contact-radar" aria-label="Choose a contact channel">
          <i className="radar-ring ring-one" aria-hidden="true" />
          <i className="radar-ring ring-two" aria-hidden="true" />
          <i className="radar-axis axis-horizontal" aria-hidden="true" />
          <i className="radar-axis axis-vertical" aria-hidden="true" />
          <Turtle aria-hidden="true" />
          <div className="contact-channel-list">
            {contactSignals.map((signal, index) => (
              <a
                href={signal.href}
                target={signal.icon === 'mail' ? undefined : '_blank'}
                rel={signal.icon === 'mail' ? undefined : 'noreferrer'}
                key={signal.code}
                className={`contact-node ${activeContact === index ? 'is-active' : ''}`}
                onClick={() => setActiveContact(index)}
                onMouseEnter={() => setActiveContact(index)}
                onFocus={() => setActiveContact(index)}
                aria-label={`Open ${signal.label}`}
              >
                {signal.icon === 'mail' ? (
                  <Mail />
                ) : signal.icon === 'git' ? (
                  <GitBranch />
                ) : signal.icon === 'people' ? (
                  <Users />
                ) : (
                  <span className="social-glyph">
                    {signal.icon === 'facebook' ? 'f' : 'ig'}
                  </span>
                )}
              </a>
            ))}
          </div>
          <a
            className="channel-readout"
            href={contactSignals[activeContact].href}
            target={activeContact === 0 ? undefined : '_blank'}
            rel={activeContact === 0 ? undefined : 'noreferrer'}
          >
            <small>CHANNEL / {contactSignals[activeContact].code}</small>
            <strong>{contactSignals[activeContact].label}</strong>
            <span>
              {contactSignals[activeContact].detail} <ArrowUpRight />
            </span>
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <section
          className={`footer-game ${rewardBurst ? 'is-celebrating' : ''}`}
          data-reward={gameRewardLevel}
          aria-labelledby="turtle-drift-title"
        >
          <div className="game-copy">
            <p className="eyebrow">
              <span /> Pocket arcade / 01
            </p>
            <h2 id="turtle-drift-title">Turtle Drift</h2>
            <p>
              Guide the turtle into the coral signal using the controls here—or
              press W, A, S, D.
            </p>
            <p className="game-notice" aria-live="polite">
              {gameMessage}
            </p>
            <div className="game-controls-row">
              <div
                className="wasd-console"
                aria-label="Turtle Drift game controls"
              >
                <p>
                  <span>WASD / PILOT</span>
                  <button
                    type="button"
                    className="sound-toggle"
                    onClick={() => setSoundEnabled((enabled) => !enabled)}
                    aria-label={
                      soundEnabled
                        ? 'Mute keyboard sounds'
                        : 'Turn on keyboard sounds'
                    }
                    aria-pressed={soundEnabled}
                  >
                    {soundEnabled ? <Volume2 /> : <VolumeX />}
                    {soundEnabled ? 'Sound on' : 'Sound off'}
                  </button>
                </p>
                <div className="wasd-keys">
                  {(['w', 'a', 's', 'd'] as const).map((key) => (
                    <button
                      type="button"
                      key={key}
                      className={activeKey === key ? 'is-pressed' : ''}
                      onClick={() => tapGameKey(key)}
                      aria-label={`Move ${key === 'w' ? 'up' : key === 'a' ? 'left' : key === 's' ? 'down' : 'right'}`}
                    >
                      {key.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="game-score" aria-live="polite">
                <span>
                  <b>Field points</b>
                  <small>{gameCatches} catches</small>
                </span>
                <strong>{String(gameScore).padStart(2, '0')}</strong>
                <button
                  type="button"
                  className="game-reset"
                  onClick={resetGame}
                  disabled={gameScore === 0}
                >
                  <RotateCcw /> Reset
                </button>
              </div>
            </div>
            <div className="reward-track" aria-label="Turtle Drift rewards">
              {gameRewards.map((reward) => (
                <span
                  className={gameScore >= reward.score ? 'is-unlocked' : ''}
                  key={reward.label}
                >
                  <small>{reward.score} PTS</small>
                  {reward.label}
                </span>
              ))}
            </div>
          </div>
          <div className="game-board">
            <span className="game-grid-label label-n">N / 00</span>
            <span className="game-grid-label label-e">E / 90</span>
            {rewardBurst && (
              <output className="reward-burst">
                <Sparkles />
                <small>Reward unlocked</small>
                <strong>{rewardBurst.label}</strong>
              </output>
            )}
            {(gameCatches + 1) % 3 === 0 && (
              <span className="bonus-alert">MULTIVERSE / +3</span>
            )}
            <span
              className={`game-target ${(gameCatches + 1) % 3 === 0 ? 'is-bonus' : ''}`}
              style={{ left: `${gameTarget.x}%`, top: `${gameTarget.y}%` }}
              aria-hidden="true"
            />
            <span
              className="game-turtle"
              style={{ left: `${gamePosition.x}%`, top: `${gamePosition.y}%` }}
              aria-hidden="true"
            >
              <Turtle />
            </span>
            <span className="game-trail" aria-hidden="true" />
          </div>
        </section>
        <div className="footer-meta">
          <span>© 2026 / JETHRO RENDON</span>
          <span>Designed with curiosity · built with care</span>
          <a href="#top">
            Back to top <ArrowUpRight />
          </a>
        </div>
      </footer>
    </main>
  );
}
