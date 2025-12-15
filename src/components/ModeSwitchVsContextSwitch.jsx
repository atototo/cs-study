import React, { useState } from 'react';

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
    arrow: '#06b6d4',
    // 추가 색상
    contextSwitch: '#f97316',
    contextSwitchLight: '#fb923c',
    warning: '#eab308',
};

export default function ModeSwitchVsContextSwitch() {
    const [activeTab, setActiveTab] = useState('compare');
    const [animationStep, setAnimationStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const startAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setAnimationStep(0);

        const steps = [1, 2, 3, 4, 5, 6, 0];
        steps.forEach((step, index) => {
            setTimeout(() => {
                setAnimationStep(step);
                if (step === 0) setIsAnimating(false);
            }, index * 900);
        });
    };

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: COLORS.bg,
            borderRadius: '16px',
            padding: '24px',
            color: COLORS.text,
        }}>
            {/* 헤더 */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    margin: '0 0 8px 0',
                }}>
                    ⚡ Mode Switch vs Context Switch
                </h3>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    시스템 콜이 비싼 이유를 이해하는 핵심 개념
                </p>
            </div>

            {/* 탭 선택 */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
                flexWrap: 'wrap',
            }}>
                {[
                    { id: 'compare', icon: '📊', name: '개념 비교' },
                    { id: 'timeline', icon: '🔄', name: '시스템 콜 흐름' },
                    { id: 'buffer', icon: '💡', name: 'BufferedReader 효과' },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            backgroundColor: activeTab === tab.id ? COLORS.arrow : COLORS.cardBg,
                            color: activeTab === tab.id ? 'white' : COLORS.textMuted,
                            border: `1px solid ${activeTab === tab.id ? COLORS.arrow : COLORS.border}`,
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <span>{tab.icon}</span>
                        <span>{tab.name}</span>
                    </button>
                ))}
            </div>

            {/* 탭 내용 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
            }}>
                {activeTab === 'compare' && <CompareView />}
                {activeTab === 'timeline' && (
                    <TimelineView
                        step={animationStep}
                        onStart={startAnimation}
                        isAnimating={isAnimating}
                    />
                )}
                {activeTab === 'buffer' && <BufferCompareView />}
            </div>
        </div>
    );
}

// ===== 개념 비교 뷰 =====
function CompareView() {
    return (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '20px',
            }}>
                {/* Mode Switch 카드 */}
                <div style={{
                    backgroundColor: COLORS.os + '15',
                    border: `2px solid ${COLORS.os}`,
                    borderRadius: '12px',
                    padding: '20px',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '16px',
                    }}>
                        <span style={{
                            backgroundColor: COLORS.os,
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '700',
                        }}>
                            🔄 Mode Switch
                        </span>
                        <span style={{
                            backgroundColor: COLORS.success + '30',
                            color: COLORS.success,
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                        }}>
                            상대적으로 가벼움
                        </span>
                    </div>

                    <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
                        <InfoRow
                            label="뭐가 바뀜?"
                            color={COLORS.osLight}
                            content={<>권한 레벨만 변경<br />
                                <code style={{
                                    backgroundColor: COLORS.bg,
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                }}>
                                    User Mode ↔ Kernel Mode
                                </code>
                            </>}
                        />
                        <InfoRow
                            label="언제?"
                            color={COLORS.osLight}
                            content={<>시스템 콜 할 때마다 <strong>항상</strong> 발생</>}
                        />
                        <InfoRow
                            label="비용"
                            color={COLORS.osLight}
                            content="레지스터 일부 저장, 권한 체크"
                            isLast
                        />
                    </div>
                </div>

                {/* Context Switch 카드 */}
                <div style={{
                    backgroundColor: COLORS.contextSwitch + '15',
                    border: `2px solid ${COLORS.contextSwitch}`,
                    borderRadius: '12px',
                    padding: '20px',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '16px',
                    }}>
                        <span style={{
                            backgroundColor: COLORS.contextSwitch,
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            fontWeight: '700',
                        }}>
                            🔀 Context Switch
                        </span>
                        <span style={{
                            backgroundColor: COLORS.kernelMode + '30',
                            color: COLORS.kernelModeLight,
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                        }}>
                            무거움 💥
                        </span>
                    </div>

                    <div style={{ fontSize: '13px', lineHeight: '1.8' }}>
                        <InfoRow
                            label="뭐가 바뀜?"
                            color={COLORS.contextSwitchLight}
                            content={<>실행 중인 <strong>프로세스/쓰레드</strong> 전체 교체</>}
                        />
                        <InfoRow
                            label="언제?"
                            color={COLORS.contextSwitchLight}
                            content={<>CPU 차례가 바뀔 때<br />(I/O 대기, 타임슬라이스 만료 등)</>}
                        />
                        <InfoRow
                            label="비용"
                            color={COLORS.contextSwitchLight}
                            content={<>레지스터 <strong>전체</strong> 저장/복원<br />CPU 캐시 무효화 💥</>}
                            isLast
                        />
                    </div>
                </div>
            </div>

            {/* Context Switch 저장 항목 */}
            <div style={{
                backgroundColor: COLORS.bg,
                borderRadius: '10px',
                padding: '16px',
                border: `1px solid ${COLORS.border}`,
            }}>
                <h4 style={{
                    margin: '0 0 12px 0',
                    fontSize: '14px',
                    color: COLORS.contextSwitchLight,
                }}>
                    📦 Context Switch 시 저장/복원해야 하는 것들
                </h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '10px',
                }}>
                    {[
                        { name: 'PC (Program Counter)', desc: '어디까지 실행했나' },
                        { name: '레지스터 값들', desc: 'CPU 계산 중간 결과' },
                        { name: 'Stack Pointer', desc: '스택 어디까지 썼나' },
                        { name: 'MMU 매핑 정보', desc: '가상 → 물리 주소' },
                        { name: 'CPU 캐시', desc: '무효화됨 💥', highlight: true },
                    ].map((item, i) => (
                        <div key={i} style={{
                            backgroundColor: item.highlight ? COLORS.kernelMode + '20' : COLORS.cardBg,
                            padding: '10px 12px',
                            borderRadius: '8px',
                            border: `1px solid ${item.highlight ? COLORS.kernelMode : COLORS.border}`,
                        }}>
                            <div style={{
                                fontSize: '12px',
                                fontWeight: '600',
                                color: item.highlight ? COLORS.kernelModeLight : COLORS.text,
                            }}>
                                {item.name}
                            </div>
                            <div style={{
                                fontSize: '11px',
                                color: COLORS.textMuted,
                                marginTop: '2px',
                            }}>
                                {item.desc}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ===== 시스템 콜 타임라인 뷰 =====
function TimelineView({ step, onStart, isAnimating }) {
    const steps = [
        { label: 'read() 시스템 콜 호출', mode: 'user', type: 'action' },
        { label: 'Mode Switch (User → Kernel)', mode: 'switch', note: '항상 발생' },
        { label: '디스크 I/O 요청', mode: 'kernel', type: 'action' },
        {
            label: 'I/O 완료 대기... 🕐', mode: 'kernel', type: 'wait',
            note: 'Context Switch!', subNote: '(다른 프로세스한테 CPU 양보)'
        },
        {
            label: 'I/O 완료 → 다시 내 차례', mode: 'kernel',
            note: 'Context Switch!', subNote: '(내 컨텍스트 복원)'
        },
        { label: 'Mode Switch (Kernel → User)', mode: 'switch', note: '항상 발생' },
    ];

    const getModeColor = (mode) => {
        switch (mode) {
            case 'user': return COLORS.userMode;
            case 'kernel': return COLORS.kernelMode;
            case 'switch': return COLORS.os;
            default: return COLORS.border;
        }
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
            }}>
                <h4 style={{ margin: 0, fontSize: '15px' }}>
                    📍 read() 시스템 콜 시 실제로 일어나는 일
                </h4>
                <button
                    onClick={onStart}
                    disabled={isAnimating}
                    style={{
                        backgroundColor: isAnimating ? COLORS.border : COLORS.arrow,
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        cursor: isAnimating ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                    }}
                >
                    {isAnimating ? '⏳ 진행 중...' : '▶️ 애니메이션'}
                </button>
            </div>

            <div style={{ position: 'relative' }}>
                {/* 타임라인 선 */}
                <div style={{
                    position: 'absolute',
                    left: '15px',
                    top: '20px',
                    bottom: '20px',
                    width: '2px',
                    backgroundColor: COLORS.border,
                }} />

                {steps.map((s, i) => {
                    const isActive = step > i;
                    const isCurrent = step === i + 1;
                    const color = getModeColor(s.mode);

                    return (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '16px',
                            marginBottom: '16px',
                            opacity: isActive || isCurrent ? 1 : 0.4,
                            transition: 'all 0.3s ease',
                        }}>
                            {/* 숫자 원 */}
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                backgroundColor: isActive || isCurrent ? color : COLORS.border,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '13px',
                                fontWeight: '700',
                                color: 'white',
                                flexShrink: 0,
                                transform: isCurrent ? 'scale(1.2)' : 'scale(1)',
                                transition: 'all 0.3s ease',
                                boxShadow: isCurrent ? `0 0 12px ${color}` : 'none',
                                zIndex: 1,
                            }}>
                                {i + 1}
                            </div>

                            {/* 내용 */}
                            <div style={{
                                flex: 1,
                                backgroundColor: isCurrent ? color + '20' : COLORS.bg,
                                border: `1px solid ${isCurrent ? color : COLORS.border}`,
                                borderRadius: '8px',
                                padding: '12px 14px',
                                transform: isCurrent ? 'scale(1.02)' : 'scale(1)',
                                transition: 'all 0.3s ease',
                            }}>
                                <div style={{
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    marginBottom: s.note ? '6px' : 0,
                                }}>
                                    {s.label}
                                </div>
                                {s.note && (
                                    <div style={{
                                        display: 'inline-block',
                                        backgroundColor: s.mode === 'switch'
                                            ? COLORS.os + '30'
                                            : COLORS.contextSwitch + '30',
                                        color: s.mode === 'switch'
                                            ? COLORS.osLight
                                            : COLORS.contextSwitchLight,
                                        padding: '3px 8px',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        fontWeight: '600',
                                    }}>
                                        {s.note}
                                    </div>
                                )}
                                {s.subNote && (
                                    <div style={{
                                        fontSize: '11px',
                                        color: COLORS.textMuted,
                                        marginTop: '4px',
                                    }}>
                                        {s.subNote}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 요약 */}
            <div style={{
                marginTop: '16px',
                padding: '14px',
                backgroundColor: COLORS.warning + '15',
                borderRadius: '10px',
                border: `1px solid ${COLORS.warning}40`,
            }}>
                <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
                    <strong style={{ color: COLORS.warning }}>💡 핵심:</strong>{' '}
                    <span style={{ color: COLORS.textMuted }}>
                        한 번의 시스템 콜에서 <strong style={{ color: COLORS.text }}>Mode Switch 2번</strong>은 필수,{' '}
                        I/O 대기 시 <strong style={{ color: COLORS.contextSwitchLight }}>Context Switch</strong>까지 추가될 수 있음
                    </span>
                </div>
            </div>
        </div>
    );
}

// ===== BufferedReader 비교 뷰 =====
function BufferCompareView() {
    return (
        <div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '20px',
            }}>
                {/* 비효율적인 방식 */}
                <div style={{
                    backgroundColor: COLORS.kernelMode + '10',
                    border: `2px solid ${COLORS.kernelMode}`,
                    borderRadius: '12px',
                    padding: '20px',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                    }}>
                        <span style={{ fontSize: '20px' }}>❌</span>
                        <span style={{
                            fontWeight: '700',
                            fontSize: '14px',
                            color: COLORS.kernelModeLight,
                        }}>
                            비효율: 1바이트마다 시스템 콜
                        </span>
                    </div>

                    <code style={{
                        display: 'block',
                        backgroundColor: COLORS.bg,
                        padding: '12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        marginBottom: '16px',
                        whiteSpace: 'pre-wrap',
                    }}>
                        {`while ((b = in.read()) != -1) {
    // 매번 시스템 콜!
}`}
                    </code>

                    <div style={{ fontSize: '13px', color: COLORS.textMuted }}>
                        100바이트 읽으면:<br />
                        → <strong style={{ color: COLORS.kernelModeLight }}>100번</strong> 시스템 콜<br />
                        → <strong style={{ color: COLORS.kernelModeLight }}>200번</strong> Mode Switch<br />
                        → Context Switch 다수 발생 💥
                    </div>
                </div>

                {/* 효율적인 방식 */}
                <div style={{
                    backgroundColor: COLORS.success + '10',
                    border: `2px solid ${COLORS.success}`,
                    borderRadius: '12px',
                    padding: '20px',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px',
                    }}>
                        <span style={{ fontSize: '20px' }}>✅</span>
                        <span style={{
                            fontWeight: '700',
                            fontSize: '14px',
                            color: COLORS.success,
                        }}>
                            효율: 8KB씩 한 번에
                        </span>
                    </div>

                    <code style={{
                        display: 'block',
                        backgroundColor: COLORS.bg,
                        padding: '12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        marginBottom: '16px',
                        whiteSpace: 'pre-wrap',
                    }}>
                        {`BufferedInputStream bis = 
    new BufferedInputStream(in);
while ((b = bis.read()) != -1) {
    // 버퍼에서 읽음 (대부분)
}`}
                    </code>

                    <div style={{ fontSize: '13px', color: COLORS.textMuted }}>
                        100바이트 읽으면:<br />
                        → <strong style={{ color: COLORS.success }}>1번</strong> 시스템 콜 (8KB 버퍼링)<br />
                        → <strong style={{ color: COLORS.success }}>2번</strong> Mode Switch<br />
                        → Context Switch 최소화 ✨
                    </div>
                </div>
            </div>

            {/* 버퍼링 동작 원리 */}
            <div style={{
                backgroundColor: COLORS.bg,
                borderRadius: '10px',
                padding: '16px',
                border: `1px solid ${COLORS.border}`,
            }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
                    🧠 BufferedReader 동작 원리
                </h4>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                }}>
                    <FlowBox
                        label="User Space"
                        title="애플리케이션"
                        color={COLORS.userMode}
                    />

                    <Arrow />

                    <FlowBox
                        label="User Space"
                        title="버퍼 (8KB)"
                        subtitle="시스템 콜 없이 읽기"
                        color={COLORS.os}
                        highlight
                    />

                    <Arrow />

                    <span style={{
                        fontSize: '11px',
                        color: COLORS.kernelModeLight,
                        backgroundColor: COLORS.kernelMode + '30',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        textAlign: 'center',
                    }}>
                        버퍼 비면<br />시스템 콜
                    </span>

                    <Arrow />

                    <FlowBox
                        label="Kernel Space"
                        title="OS / 디스크"
                        color={COLORS.kernelMode}
                    />
                </div>
            </div>

            {/* 핵심 포인트 */}
            <div style={{
                marginTop: '16px',
                backgroundColor: COLORS.success + '15',
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${COLORS.success}40`,
            }}>
                <h4 style={{
                    margin: '0 0 12px 0',
                    color: COLORS.success,
                    fontSize: '14px',
                }}>
                    🎯 면접 포인트
                </h4>
                <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
                    <p style={{ margin: '0 0 8px 0' }}>
                        <strong>Q: BufferedReader가 왜 빠른가요?</strong>
                    </p>
                    <p style={{ margin: 0, color: COLORS.textMuted }}>
                        A: 시스템 콜 횟수를 줄여서 <strong style={{ color: COLORS.text }}>Mode Switch</strong>와{' '}
                        <strong style={{ color: COLORS.text }}>Context Switch</strong> 오버헤드를 최소화합니다.
                        User Space의 버퍼에서 읽는 동안은 커널 개입 없이 진행되므로 빠릅니다.
                    </p>
                </div>
            </div>
        </div>
    );
}

// ===== 공통 컴포넌트 =====
function InfoRow({ label, color, content, isLast }) {
    return (
        <div style={{ marginBottom: isLast ? 0 : '12px' }}>
            <strong style={{ color }}>{label}</strong>
            <p style={{ margin: '4px 0 0 0', color: COLORS.textMuted }}>
                {content}
            </p>
        </div>
    );
}

function FlowBox({ label, title, subtitle, color, highlight }) {
    return (
        <div style={{
            backgroundColor: color + '20',
            border: `${highlight ? '2px' : '1px'} solid ${color}`,
            borderRadius: '8px',
            padding: '10px 14px',
            textAlign: 'center',
        }}>
            <div style={{ fontSize: '11px', color: COLORS.textMuted }}>{label}</div>
            <div style={{
                fontSize: '13px',
                fontWeight: '600',
                color: highlight ? color : COLORS.text,
            }}>
                {title}
            </div>
            {subtitle && (
                <div style={{ fontSize: '10px', color: COLORS.textMuted }}>{subtitle}</div>
            )}
        </div>
    );
}

function Arrow() {
    return (
        <span style={{ color: COLORS.textMuted, fontSize: '14px' }}>→</span>
    );
}