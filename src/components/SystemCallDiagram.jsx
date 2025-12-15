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
};

const systemCallExamples = [
    {
        id: 'file',
        name: '파일 쓰기',
        javaCode: 'Files.write(path, data);',
        jvmCall: 'FileOutputStream.write()',
        systemCall: 'write(fd, buf, count)',
        kernelAction: '파일시스템 → 디스크 드라이버 → 저장',
        icon: '📁',
    },
    {
        id: 'network',
        name: '네트워크 연결',
        javaCode: 'new Socket("api.server.com", 443);',
        jvmCall: 'PlainSocketImpl.connect()',
        systemCall: 'connect(sockfd, addr, len)',
        kernelAction: '네트워크 스택 → NIC 드라이버 → 패킷 전송',
        icon: '🌐',
    },
    {
        id: 'process',
        name: '프로세스 생성',
        javaCode: 'Runtime.exec("python script.py");',
        jvmCall: 'ProcessImpl.start()',
        systemCall: 'fork() + exec()',
        kernelAction: 'PCB 생성 → 메모리 할당 → 스케줄러 등록',
        icon: '⚙️',
    },
    {
        id: 'memory',
        name: '메모리 할당',
        javaCode: 'new byte[1024 * 1024];',
        jvmCall: 'JVM Heap 확장 필요 시',
        systemCall: 'mmap() 또는 brk()',
        kernelAction: '가상 메모리 할당 → 페이지 테이블 업데이트',
        icon: '🧠',
    },
];

export default function SystemCallDiagram() {
    const [selectedExample, setSelectedExample] = useState(systemCallExamples[0]);
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
            }, index * 800);
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
                    🔗 시스템 콜 흐름
                </h3>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    유저 프로그램이 OS 기능을 요청하는 유일한 방법
                </p>
            </div>

            {/* 예제 선택 탭 */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
                flexWrap: 'wrap',
            }}>
                {systemCallExamples.map((example) => (
                    <button
                        key={example.id}
                        onClick={() => setSelectedExample(example)}
                        style={{
                            backgroundColor: selectedExample.id === example.id ? COLORS.arrow : COLORS.cardBg,
                            color: selectedExample.id === example.id ? 'white' : COLORS.textMuted,
                            border: `1px solid ${selectedExample.id === example.id ? COLORS.arrow : COLORS.border}`,
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
                        <span>{example.icon}</span>
                        <span>{example.name}</span>
                    </button>
                ))}
            </div>

            {/* 메인 다이어그램 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
            }}>
                {/* Step 1: Java 코드 */}
                <FlowStep
                    step={1}
                    currentStep={animationStep}
                    color={COLORS.java}
                    lightColor={COLORS.javaLight}
                    label="Java/Spring 코드"
                    badge="유저 모드"
                    badgeColor={COLORS.userMode}
                    content={
                        <code style={{
                            backgroundColor: COLORS.bg,
                            padding: '8px 12px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            display: 'block',
                        }}>
                            {selectedExample.javaCode}
                        </code>
                    }
                />

                <FlowArrow active={animationStep >= 1} />

                {/* Step 2: JVM */}
                <FlowStep
                    step={2}
                    currentStep={animationStep}
                    color={COLORS.java}
                    lightColor={COLORS.javaLight}
                    label="JVM (Java Virtual Machine)"
                    badge="유저 모드"
                    badgeColor={COLORS.userMode}
                    content={
                        <div style={{ fontSize: '13px', color: COLORS.textMuted }}>
                            내부 호출: <code style={{ color: COLORS.javaLight }}>{selectedExample.jvmCall}</code>
                        </div>
                    }
                />

                <FlowArrow active={animationStep >= 2} label="시스템 콜 호출" highlight />

                {/* Step 3: 시스템 콜 인터페이스 */}
                <FlowStep
                    step={3}
                    currentStep={animationStep}
                    color={COLORS.arrow}
                    lightColor={COLORS.arrow}
                    label="시스템 콜 인터페이스"
                    badge="모드 전환!"
                    badgeColor={COLORS.kernelMode}
                    content={
                        <div style={{ fontSize: '13px' }}>
                            <code style={{
                                backgroundColor: COLORS.bg,
                                padding: '6px 10px',
                                borderRadius: '4px',
                                color: COLORS.kernelModeLight,
                            }}>
                                {selectedExample.systemCall}
                            </code>
                        </div>
                    }
                />

                <FlowArrow active={animationStep >= 3} />

                {/* Step 4: 커널 */}
                <FlowStep
                    step={4}
                    currentStep={animationStep}
                    color={COLORS.kernelMode}
                    lightColor={COLORS.kernelModeLight}
                    label="OS 커널"
                    badge="커널 모드"
                    badgeColor={COLORS.kernelMode}
                    content={
                        <div style={{ fontSize: '13px', color: COLORS.textMuted }}>
                            {selectedExample.kernelAction}
                        </div>
                    }
                />

                <FlowArrow active={animationStep >= 4} direction="up" label="결과 반환" />

                {/* Step 5: 완료 */}
                <FlowStep
                    step={5}
                    currentStep={animationStep}
                    color={COLORS.success}
                    lightColor={COLORS.success}
                    label="작업 완료"
                    badge="유저 모드 복귀"
                    badgeColor={COLORS.userMode}
                    content={
                        <div style={{ fontSize: '13px', color: COLORS.success }}>
                            ✅ Java 코드 다음 줄 계속 실행
                        </div>
                    }
                />
            </div>

            {/* 애니메이션 버튼 */}
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button
                    onClick={startAnimation}
                    disabled={isAnimating}
                    style={{
                        backgroundColor: isAnimating ? COLORS.border : COLORS.arrow,
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        cursor: isAnimating ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isAnimating ? '⏳ 진행 중...' : '▶️ 흐름 애니메이션 보기'}
                </button>
            </div>

            {/* 핵심 포인트 */}
            <div style={{
                marginTop: '20px',
                backgroundColor: COLORS.kernelMode + '15',
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${COLORS.kernelMode}40`,
            }}>
                <h4 style={{
                    margin: '0 0 12px 0',
                    color: COLORS.kernelModeLight,
                    fontSize: '14px',
                }}>
                    ⚠️ 시스템 콜 비용
                </h4>
                <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
                    <p style={{ margin: '0 0 8px 0' }}>
                        시스템 콜마다 <strong>유저 모드 ↔ 커널 모드 전환</strong>이 발생합니다.
                    </p>
                    <p style={{ margin: 0, color: COLORS.textMuted }}>
                        💡 그래서 <code>BufferedReader</code>나 <code>BufferedOutputStream</code>으로
                        버퍼링하여 시스템 콜 횟수를 줄이는 게 성능에 좋습니다.
                    </p>
                </div>
            </div>
        </div>
    );
}

function FlowStep({ step, currentStep, color, lightColor, label, badge, badgeColor, content }) {
    const isActive = currentStep >= step;

    return (
        <div style={{
            backgroundColor: isActive ? color + '20' : COLORS.bg,
            border: `2px solid ${isActive ? color : COLORS.border}`,
            borderRadius: '10px',
            padding: '14px',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.02)' : 'scale(1)',
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <span style={{
                        backgroundColor: isActive ? color : COLORS.border,
                        color: 'white',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: '600',
                    }}>
                        {step}
                    </span>
                    <span style={{
                        fontWeight: '600',
                        fontSize: '14px',
                        color: isActive ? lightColor : COLORS.textMuted,
                    }}>
                        {label}
                    </span>
                </div>
                <span style={{
                    backgroundColor: badgeColor + '30',
                    color: badgeColor,
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                }}>
                    {badge}
                </span>
            </div>
            {content}
        </div>
    );
}

function FlowArrow({ active, direction = 'down', label, highlight }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '6px 0',
            opacity: active ? 1 : 0.3,
            transition: 'opacity 0.3s ease',
        }}>
            {label && (
                <span style={{
                    fontSize: '11px',
                    color: highlight ? COLORS.kernelModeLight : COLORS.textMuted,
                    backgroundColor: highlight ? COLORS.kernelMode + '30' : 'transparent',
                    padding: highlight ? '2px 8px' : '0',
                    borderRadius: '4px',
                    marginBottom: '2px',
                }}>
                    {label}
                </span>
            )}
            <span style={{
                color: active ? COLORS.arrow : COLORS.border,
                fontSize: '16px',
            }}>
                {direction === 'down' ? '↓' : '↑'}
            </span>
        </div>
    );
}