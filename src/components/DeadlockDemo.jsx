import React, { useState, useEffect } from 'react';

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
    lock: '#f59e0b',
    lockLight: '#fbbf24',
    danger: '#ef4444',
    dangerLight: '#f87171',
    success: '#10b981',
};

const deadlockConditions = [
    {
        name: '상호 배제 (Mutual Exclusion)',
        icon: '🔐',
        description: '자원은 한 번에 하나의 프로세스만 사용 가능',
        example: '프린터는 동시에 두 문서를 출력할 수 없음',
    },
    {
        name: '점유 대기 (Hold and Wait)',
        icon: '✊',
        description: '자원을 가진 채로 다른 자원을 기다림',
        example: 'Lock A를 잡고 Lock B를 기다리는 상태',
    },
    {
        name: '비선점 (No Preemption)',
        icon: '🚫',
        description: '다른 프로세스의 자원을 강제로 빼앗을 수 없음',
        example: '다른 스레드가 가진 Lock을 강제 해제 불가',
    },
    {
        name: '순환 대기 (Circular Wait)',
        icon: '🔄',
        description: '프로세스들이 원형으로 서로의 자원을 대기',
        example: 'T1→T2→T3→T1 형태의 대기 사이클',
    },
];

export default function DeadlockDemo() {
    const [step, setStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showSolution, setShowSolution] = useState(false);

    const steps = [
        { thread1: 'idle', thread2: 'idle', lockA: 'free', lockB: 'free', desc: '초기 상태: 두 스레드와 두 Lock' },
        { thread1: 'hasA', thread2: 'idle', lockA: 'thread1', lockB: 'free', desc: 'Thread-1이 Lock A 획득' },
        { thread1: 'hasA', thread2: 'hasB', lockA: 'thread1', lockB: 'thread2', desc: 'Thread-2가 Lock B 획득' },
        { thread1: 'wantsB', thread2: 'hasB', lockA: 'thread1', lockB: 'thread2', desc: 'Thread-1이 Lock B 요청 → 대기' },
        { thread1: 'wantsB', thread2: 'wantsA', lockA: 'thread1', lockB: 'thread2', desc: 'Thread-2가 Lock A 요청 → 대기 → 💀 DEADLOCK!' },
    ];

    const runAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setStep(0);
        setShowSolution(false);

        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            if (currentStep >= steps.length) {
                clearInterval(interval);
                setIsAnimating(false);
            } else {
                setStep(currentStep);
            }
        }, 1200);
    };

    const currentState = steps[step];
    const isDeadlock = step === steps.length - 1;

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
                    background: `linear-gradient(135deg, ${COLORS.thread1Light}, ${COLORS.dangerLight})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    💀 Deadlock (교착 상태)
                </h3>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    두 스레드가 서로의 Lock을 기다리며 영원히 멈추는 상태
                </p>
            </div>

            {/* 시뮬레이션 영역 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}>
                    <div style={{ color: COLORS.textMuted, fontSize: '12px' }}>
                        Step {step + 1} / {steps.length}
                    </div>
                    <button
                        onClick={runAnimation}
                        disabled={isAnimating}
                        style={{
                            backgroundColor: isAnimating ? COLORS.border : COLORS.danger,
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '13px',
                            cursor: isAnimating ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {isAnimating ? '⏳ 진행 중...' : '▶️ Deadlock 시뮬레이션'}
                    </button>
                </div>

                {/* 시각화 */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '40px',
                    padding: '20px',
                    backgroundColor: COLORS.bg,
                    borderRadius: '8px',
                    flexWrap: 'wrap',
                }}>
                    {/* Thread 1 */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            backgroundColor: currentState.thread1.includes('wants')
                                ? COLORS.danger + '40'
                                : COLORS.thread1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            border: isDeadlock ? `3px solid ${COLORS.danger}` : 'none',
                        }}>
                            <span style={{ fontSize: '11px', fontWeight: '600' }}>Thread-1</span>
                            {currentState.thread1 === 'hasA' && <span style={{ fontSize: '10px' }}>🔐 A</span>}
                            {currentState.thread1 === 'wantsB' && <span style={{ fontSize: '10px' }}>🔐 A, ⏳ B</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '8px' }}>
                            {currentState.thread1 === 'idle' && '대기 중'}
                            {currentState.thread1 === 'hasA' && 'Lock A 보유'}
                            {currentState.thread1 === 'wantsB' && 'Lock B 대기 중'}
                        </div>
                    </div>

                    {/* 중앙 Lock들 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Lock A */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '8px',
                                backgroundColor: currentState.lockA === 'free'
                                    ? COLORS.success + '40'
                                    : currentState.lockA === 'thread1'
                                        ? COLORS.thread1 + '40'
                                        : COLORS.thread2 + '40',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                border: `2px solid ${COLORS.lock}`,
                            }}>
                                🔐
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', fontWeight: '600' }}>Lock A</div>
                                <div style={{ fontSize: '10px', color: COLORS.textMuted }}>
                                    {currentState.lockA === 'free' ? '사용 가능' :
                                        currentState.lockA === 'thread1' ? 'T1 보유' : 'T2 보유'}
                                </div>
                            </div>
                        </div>

                        {/* 순환 대기 화살표 (데드락 시) */}
                        {isDeadlock && (
                            <div style={{
                                textAlign: 'center',
                                color: COLORS.danger,
                                fontSize: '20px',
                                animation: 'pulse 1s infinite',
                            }}>
                                🔄
                            </div>
                        )}

                        {/* Lock B */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '8px',
                                backgroundColor: currentState.lockB === 'free'
                                    ? COLORS.success + '40'
                                    : currentState.lockB === 'thread1'
                                        ? COLORS.thread1 + '40'
                                        : COLORS.thread2 + '40',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '20px',
                                border: `2px solid ${COLORS.lock}`,
                            }}>
                                🔐
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', fontWeight: '600' }}>Lock B</div>
                                <div style={{ fontSize: '10px', color: COLORS.textMuted }}>
                                    {currentState.lockB === 'free' ? '사용 가능' :
                                        currentState.lockB === 'thread1' ? 'T1 보유' : 'T2 보유'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thread 2 */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            backgroundColor: currentState.thread2.includes('wants')
                                ? COLORS.danger + '40'
                                : COLORS.thread2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            border: isDeadlock ? `3px solid ${COLORS.danger}` : 'none',
                        }}>
                            <span style={{ fontSize: '11px', fontWeight: '600' }}>Thread-2</span>
                            {currentState.thread2 === 'hasB' && <span style={{ fontSize: '10px' }}>🔐 B</span>}
                            {currentState.thread2 === 'wantsA' && <span style={{ fontSize: '10px' }}>🔐 B, ⏳ A</span>}
                        </div>
                        <div style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '8px' }}>
                            {currentState.thread2 === 'idle' && '대기 중'}
                            {currentState.thread2 === 'hasB' && 'Lock B 보유'}
                            {currentState.thread2 === 'wantsA' && 'Lock A 대기 중'}
                        </div>
                    </div>
                </div>

                {/* 상태 설명 */}
                <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    backgroundColor: isDeadlock ? COLORS.danger + '20' : COLORS.bg,
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontSize: '14px',
                    border: isDeadlock ? `2px solid ${COLORS.danger}` : 'none',
                }}>
                    {isDeadlock ? '💀 ' : ''}{currentState.desc}
                </div>
            </div>

            {/* Deadlock 4가지 조건 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
            }}>
                <h4 style={{
                    margin: '0 0 16px 0',
                    fontSize: '14px',
                    color: COLORS.dangerLight,
                }}>
                    ⚠️ Deadlock 발생 조건 (4가지 모두 충족 시)
                </h4>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '12px',
                }}>
                    {deadlockConditions.map((cond, idx) => (
                        <div key={idx} style={{
                            backgroundColor: COLORS.bg,
                            padding: '12px',
                            borderRadius: '8px',
                            border: `1px solid ${COLORS.border}`,
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '8px',
                            }}>
                                <span style={{ fontSize: '18px' }}>{cond.icon}</span>
                                <span style={{ fontSize: '13px', fontWeight: '600' }}>{cond.name}</span>
                            </div>
                            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: COLORS.textMuted }}>
                                {cond.description}
                            </p>
                            <p style={{ margin: 0, fontSize: '11px', color: COLORS.text, fontStyle: 'italic' }}>
                                예: {cond.example}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 해결/예방 방법 */}
            <div>
                <button
                    onClick={() => setShowSolution(!showSolution)}
                    style={{
                        width: '100%',
                        backgroundColor: showSolution ? COLORS.success + '20' : COLORS.cardBg,
                        border: `2px solid ${showSolution ? COLORS.success : COLORS.border}`,
                        borderRadius: '12px',
                        padding: '16px',
                        color: COLORS.text,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>
                        💡 Deadlock 해결/예방 방법
                    </span>
                    <span style={{ fontSize: '18px' }}>
                        {showSolution ? '▲' : '▼'}
                    </span>
                </button>

                {showSolution && (
                    <div style={{
                        backgroundColor: COLORS.cardBg,
                        borderRadius: '0 0 12px 12px',
                        padding: '20px',
                        marginTop: '-10px',
                        paddingTop: '24px',
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <SolutionItem
                                title="1. Lock 순서 고정"
                                description="모든 스레드가 Lock을 같은 순서로 획득"
                                code="// 항상 A → B 순서로 획득\nsynchronized(lockA) {\n  synchronized(lockB) { ... }\n}"
                                color={COLORS.success}
                            />
                            <SolutionItem
                                title="2. tryLock() + Timeout"
                                description="일정 시간 대기 후 포기하고 재시도"
                                code="if (lock.tryLock(1, TimeUnit.SECONDS)) {\n  // 획득 성공\n} else {\n  // 타임아웃: 다시 시도\n}"
                                color={COLORS.thread1}
                            />
                            <SolutionItem
                                title="3. 한 번에 모든 Lock 획득"
                                description="필요한 자원을 한꺼번에 요청"
                                code="// 점유 대기 조건 제거\nacquireAll(lockA, lockB);"
                                color={COLORS.lock}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function SolutionItem({ title, description, code, color }) {
    return (
        <div style={{
            backgroundColor: COLORS.bg,
            padding: '12px',
            borderRadius: '8px',
            borderLeft: `3px solid ${color}`,
        }}>
            <div style={{ fontWeight: '600', fontSize: '13px', marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '8px' }}>{description}</div>
            <pre style={{
                margin: 0,
                padding: '8px',
                backgroundColor: COLORS.cardBg,
                borderRadius: '4px',
                fontSize: '11px',
                overflow: 'auto',
                color: COLORS.lockLight,
            }}>
                {code}
            </pre>
        </div>
    );
}