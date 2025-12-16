import React, { useState, useEffect, useRef } from 'react';

const COLORS = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    thread1: '#3b82f6',
    thread1Light: '#60a5fa',
    thread2: '#10b981',
    thread2Light: '#34d399',
    danger: '#ef4444',
    dangerLight: '#f87171',
    success: '#10b981',
    warning: '#f59e0b',
    purple: '#a855f7',
    purpleLight: '#c084fc',
};

export default function CriticalSectionVisual() {
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [scenario, setScenario] = useState('noLock'); // 'noLock' | 'withLock'
    const intervalRef = useRef(null);

    const scenarios = {
        noLock: {
            title: '❌ Lock 없이 진입',
            description: '두 스레드가 동시에 임계 영역 진입 → Race Condition 발생',
            steps: [
                { thread1: 'waiting', thread2: 'waiting', critical: 'empty', message: '두 스레드가 임계 영역 진입 대기 중' },
                { thread1: 'entering', thread2: 'waiting', critical: 'empty', message: 'Thread-1 진입 시도' },
                { thread1: 'entering', thread2: 'entering', critical: 'empty', message: 'Thread-2도 동시에 진입 시도!' },
                { thread1: 'inside', thread2: 'inside', critical: 'conflict', message: '⚠️ 동시 진입! Race Condition 발생' },
                { thread1: 'inside', thread2: 'inside', critical: 'danger', message: '💥 데이터 손상 위험!' },
            ],
            danger: true,
        },
        withLock: {
            title: '✅ Lock으로 보호',
            description: '한 번에 하나의 스레드만 진입 → 안전한 동기화',
            steps: [
                { thread1: 'waiting', thread2: 'waiting', critical: 'empty', lock: 'open', message: 'Lock이 열려 있음 (사용 가능)' },
                { thread1: 'entering', thread2: 'waiting', critical: 'empty', lock: 'open', message: 'Thread-1 Lock 획득 시도' },
                { thread1: 'inside', thread2: 'blocked', critical: 'thread1', lock: 'locked', message: '🔒 Thread-1이 Lock 획득, Thread-2는 대기' },
                { thread1: 'inside', thread2: 'blocked', critical: 'thread1', lock: 'locked', message: 'Thread-1이 안전하게 작업 수행 중' },
                { thread1: 'exiting', thread2: 'blocked', critical: 'empty', lock: 'open', message: 'Thread-1 작업 완료, Lock 해제' },
                { thread1: 'done', thread2: 'entering', critical: 'empty', lock: 'open', message: 'Thread-2 진입 가능' },
                { thread1: 'done', thread2: 'inside', critical: 'thread2', lock: 'locked', message: '🔒 Thread-2가 Lock 획득, 안전하게 작업' },
                { thread1: 'done', thread2: 'exiting', critical: 'empty', lock: 'open', message: '✅ 모든 작업 안전하게 완료!' },
            ],
            danger: false,
        },
    };

    const currentScenario = scenarios[scenario];
    const currentStep = currentScenario.steps[step] || currentScenario.steps[0];
    const maxStep = currentScenario.steps.length - 1;

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        setStep(0);
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, [scenario]);

    const play = () => {
        if (isPlaying) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        setIsPlaying(true);
        if (step >= maxStep) setStep(0);

        intervalRef.current = setInterval(() => {
            setStep(prev => {
                if (prev >= maxStep) {
                    setIsPlaying(false);
                    clearInterval(intervalRef.current);
                    return prev;
                }
                return prev + 1;
            });
        }, 1500);
    };

    const reset = () => {
        setStep(0);
        setIsPlaying(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const getThreadStyle = (state, color, lightColor, position = 'left') => {
        // position: 'left' = Thread-1 (오른쪽으로 이동), 'right' = Thread-2 (왼쪽으로 이동)
        const direction = position === 'left' ? 1 : -1;

        const baseStyle = {
            width: '100px',
            height: '60px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '600',
            transition: 'all 0.4s ease',
            border: `2px solid ${color}`,
        };

        switch (state) {
            case 'waiting':
                return { ...baseStyle, backgroundColor: color + '20', color: lightColor };
            case 'entering':
                return { ...baseStyle, backgroundColor: color + '40', color: lightColor, transform: `translateX(${20 * direction}px)`, boxShadow: `0 0 20px ${color}40` };
            case 'inside':
                return { ...baseStyle, backgroundColor: color, color: 'white', transform: `translateX(${40 * direction}px)`, boxShadow: `0 0 30px ${color}` };
            case 'blocked':
                return { ...baseStyle, backgroundColor: COLORS.danger + '20', borderColor: COLORS.danger, color: COLORS.dangerLight, animation: 'pulse 1s infinite' };
            case 'exiting':
                return { ...baseStyle, backgroundColor: color + '40', color: lightColor, transform: `translateX(${20 * direction}px)` };
            case 'done':
                return { ...baseStyle, backgroundColor: COLORS.success + '20', borderColor: COLORS.success, color: COLORS.success };
            default:
                return baseStyle;
        }
    };

    const getCriticalSectionStyle = () => {
        const baseStyle = {
            width: '180px',
            minHeight: '120px',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            transition: 'all 0.4s ease',
            border: `3px dashed ${COLORS.border}`,
        };

        switch (currentStep.critical) {
            case 'empty':
                return { ...baseStyle, backgroundColor: COLORS.cardBg, borderColor: COLORS.border };
            case 'thread1':
                return { ...baseStyle, backgroundColor: COLORS.thread1 + '20', borderColor: COLORS.thread1, borderStyle: 'solid' };
            case 'thread2':
                return { ...baseStyle, backgroundColor: COLORS.thread2 + '20', borderColor: COLORS.thread2, borderStyle: 'solid' };
            case 'conflict':
                return { ...baseStyle, backgroundColor: COLORS.warning + '30', borderColor: COLORS.warning, borderStyle: 'solid', animation: 'shake 0.3s infinite' };
            case 'danger':
                return { ...baseStyle, backgroundColor: COLORS.danger + '30', borderColor: COLORS.danger, borderStyle: 'solid', boxShadow: `0 0 30px ${COLORS.danger}50` };
            default:
                return baseStyle;
        }
    };

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: COLORS.bg,
            borderRadius: '16px',
            padding: '24px',
            color: COLORS.text,
        }}>
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `}</style>

            {/* 헤더 */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: '0 0 8px 0',
                    background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.warning})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    🚧 임계 영역 (Critical Section) 시뮬레이션
                </h3>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    공유 자원에 대한 동시 접근을 어떻게 제어하는지 확인하세요
                </p>
            </div>

            {/* 시나리오 선택 */}
            <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                marginBottom: '20px',
            }}>
                {Object.entries(scenarios).map(([key, { title }]) => (
                    <button
                        key={key}
                        onClick={() => setScenario(key)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '8px',
                            border: scenario === key ? 'none' : `2px solid ${COLORS.border}`,
                            backgroundColor: scenario === key
                                ? (key === 'noLock' ? COLORS.danger : COLORS.success)
                                : COLORS.cardBg,
                            color: scenario === key ? 'white' : COLORS.textMuted,
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '13px',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        {title}
                    </button>
                ))}
            </div>

            {/* 메인 시각화 영역 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '20px',
            }}>
                {/* 시각화 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '40px',
                    marginBottom: '24px',
                    flexWrap: 'wrap',
                }}>
                    {/* Thread-1 (왼쪽에서 오른쪽으로 이동) */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={getThreadStyle(currentStep.thread1, COLORS.thread1, COLORS.thread1Light, 'left')}>
                            <span>Thread-1</span>
                            <span style={{ fontSize: '10px', marginTop: '4px' }}>
                                {currentStep.thread1 === 'blocked' ? '🚫 대기' :
                                 currentStep.thread1 === 'done' ? '✅ 완료' :
                                 currentStep.thread1 === 'inside' ? '⚡ 실행' :
                                 currentStep.thread1 === 'entering' ? '→ 진입' : '⏳ 대기'}
                            </span>
                        </div>
                    </div>

                    {/* 임계 영역 */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={getCriticalSectionStyle()}>
                            <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '8px' }}>
                                임계 영역
                            </div>
                            <div style={{
                                backgroundColor: COLORS.bg,
                                padding: '8px 12px',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontFamily: 'monospace',
                            }}>
                                <span style={{ color: COLORS.warning }}>count++;</span>
                            </div>
                            {currentStep.critical === 'conflict' && (
                                <div style={{
                                    marginTop: '8px',
                                    fontSize: '20px',
                                    animation: 'shake 0.3s infinite',
                                }}>
                                    ⚠️ 충돌!
                                </div>
                            )}
                            {currentStep.critical === 'danger' && (
                                <div style={{
                                    marginTop: '8px',
                                    fontSize: '20px',
                                }}>
                                    💥
                                </div>
                            )}
                            {scenario === 'withLock' && currentStep.lock && (
                                <div style={{
                                    marginTop: '12px',
                                    fontSize: '24px',
                                }}>
                                    {currentStep.lock === 'locked' ? '🔒' : '🔓'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Thread-2 (오른쪽에서 왼쪽으로 이동) */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={getThreadStyle(currentStep.thread2, COLORS.thread2, COLORS.thread2Light, 'right')}>
                            <span>Thread-2</span>
                            <span style={{ fontSize: '10px', marginTop: '4px' }}>
                                {currentStep.thread2 === 'blocked' ? '🚫 대기' :
                                 currentStep.thread2 === 'done' ? '✅ 완료' :
                                 currentStep.thread2 === 'inside' ? '⚡ 실행' :
                                 currentStep.thread2 === 'entering' ? '← 진입' : '⏳ 대기'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 상태 메시지 */}
                <div style={{
                    textAlign: 'center',
                    padding: '12px 20px',
                    backgroundColor: currentScenario.danger && step >= 3
                        ? COLORS.danger + '20'
                        : scenario === 'withLock' && currentStep.lock === 'locked'
                            ? COLORS.success + '20'
                            : COLORS.bg,
                    borderRadius: '8px',
                    color: currentScenario.danger && step >= 3
                        ? COLORS.dangerLight
                        : COLORS.text,
                    fontWeight: '500',
                }}>
                    {currentStep.message}
                </div>
            </div>

            {/* 컨트롤 */}
            <div style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
            }}>
                <button
                    onClick={play}
                    style={{
                        backgroundColor: isPlaying ? COLORS.warning : COLORS.thread1,
                        color: 'white',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                    }}
                >
                    {isPlaying ? '⏸️ 일시정지' : '▶️ 재생'}
                </button>
                <button
                    onClick={reset}
                    style={{
                        backgroundColor: COLORS.cardBg,
                        color: COLORS.text,
                        border: `2px solid ${COLORS.border}`,
                        padding: '10px 24px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                    }}
                >
                    🔄 처음부터
                </button>
            </div>

            {/* 진행 표시 */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '20px',
            }}>
                {currentScenario.steps.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => { setStep(idx); setIsPlaying(false); if (intervalRef.current) clearInterval(intervalRef.current); }}
                        style={{
                            width: '32px',
                            height: '6px',
                            borderRadius: '3px',
                            backgroundColor: idx <= step
                                ? (currentScenario.danger ? COLORS.danger : COLORS.success)
                                : COLORS.border,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                    />
                ))}
            </div>

            {/* 개념 설명 */}
            <div style={{
                backgroundColor: COLORS.purple + '15',
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${COLORS.purple}40`,
            }}>
                <h4 style={{ margin: '0 0 12px 0', color: COLORS.purpleLight, fontSize: '14px' }}>
                    📚 핵심 개념
                </h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    fontSize: '13px',
                }}>
                    <div style={{
                        backgroundColor: COLORS.bg,
                        padding: '12px',
                        borderRadius: '8px',
                    }}>
                        <div style={{ color: COLORS.warning, fontWeight: '600', marginBottom: '4px' }}>
                            🚧 임계 영역 (Critical Section)
                        </div>
                        <div style={{ color: COLORS.textMuted, lineHeight: '1.5' }}>
                            공유 자원에 접근하는 코드 블록. 동시 접근 시 데이터 무결성 위험
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: COLORS.bg,
                        padding: '12px',
                        borderRadius: '8px',
                    }}>
                        <div style={{ color: COLORS.thread1Light, fontWeight: '600', marginBottom: '4px' }}>
                            🔒 상호 배제 (Mutual Exclusion)
                        </div>
                        <div style={{ color: COLORS.textMuted, lineHeight: '1.5' }}>
                            한 번에 하나의 스레드만 임계 영역 진입 허용
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: COLORS.bg,
                        padding: '12px',
                        borderRadius: '8px',
                    }}>
                        <div style={{ color: COLORS.thread2Light, fontWeight: '600', marginBottom: '4px' }}>
                            ⏳ 진행 보장 (Progress)
                        </div>
                        <div style={{ color: COLORS.textMuted, lineHeight: '1.5' }}>
                            임계 영역이 비어있으면 대기 중인 스레드가 진입 가능
                        </div>
                    </div>
                    <div style={{
                        backgroundColor: COLORS.bg,
                        padding: '12px',
                        borderRadius: '8px',
                    }}>
                        <div style={{ color: COLORS.success, fontWeight: '600', marginBottom: '4px' }}>
                            ⚖️ 한정 대기 (Bounded Waiting)
                        </div>
                        <div style={{ color: COLORS.textMuted, lineHeight: '1.5' }}>
                            무한 대기 없이 유한 시간 내에 진입 보장
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
