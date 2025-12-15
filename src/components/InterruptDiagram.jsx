import React, { useState, useEffect } from 'react';

const COLORS = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    hardware: '#10b981',
    hardwareLight: '#34d399',
    software: '#8b5cf6',
    softwareLight: '#a78bfa',
    cpu: '#f59e0b',
    cpuLight: '#fbbf24',
    os: '#3b82f6',
    osLight: '#60a5fa',
    danger: '#ef4444',
};

const interruptTypes = [
    {
        id: 'hardware',
        category: '하드웨어 인터럽트',
        color: COLORS.hardware,
        lightColor: COLORS.hardwareLight,
        icon: '🔌',
        description: '외부 장치가 CPU에게 신호를 보냄',
        examples: [
            { name: '타이머 인터럽트', desc: '주기적 발생 (1~10ms), 선점형 스케줄링의 핵심', icon: '⏱️' },
            { name: '키보드/마우스', desc: '입력 장치 이벤트 발생 시', icon: '⌨️' },
            { name: '디스크 완료', desc: '파일 읽기/쓰기 작업 완료 시', icon: '💾' },
            { name: '네트워크', desc: '패킷 도착 시', icon: '📡' },
        ],
    },
    {
        id: 'software',
        category: '소프트웨어 인터럽트 (트랩)',
        color: COLORS.software,
        lightColor: COLORS.softwareLight,
        icon: '💻',
        description: '프로그램 실행 중 발생',
        examples: [
            { name: '시스템 콜', desc: '프로그램이 OS 기능 요청', icon: '📞' },
            { name: '0으로 나누기', desc: '산술 예외 발생', icon: '➗' },
            { name: '잘못된 메모리 접근', desc: 'Segmentation Fault', icon: '🚫' },
            { name: '브레이크포인트', desc: '디버거가 설정한 중단점', icon: '🔴' },
        ],
    },
];

export default function InterruptDiagram() {
    const [selectedType, setSelectedType] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const startAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setAnimationStep(0);

        const steps = [1, 2, 3, 4, 5, 0];
        steps.forEach((step, index) => {
            setTimeout(() => {
                setAnimationStep(step);
                if (step === 0) setIsAnimating(false);
            }, index * 700);
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
                    background: `linear-gradient(135deg, ${COLORS.hardwareLight}, ${COLORS.softwareLight})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    ⚡ 인터럽트 (Interrupt)
                </h3>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    CPU의 현재 작업을 중단시키고 급한 일을 먼저 처리하게 하는 신호
                </p>
            </div>

            {/* 인터럽트 처리 흐름 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
            }}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', color: COLORS.textMuted }}>
                    🔄 인터럽트 처리 흐름
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <FlowStep
                        step={1}
                        currentStep={animationStep}
                        color={COLORS.hardware}
                        label="인터럽트 발생"
                        desc="장치 또는 프로그램이 인터럽트 신호 발생"
                    />
                    <FlowArrow active={animationStep >= 1} />
                    <FlowStep
                        step={2}
                        currentStep={animationStep}
                        color={COLORS.cpu}
                        label="CPU 작업 중단"
                        desc="현재 실행 중인 명령어 완료 후 중단"
                    />
                    <FlowArrow active={animationStep >= 2} />
                    <FlowStep
                        step={3}
                        currentStep={animationStep}
                        color={COLORS.cpu}
                        label="상태 저장"
                        desc="현재 레지스터, PC(Program Counter) 등을 스택에 저장"
                    />
                    <FlowArrow active={animationStep >= 3} />
                    <FlowStep
                        step={4}
                        currentStep={animationStep}
                        color={COLORS.os}
                        label="인터럽트 핸들러 실행"
                        desc="OS의 해당 인터럽트 처리 루틴(ISR) 실행"
                    />
                    <FlowArrow active={animationStep >= 4} />
                    <FlowStep
                        step={5}
                        currentStep={animationStep}
                        color={COLORS.hardware}
                        label="상태 복원 & 재개"
                        desc="저장했던 상태 복원, 원래 작업 계속"
                    />
                </div>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <button
                        onClick={startAnimation}
                        disabled={isAnimating}
                        style={{
                            backgroundColor: isAnimating ? COLORS.border : COLORS.os,
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            fontSize: '14px',
                            cursor: isAnimating ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {isAnimating ? '⏳ 진행 중...' : '▶️ 흐름 애니메이션'}
                    </button>
                </div>
            </div>

            {/* 인터럽트 종류 */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {interruptTypes.map((type) => (
                    <div
                        key={type.id}
                        onClick={() => setSelectedType(selectedType === type.id ? null : type.id)}
                        style={{
                            flex: '1',
                            minWidth: '280px',
                            backgroundColor: selectedType === type.id ? type.color + '20' : COLORS.cardBg,
                            border: `2px solid ${selectedType === type.id ? type.color : COLORS.border}`,
                            borderRadius: '12px',
                            padding: '16px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '12px',
                        }}>
                            <span style={{ fontSize: '24px' }}>{type.icon}</span>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '15px', color: type.lightColor }}>
                                    {type.category}
                                </h4>
                                <p style={{ margin: 0, fontSize: '12px', color: COLORS.textMuted }}>
                                    {type.description}
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {type.examples.map((ex, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        backgroundColor: COLORS.bg,
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '10px',
                                    }}
                                >
                                    <span style={{ fontSize: '16px' }}>{ex.icon}</span>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: '600' }}>{ex.name}</div>
                                        <div style={{ fontSize: '11px', color: COLORS.textMuted }}>{ex.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 타이머 인터럽트 강조 */}
            <div style={{
                marginTop: '20px',
                backgroundColor: COLORS.cpu + '15',
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${COLORS.cpu}40`,
            }}>
                <h4 style={{
                    margin: '0 0 12px 0',
                    color: COLORS.cpuLight,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    ⏱️ 타이머 인터럽트가 특히 중요한 이유
                </h4>
                <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
                    <p style={{ margin: '0 0 8px 0' }}>
                        타이머 인터럽트가 없다면 <strong style={{ color: COLORS.danger }}>선점형 스케줄링</strong>이 불가능합니다.
                    </p>
                    <div style={{
                        backgroundColor: COLORS.bg,
                        borderRadius: '8px',
                        padding: '12px',
                        marginTop: '8px',
                    }}>
                        <div style={{ marginBottom: '8px' }}>
                            <span style={{ color: COLORS.danger }}>❌ 타이머 없으면:</span> 프로세스가 자발적으로 양보할 때까지 CPU 독점
                        </div>
                        <div>
                            <span style={{ color: COLORS.hardwareLight }}>✅ 타이머 있으면:</span> OS가 주기적으로 "다음 프로세스 차례!" 판단 가능
                        </div>
                    </div>
                </div>
            </div>

            {/* 폴링 vs 인터럽트 비교 */}
            <div style={{
                marginTop: '20px',
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '16px',
            }}>
                <h4 style={{
                    margin: '0 0 12px 0',
                    fontSize: '14px',
                    color: COLORS.textMuted,
                }}>
                    🔄 폴링(Polling) vs 인터럽트(Interrupt)
                </h4>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <div style={{
                        flex: '1',
                        minWidth: '200px',
                        backgroundColor: COLORS.danger + '15',
                        borderRadius: '8px',
                        padding: '12px',
                        border: `1px solid ${COLORS.danger}30`,
                    }}>
                        <div style={{ fontWeight: '600', marginBottom: '8px', color: COLORS.danger }}>
                            폴링 (비효율)
                        </div>
                        <div style={{ fontSize: '12px', color: COLORS.textMuted }}>
                            CPU: "끝났어?" → "아직" → "끝났어?" → "아직" → ...
                        </div>
                        <div style={{ fontSize: '11px', marginTop: '8px' }}>
                            ⚠️ CPU가 계속 확인 → 자원 낭비
                        </div>
                    </div>
                    <div style={{
                        flex: '1',
                        minWidth: '200px',
                        backgroundColor: COLORS.hardware + '15',
                        borderRadius: '8px',
                        padding: '12px',
                        border: `1px solid ${COLORS.hardware}30`,
                    }}>
                        <div style={{ fontWeight: '600', marginBottom: '8px', color: COLORS.hardwareLight }}>
                            인터럽트 (효율)
                        </div>
                        <div style={{ fontSize: '12px', color: COLORS.textMuted }}>
                            CPU: 다른 일 수행 중... 장치: "끝났어!" → 처리
                        </div>
                        <div style={{ fontSize: '11px', marginTop: '8px' }}>
                            ✅ 필요할 때만 알림 → 효율적
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FlowStep({ step, currentStep, color, label, desc }) {
    const isActive = currentStep >= step;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            backgroundColor: isActive ? color + '20' : COLORS.bg,
            border: `2px solid ${isActive ? color : COLORS.border}`,
            borderRadius: '8px',
            padding: '12px 16px',
            transition: 'all 0.3s ease',
        }}>
            <span style={{
                backgroundColor: isActive ? color : COLORS.border,
                color: 'white',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '600',
                flexShrink: 0,
            }}>
                {step}
            </span>
            <div>
                <div style={{ fontWeight: '600', fontSize: '13px' }}>{label}</div>
                <div style={{ fontSize: '11px', color: COLORS.textMuted }}>{desc}</div>
            </div>
        </div>
    );
}

function FlowArrow({ active }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2px 0',
            opacity: active ? 1 : 0.3,
            transition: 'opacity 0.3s ease',
        }}>
            <span style={{ color: COLORS.os, fontSize: '14px' }}>↓</span>
        </div>
    );
}