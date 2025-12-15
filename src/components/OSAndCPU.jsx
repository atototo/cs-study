import React, { useState } from 'react';

const COLORS = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    cpu: '#ef4444',        // 빨강 - 하드웨어
    cpuLight: '#f87171',
    os: '#3b82f6',         // 파랑 - OS
    osLight: '#60a5fa',
    warning: '#f59e0b',
    warningLight: '#fbbf24',
};

export default function OSAndCPU() {
    const [selectedCard, setSelectedCard] = useState(null);

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: COLORS.bg,
            borderRadius: '16px',
            padding: '32px',
            color: COLORS.text,
        }}>
            {/* 헤더 */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: '0 0 8px 0',
                    background: `linear-gradient(135deg, ${COLORS.cpuLight}, ${COLORS.osLight})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    ⚡ 잠깐! OS와 CPU는 다른 레벨입니다
                </h2>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    흔한 오해: "Fetch-Decode-Execute가 OS 기능인가요?" → 아니요!
                </p>
            </div>

            {/* 경고 박스 */}
            <div style={{
                backgroundColor: COLORS.warning + '15',
                border: `1px solid ${COLORS.warning}50`,
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
            }}>
                <span style={{ fontSize: '24px' }}>💡</span>
                <div>
                    <div style={{ fontWeight: '600', marginBottom: '4px', color: COLORS.warningLight }}>
                        핵심 포인트
                    </div>
                    <div style={{ fontSize: '14px', color: COLORS.text, lineHeight: '1.6' }}>
                        <strong>OS도 결국 CPU가 실행하는 "프로그램"입니다.</strong><br />
                        CPU는 하드웨어로 명령어를 처리하고, OS는 그 위에서 돌아가는 소프트웨어예요.
                    </div>
                </div>
            </div>

            {/* 비교 카드 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '24px',
            }}>
                {/* CPU 카드 */}
                <CompareCard
                    title="Fetch-Decode-Execute"
                    subtitle="CPU 명령어 사이클"
                    color={COLORS.cpu}
                    lightColor={COLORS.cpuLight}
                    icon="🔌"
                    badge="하드웨어"
                    isSelected={selectedCard === 'cpu'}
                    onClick={() => setSelectedCard(selectedCard === 'cpu' ? null : 'cpu')}
                    items={[
                        { label: '레벨', value: '전기 신호 (물리적)' },
                        { label: '수행 주체', value: 'CPU 회로 (트랜지스터)' },
                        { label: '동작 시점', value: '전원 ON → 항상 반복' },
                        { label: '비유', value: '💓 심장 박동' },
                    ]}
                    description="의식하지 않아도 자동으로 계속 동작"
                />

                {/* OS 카드 */}
                <CompareCard
                    title="운영체제 (OS)"
                    subtitle="System Call, 스케줄링 등"
                    color={COLORS.os}
                    lightColor={COLORS.osLight}
                    icon="💾"
                    badge="소프트웨어"
                    isSelected={selectedCard === 'os'}
                    onClick={() => setSelectedCard(selectedCard === 'os' ? null : 'os')}
                    items={[
                        { label: '레벨', value: '코드 (논리적)' },
                        { label: '수행 주체', value: 'OS 커널 코드' },
                        { label: '동작 시점', value: '프로그램 요청 시' },
                        { label: '비유', value: '🧠 두뇌 의사결정' },
                    ]}
                    description="필요할 때 의식적으로 판단하고 결정"
                />
            </div>

            {/* 실행 순서 다이어그램 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
            }}>
                <h4 style={{
                    margin: '0 0 16px 0',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: COLORS.text,
                }}>
                    🔄 실행 순서: CPU가 모든 것을 실행한다
                </h4>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}>
                    <FlowStep
                        number="1"
                        color={COLORS.cpu}
                        lightColor={COLORS.cpuLight}
                        title="CPU 전원 ON"
                        description="Fetch-Decode-Execute 사이클 시작 (하드웨어가 자동으로)"
                    />
                    <FlowArrow />
                    <FlowStep
                        number="2"
                        color={COLORS.os}
                        lightColor={COLORS.osLight}
                        title="OS 부팅"
                        description="CPU가 OS 코드를 Fetch-Decode-Execute (OS도 결국 명령어)"
                    />
                    <FlowArrow />
                    <FlowStep
                        number="3"
                        color="#8b5cf6"
                        lightColor="#a78bfa"
                        title="프로그램 실행"
                        description="OS가 CPU 시간을 배분 → CPU가 프로그램 코드 실행"
                    />
                </div>

                {/* 핵심 메시지 */}
                <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    backgroundColor: COLORS.bg,
                    borderRadius: '8px',
                    borderLeft: `3px solid ${COLORS.osLight}`,
                }}>
                    <div style={{ fontSize: '13px', color: COLORS.text }}>
                        <strong style={{ color: COLORS.osLight }}>결론:</strong>{' '}
                        CPU는 쉬지 않고 Fetch-Decode-Execute를 반복하고,
                        OS는 "다음에 어떤 명령어를 실행할지" 관리하는 역할입니다.
                    </div>
                </div>
            </div>
        </div>
    );
}

// 비교 카드 컴포넌트
function CompareCard({ title, subtitle, color, lightColor, icon, badge, items, description, isSelected, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: isSelected ? color + '20' : COLORS.cardBg,
                border: `2px solid ${isSelected ? color : COLORS.border}`,
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
            }}
        >
            {/* 헤더 */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>{icon}</span>
                    <div>
                        <h3 style={{
                            margin: 0,
                            fontSize: '16px',
                            color: lightColor,
                        }}>
                            {title}
                        </h3>
                        <span style={{
                            fontSize: '12px',
                            color: COLORS.textMuted,
                        }}>
                            {subtitle}
                        </span>
                    </div>
                </div>
                <span style={{
                    backgroundColor: color + '30',
                    color: lightColor,
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '600',
                }}>
                    {badge}
                </span>
            </div>

            {/* 항목 리스트 */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '12px',
            }}>
                {items.map((item, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: COLORS.bg,
                            padding: '8px 12px',
                            borderRadius: '6px',
                        }}
                    >
                        <span style={{ fontSize: '12px', color: COLORS.textMuted }}>
                            {item.label}
                        </span>
                        <span style={{ fontSize: '12px', color: COLORS.text, fontWeight: '500' }}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

            {/* 설명 */}
            <div style={{
                fontSize: '12px',
                color: COLORS.textMuted,
                fontStyle: 'italic',
                textAlign: 'center',
            }}>
                {description}
            </div>
        </div>
    );
}

// 플로우 스텝 컴포넌트
function FlowStep({ number, color, lightColor, title, description }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            backgroundColor: COLORS.bg,
            padding: '12px 16px',
            borderRadius: '8px',
            borderLeft: `3px solid ${color}`,
        }}>
            <div style={{
                backgroundColor: color + '30',
                color: lightColor,
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: '700',
                flexShrink: 0,
            }}>
                {number}
            </div>
            <div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: lightColor }}>
                    {title}
                </div>
                <div style={{ fontSize: '12px', color: COLORS.textMuted, marginTop: '2px' }}>
                    {description}
                </div>
            </div>
        </div>
    );
}

// 화살표 컴포넌트
function FlowArrow() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            color: COLORS.textMuted,
            fontSize: '14px',
        }}>
            ↓
        </div>
    );
}