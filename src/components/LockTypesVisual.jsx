import React, { useState } from 'react';

const COLORS = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    mutex: '#ef4444',
    mutexLight: '#f87171',
    semaphore: '#8b5cf6',
    semaphoreLight: '#a78bfa',
    monitor: '#3b82f6',
    monitorLight: '#60a5fa',
    success: '#10b981',
    warning: '#f59e0b',
};

const lockTypes = [
    {
        id: 'mutex',
        name: 'Mutex (Mutual Exclusion)',
        icon: '🔐',
        color: COLORS.mutex,
        lightColor: COLORS.mutexLight,
        analogy: '화장실 열쇠',
        description: '오직 1개의 스레드만 접근 가능',
        features: [
            '이진 상태: 잠김(1) / 열림(0)',
            '소유권 개념: 잠근 스레드만 해제 가능',
            '가장 기본적인 동기화 도구',
        ],
        javaExample: 'synchronized (obj) { ... }',
        useCase: '공유 자원 단독 접근 보장',
    },
    {
        id: 'semaphore',
        name: 'Semaphore',
        icon: '🎫',
        color: COLORS.semaphore,
        lightColor: COLORS.semaphoreLight,
        analogy: '놀이기구 탑승권 (N장)',
        description: 'N개의 스레드까지 동시 접근 가능',
        features: [
            '카운터 기반: 0 이상의 정수',
            'P(wait): 카운터 감소, 0이면 대기',
            'V(signal): 카운터 증가, 대기자 깨움',
        ],
        javaExample: 'Semaphore sem = new Semaphore(3);',
        useCase: 'DB 커넥션 풀 (최대 N개 연결)',
    },
    {
        id: 'monitor',
        name: 'Monitor',
        icon: '🏛️',
        color: COLORS.monitor,
        lightColor: COLORS.monitorLight,
        analogy: 'VIP 라운지 (입장 + 대기실)',
        description: 'Lock + 조건 변수를 하나로 묶은 고수준 동기화',
        features: [
            'Entry Queue: 입장 대기 스레드들',
            'Wait Set: 조건 대기 스레드들',
            'wait(), notify(), notifyAll()',
        ],
        javaExample: 'synchronized + wait/notify',
        useCase: '생산자-소비자 패턴',
    },
];

export default function LockTypesVisual() {
    const [selectedLock, setSelectedLock] = useState('mutex');
    const selected = lockTypes.find(l => l.id === selectedLock);

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
                    background: `linear-gradient(135deg, ${COLORS.mutexLight}, ${COLORS.semaphoreLight}, ${COLORS.monitorLight})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    🔒 Lock의 종류
                </h3>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    동기화 도구들의 특징과 사용 사례
                </p>
            </div>

            {/* 탭 선택 */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
                flexWrap: 'wrap',
            }}>
                {lockTypes.map((lock) => (
                    <button
                        key={lock.id}
                        onClick={() => setSelectedLock(lock.id)}
                        style={{
                            flex: '1',
                            minWidth: '120px',
                            padding: '12px 16px',
                            backgroundColor: selectedLock === lock.id ? lock.color + '20' : COLORS.cardBg,
                            border: `2px solid ${selectedLock === lock.id ? lock.color : COLORS.border}`,
                            borderRadius: '8px',
                            color: selectedLock === lock.id ? lock.lightColor : COLORS.textMuted,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontSize: '14px',
                            fontWeight: selectedLock === lock.id ? '600' : '400',
                        }}
                    >
                        <span style={{ fontSize: '20px', marginRight: '8px' }}>{lock.icon}</span>
                        {lock.name.split(' ')[0]}
                    </button>
                ))}
            </div>

            {/* 선택된 Lock 상세 */}
            {selected && (
                <div style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    border: `2px solid ${selected.color}40`,
                }}>
                    {/* 제목 및 비유 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                            <h4 style={{ margin: '0 0 4px 0', color: selected.lightColor, fontSize: '18px' }}>
                                {selected.icon} {selected.name}
                            </h4>
                            <p style={{ margin: 0, color: COLORS.text, fontSize: '14px' }}>
                                {selected.description}
                            </p>
                        </div>
                        <div style={{
                            backgroundColor: selected.color + '20',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '13px',
                        }}>
                            비유: <strong>{selected.analogy}</strong>
                        </div>
                    </div>

                    {/* 시각화 */}
                    <LockVisualization type={selected.id} color={selected.color} lightColor={selected.lightColor} />

                    {/* 특징 */}
                    <div style={{ marginTop: '16px' }}>
                        <div style={{ color: COLORS.textMuted, fontSize: '12px', marginBottom: '8px' }}>
                            주요 특징
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {selected.features.map((feature, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    fontSize: '13px',
                                }}>
                                    <span style={{ color: selected.lightColor }}>•</span>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Java 예시 & Use Case */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        marginTop: '16px',
                        flexWrap: 'wrap',
                    }}>
                        <div style={{
                            flex: '1',
                            minWidth: '200px',
                            backgroundColor: COLORS.bg,
                            padding: '12px',
                            borderRadius: '8px',
                        }}>
                            <div style={{ color: COLORS.textMuted, fontSize: '11px', marginBottom: '4px' }}>
                                Java 예시
                            </div>
                            <code style={{ color: COLORS.warning, fontSize: '12px' }}>
                                {selected.javaExample}
                            </code>
                        </div>
                        <div style={{
                            flex: '1',
                            minWidth: '200px',
                            backgroundColor: COLORS.bg,
                            padding: '12px',
                            borderRadius: '8px',
                        }}>
                            <div style={{ color: COLORS.textMuted, fontSize: '11px', marginBottom: '4px' }}>
                                대표 사용 사례
                            </div>
                            <span style={{ color: COLORS.success, fontSize: '13px' }}>
                                {selected.useCase}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* 비교표 */}
            <div style={{
                marginTop: '20px',
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '16px',
                overflowX: 'auto',
            }}>
                <div style={{ color: COLORS.textMuted, fontSize: '12px', marginBottom: '12px' }}>
                    📊 한눈에 비교
                </div>
                <table style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '13px',
                }}>
                    <thead>
                        <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                            <th style={{ padding: '8px', textAlign: 'left', color: COLORS.textMuted }}>구분</th>
                            <th style={{ padding: '8px', textAlign: 'center', color: COLORS.mutexLight }}>Mutex</th>
                            <th style={{ padding: '8px', textAlign: 'center', color: COLORS.semaphoreLight }}>Semaphore</th>
                            <th style={{ padding: '8px', textAlign: 'center', color: COLORS.monitorLight }}>Monitor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                            <td style={{ padding: '8px', color: COLORS.textMuted }}>동시 접근</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>1개</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>N개</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>1개</td>
                        </tr>
                        <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                            <td style={{ padding: '8px', color: COLORS.textMuted }}>소유권</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>있음</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>없음</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>있음</td>
                        </tr>
                        <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                            <td style={{ padding: '8px', color: COLORS.textMuted }}>조건 대기</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>❌</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>❌</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>✅</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '8px', color: COLORS.textMuted }}>추상화 수준</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>Low</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>Low</td>
                            <td style={{ padding: '8px', textAlign: 'center' }}>High</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function LockVisualization({ type, color, lightColor }) {
    if (type === 'mutex') {
        return (
            <div style={{
                backgroundColor: COLORS.bg,
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap',
            }}>
                {/* 대기 스레드들 */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '8px' }}>대기 중</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {['T2', 'T3', 'T4'].map((t, i) => (
                            <div key={i} style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: COLORS.border,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                color: COLORS.textMuted,
                            }}>
                                {t}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lock */}
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    backgroundColor: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                }}>
                    🔐
                </div>

                {/* 진입한 스레드 */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '8px' }}>임계 영역</div>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: lightColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: COLORS.bg,
                    }}>
                        T1
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'semaphore') {
        return (
            <div style={{
                backgroundColor: COLORS.bg,
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap',
            }}>
                {/* 대기 스레드들 */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '8px' }}>대기 중</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {['T4', 'T5'].map((t, i) => (
                            <div key={i} style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: COLORS.border,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                color: COLORS.textMuted,
                            }}>
                                {t}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Semaphore (티켓) */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        padding: '8px 16px',
                        backgroundColor: color,
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}>
                        🎫 permits = 0
                    </div>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '4px' }}>
                        max = 3
                    </div>
                </div>

                {/* 진입한 스레드들 */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '8px' }}>사용 중 (3개)</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {['T1', 'T2', 'T3'].map((t, i) => (
                            <div key={i} style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: lightColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: COLORS.bg,
                            }}>
                                {t}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (type === 'monitor') {
        return (
            <div style={{
                backgroundColor: COLORS.bg,
                borderRadius: '8px',
                padding: '16px',
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    {/* Entry Queue */}
                    <div style={{
                        backgroundColor: COLORS.cardBg,
                        padding: '12px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        minWidth: '100px',
                    }}>
                        <div style={{ fontSize: '11px', color: COLORS.textMuted, marginBottom: '8px' }}>
                            Entry Queue
                        </div>
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                            {['T3', 'T4'].map((t, i) => (
                                <div key={i} style={{
                                    width: '30px',
                                    height: '30px',
                                    borderRadius: '50%',
                                    backgroundColor: COLORS.border,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '10px',
                                }}>
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Monitor 내부 */}
                    <div style={{
                        border: `2px solid ${color}`,
                        borderRadius: '12px',
                        padding: '16px',
                        minWidth: '200px',
                    }}>
                        <div style={{ fontSize: '12px', color: lightColor, marginBottom: '12px', textAlign: 'center' }}>
                            🏛️ Monitor
                        </div>

                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            {/* 실행 중 */}
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '10px', color: COLORS.textMuted, marginBottom: '4px' }}>실행 중</div>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: lightColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: COLORS.bg,
                                }}>
                                    T1
                                </div>
                            </div>

                            {/* Wait Set */}
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '10px', color: COLORS.textMuted, marginBottom: '4px' }}>Wait Set</div>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    backgroundColor: COLORS.warning + '40',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    color: COLORS.warning,
                                }}>
                                    T2
                                </div>
                                <div style={{ fontSize: '9px', color: COLORS.textMuted, marginTop: '2px' }}>
                                    wait() 호출
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}