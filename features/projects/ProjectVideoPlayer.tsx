'use client';

import * as React from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';

interface ProjectVideoPlayerProps {
  project: Project;
  onOpenCinema?: (project: Project) => void;
  className?: string;
  autoPlayInline?: boolean;
}

export function ProjectVideoPlayer({
  project,
  onOpenCinema,
  className,
}: ProjectVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser blocks autoplay with sound, retry or open cinema
          setIsPlaying(false);
        });
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (!project.videoUrl) {
    return project.previewImage ? (
      <div className="relative w-full rounded-xl overflow-hidden border border-[#39FF14]/30 shadow-[0_0_30px_rgba(57,255,20,0.15)] bg-[#030503]">
        <Image
          src={project.previewImage}
          alt={`${project.name} Architecture Preview`}
          width={600}
          height={340}
          unoptimized
          style={{ width: '100%', height: 'auto', aspectRatio: '600 / 340' }}
          className="w-full h-auto object-cover"
        />
      </div>
    ) : null;
  }

  return (
    <div
      className={cn(
        'group relative w-full rounded-xl overflow-hidden border border-[#39FF14]/30 shadow-[0_0_30px_rgba(57,255,20,0.18)] bg-[#030503] transition-all duration-300 hover:border-[#39FF14]/70',
        className,
      )}
    >
      {/* 1080p Full HD Badge */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#060806]/90 border border-[#39FF14]/40 backdrop-blur-md text-[10px] font-mono font-semibold text-[#39FF14] pointer-events-none shadow-[0_0_15px_rgba(57,255,20,0.2)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
        <span>1080p Full HD</span>
        {project.videoDuration && (
          <span className="text-muted-foreground/90 ml-1">· {project.videoDuration}</span>
        )}
      </div>

      {/* Expand to Cinema Mode Button */}
      {onOpenCinema && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenCinema(project);
          }}
          className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-[#060806]/90 border border-[#39FF14]/40 hover:border-[#39FF14] hover:bg-[#39FF14]/20 text-muted-foreground hover:text-[#39FF14] backdrop-blur-md transition-all shadow-[0_0_15px_rgba(57,255,20,0.2)] cursor-pointer"
          title="Open in Cinema Theatre Mode"
          aria-label="Expand to Cinema Mode"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* HTML5 Native Video Tag */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src={project.videoUrl}
          poster={project.previewImage}
          preload="metadata"
          playsInline
          controls={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-full object-contain"
        />

        {/* Custom Neon Play Overlay when Paused */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 hover:bg-black/25 backdrop-blur-[1px] transition-all cursor-pointer group/overlay"
          >
            {/* Play Button Pulsing Ring */}
            <div className="relative flex items-center justify-center mb-3">
              <div className="absolute inset-0 rounded-full bg-[#39FF14]/20 animate-ping" />
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#39FF14] text-[#030503] flex items-center justify-center shadow-[0_0_40px_rgba(57,255,20,0.7)] group-hover/overlay:scale-110 group-hover/overlay:shadow-[0_0_55px_rgba(57,255,20,0.9)] transition-all duration-300">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#030503] ml-1" />
              </div>
            </div>

            <div className="text-center px-4">
              <span className="text-xs sm:text-sm font-heading font-extrabold text-white tracking-wide drop-shadow-md block">
                Watch High-Definition Walkthrough
              </span>
              <span className="text-[11px] font-mono text-[#39FF14] flex items-center justify-center gap-1 mt-1 drop-shadow-sm">
                <Zap className="w-3 h-3 fill-[#39FF14]" />
                Click to Play Full 1080p Video
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
