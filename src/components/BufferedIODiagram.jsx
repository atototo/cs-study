import React, { useState, useEffect } from 'react';

// OSOverview.jsx와 동일한 컬러 팔레트
const COLORS = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    userMode: '#8b5cf6',
    userModeLight: '#a78bfa',
    kernelMode: '#ef4444',
    kernelModeLight: '#f87171',
    java: '#f59e0b',
    javaLight: '#fbbf24',
    os: '#3b82f6',
    osLight: '#60a5fa',
    success: '#10b981',
    successLight: '#34d399',
    arrow: '#06b6d4',
    warning: '#eab308',
};

export default function BufferedIODiagram() {
    const [step, setStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [bufferFill, setBufferFill] = useState(100); // 버퍼 채움 정도 (%)

    const steps = [
        {
            id: 0,
            title: '대기 상태',
            desc: '버퍼에 데이터가 가득 차 있음',
            bufferFill: 100,
            activeFlow: null,
        },
        {
            id: 1,
            title: '애플리케이션 읽기 요청',
            desc: 'read() 호출 → 버퍼에서 바로 반환 (시스템 콜 없음!)',
            bufferFill: 85,
            activeFlow: 'app-to-buffer',
        },
        {
            id: 2,
            title: '계속 읽기',
            desc: '버퍼에서 계속 읽음 (여전히 시스템 콜 없음)',
            bufferFill: 50,
            activeFlow: 'app-to-buffer',
        },
        {
            id: 3,
            title: '버퍼 거의 비어감',
            desc: '아직 버퍼에 데이터 남아있음',
            bufferFill: 15,
            activeFlow: 'app-to-buffer',
        },
        {
            id: 4,
            title: '버퍼 비었음!',
            desc: '이제 시스템 콜 필요 → Kernel로 요청',
            bufferFill: 0,
            activeFlow: 'buffer-to-kernel',
        },
        {
            id: 5,
            title: '커널에서 8KB 가져옴',
            desc: 'read() 시스템 콜 1번으로 8KB 한 번에!',
            bufferFill: 100,
            activeFlow: 'kernel-to-buffer',
        },
    ];

    const startAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStep(0);

        const sequence = [1, 2, 3, 4, 5, 0];
        sequence.forEach((s, i) => {
            setTimeout(() => {
                setStep(s);
                setBufferFill(steps[s].bufferFill);
                if (s === 0) setIsAnimating(false);
            }, (i + 1) * 1200);
        });
    };

    const currentStep = steps[step];

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: COLORS.bg,
            borderRadius: '16px',
            padding: '24px',
            color: COLORS.text,
        }}>
            {/* 헤더 */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
                gap: '12px',
            }}>
                <div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>
                        🧠 BufferedReader 동작 원리
                    </h3>
                    <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '13px' }}>
                        User Space 버퍼로 시스템 콜 횟수를 줄이는 방법
                    </p>
                </div>
                <button
                    onClick={startAnimation}
                    disabled={isAnimating}
                    style={{
                        backgroundColor: isAnimating ? COLORS.border : COLORS.success,
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        cursor: isAnimating ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                    }}
                >
                    {isAnimating ? '⏳ 진행 중...' : '▶️ 애니메이션 시작'}
                </button>
            </div>

            {/* 현재 단계 표시 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '10px',
                padding: '14px 18px',
                marginBottom: '20px',
                border: `1px solid ${COLORS.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
            }}>
                <span style={{
                    backgroundColor: COLORS.arrow,
                    color: 'white',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: '700',
                    flexShrink: 0,
                }}>
                    {step + 1}
                </span>
                <div>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>
                        {currentStep.title}
                    </div>
                    <div style={{ color: COLORS.textMuted, fontSize: '12px', marginTop: '2px' }}>
                        {currentStep.desc}
                    </div>
                </div>
            </div>

            {/* 메인 다이어그램 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                overflow: 'hidden',
            }}>
                {/* User Space */}
                <div style={{
                    padding: '20px',
                    borderBottom: `3px dashed ${COLORS.border}`,
                    position: 'relative',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '14px',
                        backgroundColor: COLORS.userMode + '30',
                        color: COLORS.userModeLight,
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                    }}>
                        User Space
                    </div>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        marginTop: '10px',
                    }}>
                        {/* 애플리케이션 */}
                        <div style={{
                            backgroundColor: COLORS.java + '20',
                            border: `2px solid ${COLORS.java}`,
                            borderRadius: '12px',
                            padding: '16px 20px',
                            textAlign: 'center',
                            minWidth: '120px',
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '6px' }}>📱</div>
                            <div style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: COLORS.javaLight,
                            }}>
                                애플리케이션
                            </div>
                            <div style={{
                                fontSize: '11px',
                                color: COLORS.textMuted,
                                marginTop: '4px',
                            }}>
                                read() 호출
                            </div>
                        </div>

                        {/* 화살표 (App → Buffer) */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <div style={{
                                color: currentStep.activeFlow === 'app-to-buffer'
                                    ? COLORS.success
                                    : COLORS.textMuted,
                                fontSize: '20px',
                                transition: 'all 0.3s',
                                animation: currentStep.activeFlow === 'app-to-buffer'
                                    ? 'pulse 0.5s ease-in-out infinite'
                                    : 'none',
                            }}>
                                ⟷
                            </div>
                            <div style={{
                                fontSize: '10px',
                                color: currentStep.activeFlow === 'app-to-buffer'
                                    ? COLORS.successLight
                                    : COLORS.textMuted,
                                fontWeight: currentStep.activeFlow === 'app-to-buffer' ? '600' : '400',
                            }}>
                                시스템 콜 없음!
                            </div>
                        </div>

                        {/* 버퍼 */}
                        <div style={{
                            backgroundColor: COLORS.os + '20',
                            border: `2px solid ${COLORS.os}`,
                            borderRadius: '12px',
                            padding: '16px 20px',
                            textAlign: 'center',
                            minWidth: '140px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* 버퍼 채움 표시 */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: `${bufferFill}%`,
                                backgroundColor: COLORS.os + '40',
                                transition: 'height 0.5s ease-out',
                            }} />

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <div style={{ fontSize: '24px', marginBottom: '6px' }}>📦</div>
                                <div style={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    color: COLORS.osLight,
                                }}>
                                    버퍼 (8KB)
                                </div>
                                <div style={{
                                    marginTop: '8px',
                                    backgroundColor: COLORS.bg,
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    color: bufferFill > 30 ? COLORS.success : COLORS.kernelModeLight,
                                }}>
                                    {bufferFill}% 채움
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 경계선 - 시스템 콜 표시 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '12px',
                    backgroundColor: currentStep.activeFlow?.includes('kernel')
                        ? COLORS.kernelMode + '20'
                        : COLORS.bg,
                    transition: 'all 0.3s',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        {currentStep.activeFlow === 'buffer-to-kernel' && (
                            <>
                                <span style={{ fontSize: '16px' }}>⬇️</span>
                                <span style={{
                                    backgroundColor: COLORS.kernelMode,
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    animation: 'pulse 0.5s ease-in-out infinite',
                                }}>
                                    시스템 콜 발생!
                                </span>
                                <span style={{ fontSize: '16px' }}>⬇️</span>
                            </>
                        )}
                        {currentStep.activeFlow === 'kernel-to-buffer' && (
                            <>
                                <span style={{ fontSize: '16px' }}>⬆️</span>
                                <span style={{
                                    backgroundColor: COLORS.success,
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                }}>
                                    8KB 데이터 반환
                                </span>
                                <span style={{ fontSize: '16px' }}>⬆️</span>
                            </>
                        )}
                        {!currentStep.activeFlow?.includes('kernel') && (
                            <span style={{
                                color: COLORS.textMuted,
                                fontSize: '12px',
                            }}>
                                ─── 커널 경계 ───
                            </span>
                        )}
                    </div>
                </div>

                {/* Kernel Space */}
                <div style={{
                    padding: '20px',
                    position: 'relative',
                    backgroundColor: currentStep.activeFlow?.includes('kernel')
                        ? COLORS.kernelMode + '08'
                        : 'transparent',
                    transition: 'all 0.3s',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        right: '14px',
                        backgroundColor: COLORS.kernelMode + '30',
                        color: COLORS.kernelModeLight,
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                    }}>
                        Kernel Space
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px',
                    }}>
                        <div style={{
                            backgroundColor: COLORS.kernelMode + '20',
                            border: `2px solid ${COLORS.kernelMode}`,
                            borderRadius: '12px',
                            padding: '16px 24px',
                            textAlign: 'center',
                            opacity: currentStep.activeFlow?.includes('kernel') ? 1 : 0.5,
                            transition: 'all 0.3s',
                            transform: currentStep.activeFlow?.includes('kernel')
                                ? 'scale(1.05)'
                                : 'scale(1)',
                        }}>
                            <div style={{ fontSize: '24px', marginBottom: '6px' }}>💾</div>
                            <div style={{
                                fontSize: '13px',
                                fontWeight: '600',
                                color: COLORS.kernelModeLight,
                            }}>
                                OS / 디스크
                            </div>
                            <div style={{
                                fontSize: '11px',
                                color: COLORS.textMuted,
                                marginTop: '4px',
                            }}>
                                실제 I/O 수행
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 핵심 포인트 */}
            <div style={{
                marginTop: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
            }}>
                <StatBox
                    icon="🔴"
                    label="버퍼 없이 100바이트"
                    value="100번"
                    subtext="시스템 콜"
                    color={COLORS.kernelMode}
                />
                <StatBox
                    icon="🟢"
                    label="버퍼로 100바이트"
                    value="1번"
                    subtext="시스템 콜"
                    color={COLORS.success}
                />
                <StatBox
                    icon="⚡"
                    label="성능 향상"
                    value="~100배"
                    subtext="시스템 콜 감소"
                    color={COLORS.arrow}
                />
            </div>

            {/* CSS 애니메이션 */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
            `}</style>
        </div>
    );
}

function StatBox({ icon, label, value, subtext, color }) {
    return (
        <div style={{
            backgroundColor: COLORS.cardBg,
            border: `1px solid ${COLORS.border}`,
            borderRadius: '10px',
            padding: '14px',
            textAlign: 'center',
        }}>
            <div style={{ fontSize: '18px', marginBottom: '6px' }}>{icon}</div>
            <div style={{ fontSize: '11px', color: COLORS.textMuted }}>{label}</div>
            <div style={{
                fontSize: '22px',
                fontWeight: '700',
                color: color,
                margin: '4px 0',
            }}>
                {value}
            </div>
            <div style={{ fontSize: '11px', color: COLORS.textMuted }}>{subtext}</div>
        </div>
    );
}