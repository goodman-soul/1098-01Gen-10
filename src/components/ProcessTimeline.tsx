import { CheckCircle2, Circle, Clock, Package, Eye, Store } from 'lucide-react';
import type { AppraisalStatus } from '@/types';
import { STATUS_STEPS } from '@/types';

interface ProcessTimelineProps {
  currentStatus: AppraisalStatus;
}

const STEP_ICONS = [Clock, Eye, Package, Package, CheckCircle2, Store];

export default function ProcessTimeline({ currentStatus }: ProcessTimelineProps) {
  const currentIndex = STATUS_STEPS.findIndex((s) => s.status === currentStatus);
  const effectiveIndex = currentIndex === -1 ? 0 : currentIndex;

  const getStepStatus = (index: number) => {
    if (index < effectiveIndex) return 'completed';
    if (index === effectiveIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="py-4">
      <div className="relative">
        <div className="hidden md:block absolute left-8 right-8 top-8 h-px">
          <div
            className="h-full bg-gradient-to-r from-transparent via-charcoal-700 to-transparent"
          />
          <div
            className="h-full bg-gradient-to-r from-champagne-500 via-champagne-400 to-champagne-500 absolute top-0 left-0 transition-all duration-700"
            style={{
              width: `${(effectiveIndex / (STATUS_STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-2">
          {STATUS_STEPS.map((step, index) => {
            const status = getStepStatus(index);
            const Icon = STEP_ICONS[index];

            return (
              <div key={step.status} className="relative flex flex-col items-center">
                <div className="relative z-10 mb-3">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      status === 'completed'
                        ? 'bg-champagne-500/20 border-2 border-champagne-400 shadow-gold'
                        : status === 'current'
                        ? 'bg-charcoal-800 border-2 border-champagne-400'
                        : 'bg-charcoal-900/60 border-2 border-charcoal-700'
                    }`}
                  >
                    {status === 'current' && (
                      <div className="absolute inset-0 rounded-full border-2 border-champagne-400/50 animate-ring-expand" />
                    )}
                    {status === 'completed' ? (
                      <CheckCircle2
                        className="w-7 h-7 text-champagne-400"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <Icon
                        className={`w-7 h-7 ${
                          status === 'current'
                            ? 'text-champagne-400 animate-pulse'
                            : 'text-charcoal-500'
                        }`}
                        strokeWidth={1.8}
                      />
                    )}
                  </div>
                  <div
                    className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      status === 'completed'
                        ? 'bg-champagne-500 text-charcoal-950'
                        : status === 'current'
                        ? 'bg-champagne-500/80 text-charcoal-950 animate-pulse'
                        : 'bg-charcoal-800 text-charcoal-500'
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`font-display text-base font-semibold mb-1 ${
                      status === 'pending' ? 'text-charcoal-500' : 'text-champagne-300'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div
                    className={`text-xs font-serif-body leading-relaxed max-w-[140px] mx-auto ${
                      status === 'pending'
                        ? 'text-charcoal-600'
                        : status === 'current'
                        ? 'text-charcoal-300'
                        : 'text-charcoal-400'
                    }`}
                  >
                    {step.desc}
                  </div>
                </div>
                {index < STATUS_STEPS.length - 1 && (
                  <div className="md:hidden w-px h-8 mt-2 bg-gradient-to-b from-charcoal-600 to-charcoal-800" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
