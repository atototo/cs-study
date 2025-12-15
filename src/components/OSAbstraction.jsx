import React, { useState } from 'react';

const COLORS = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    hardware: '#ef4444',
    hardwareLight: '#f87171',
    os: '#3b82f6',
    osLight: '#60a5fa',
    app: '#10b981',
    appLight: '#34d399',
    accent: '#f59e0b',
    accentLight: '#fbbf24',
};

const abstractionData = [
    {
        hardware: { icon: '💾', name: 'RAM 물리 주소', detail: '0x7FFF8A3B...' },
        os: { name: '가상 메모리', detail: '프로세스별 독립 공간' },
        dev: { name: '변수 선언', code: 'int x = 10;' },
    },
    {
        hardware: { icon: '🔩', name: '디스크 섹터', detail: '플래터, 헤드, CRC' },
        os: { name: '파일 시스템', detail: '파일/폴더 구조' },
        dev: { name: '파일 API', code: 'Files.write(path, data)' },
    },
    {
        hardware: { icon: '⚡', name: 'CPU 레지스터', detail: '인터럽트, 컨텍스트' },
        os: { name: '프로세스/쓰레드', detail: '스케줄링, 동기화' },
        dev: { name: '쓰레드 API', code: 'new Thread(task)' },
    },
    {
        hardware: { icon: '🌐', name: '네트워크 패킷', detail: 'MAC, IP, 라우팅' },
        os: { name: '소켓', detail: 'TCP/UDP 연결' },
        dev: { name: '소켓 API', code: 'socket.connect(host)' },
    },
];

export default function OSAbstraction() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [showComparison, setShowComparison] = useState(false);

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
                    background: `linear-gradient(135deg, ${COLORS.hardwareLight}, ${COLORS.osLight}, ${COLORS.appLight})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    🎁 OS의 핵심 역할: 추상화
                </h2>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    복잡한 하드웨어를 단순한 인터페이스로 감싸서 제공
                </p>
            </div>

            {/* 비유 박스 */}
            <div style={{
                backgroundColor: COLORS.accent + '15',
                border: `1px solid ${COLORS.accent}50`,
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                }}>
                    <span style={{ fontSize: '28px' }}>🏨</span>
                    <div>
                        <div style={{ fontWeight: '600', marginBottom: '6px', color: COLORS.accentLight }}>
                            비유: 호텔 프론트 데스크
                        </div>
                        <div style={{ fontSize: '13px', color: COLORS.text, lineHeight: '1.6' }}>
                            손님: "방 주세요" → 프론트: "302호입니다"<br />
                            <span style={{ color: COLORS.textMuted }}>
                                손님은 빈 방 확인, 청소 상태, 열쇠 관리 등을 몰라도 됨.
                                <strong style={{ color: COLORS.accentLight }}> "302호"만 알면 끝!</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Before/After 비교 토글 */}
            <div
                onClick={() => setShowComparison(!showComparison)}
                style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '24px',
                    cursor: 'pointer',
                    border: `1px solid ${showComparison ? COLORS.osLight : COLORS.border}`,
                    transition: 'all 0.3s ease',
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: showComparison ? '16px' : '0',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                    }}>
                        <span style={{ fontSize: '18px' }}>📁</span>
                        <span style={{ fontWeight: '600' }}>파일 저장 예시</span>
                        <span style={{ fontSize: '12px', color: COLORS.textMuted }}>
                            (클릭해서 비교)
                        </span>
                    </div>
                    <span style={{
                        transform: showComparison ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                    }}>
                        ▼
                    </span>
                </div>

                {showComparison && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '16px',
                    }}>
                        {/* 추상화 없이 */}
                        <div style={{
                            backgroundColor: COLORS.hardware + '15',
                            borderRadius: '8px',
                            padding: '16px',
                            border: `1px solid ${COLORS.hardware}30`,
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '12px',
                            }}>
                                <span style={{
                                    backgroundColor: COLORS.hardware + '30',
                                    color: COLORS.hardwareLight,
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                }}>
                                    ❌ 추상화 없이
                                </span>
                            </div>
                            <div style={{
                                fontFamily: 'monospace',
                                fontSize: '11px',
                                lineHeight: '1.8',
                                color: COLORS.textMuted,
                            }}>
                                <div>1. 디스크 컨트롤러 명령 전송</div>
                                <div>2. 섹터 번호 계산 (0x7A3F)</div>
                                <div>3. 플래터 회전 대기</div>
                                <div>4. 헤드 이동 명령</div>
                                <div>5. 자기장으로 비트 기록</div>
                                <div>6. CRC 에러 체크</div>
                                <div>7. 배드 섹터 처리...</div>
                                <div style={{ color: COLORS.hardwareLight }}>😵 수십 줄 코드</div>
                            </div>
                        </div>

                        {/* 추상화 후 */}
                        <div style={{
                            backgroundColor: COLORS.app + '15',
                            borderRadius: '8px',
                            padding: '16px',
                            border: `1px solid ${COLORS.app}30`,
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '12px',
                            }}>
                                <span style={{
                                    backgroundColor: COLORS.app + '30',
                                    color: COLORS.appLight,
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                }}>
                                    ✅ OS 추상화 후
                                </span>
                            </div>
                            <div style={{
                                fontFamily: 'monospace',
                                fontSize: '12px',
                                backgroundColor: COLORS.bg,
                                padding: '12px',
                                borderRadius: '6px',
                                marginBottom: '8px',
                            }}>
                                <span style={{ color: COLORS.appLight }}>Files</span>
                                <span style={{ color: COLORS.text }}>.write(path, data);</span>
                            </div>
                            <div style={{
                                fontSize: '12px',
                                color: COLORS.appLight,
                                textAlign: 'center',
                            }}>
                                😊 한 줄로 끝!
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 추상화 테이블 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
            }}>
                <h4 style={{
                    margin: '0 0 16px 0',
                    fontSize: '14px',
                    color: COLORS.text,
                }}>
                    🔄 OS가 추상화하는 것들
                </h4>

                {/* 테이블 헤더 */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '8px',
                    marginBottom: '8px',
                }}>
                    <div style={{
                        backgroundColor: COLORS.hardware + '20',
                        color: COLORS.hardwareLight,
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textAlign: 'center',
                    }}>
                        🔩 실제 하드웨어
                    </div>
                    <div style={{
                        backgroundColor: COLORS.os + '20',
                        color: COLORS.osLight,
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textAlign: 'center',
                    }}>
                        🎛️ OS 추상화
                    </div>
                    <div style={{
                        backgroundColor: COLORS.app + '20',
                        color: COLORS.appLight,
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textAlign: 'center',
                    }}>
                        👨‍💻 개발자가 보는 것
                    </div>
                </div>

                {/* 테이블 행 */}
                {abstractionData.map((row, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedRow(selectedRow === idx ? null : idx)}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr',
                            gap: '8px',
                            marginBottom: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{
                            backgroundColor: selectedRow === idx ? COLORS.hardware + '20' : COLORS.bg,
                            padding: '12px',
                            borderRadius: '6px',
                            border: `1px solid ${selectedRow === idx ? COLORS.hardware + '50' : 'transparent'}`,
                            transition: 'all 0.2s ease',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span>{row.hardware.icon}</span>
                                <span style={{ fontSize: '12px', fontWeight: '500' }}>{row.hardware.name}</span>
                            </div>
                            {selectedRow === idx && (
                                <div style={{ fontSize: '10px', color: COLORS.textMuted, marginTop: '4px' }}>
                                    {row.hardware.detail}
                                </div>
                            )}
                        </div>
                        <div style={{
                            backgroundColor: selectedRow === idx ? COLORS.os + '20' : COLORS.bg,
                            padding: '12px',
                            borderRadius: '6px',
                            border: `1px solid ${selectedRow === idx ? COLORS.os + '50' : 'transparent'}`,
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '12px', fontWeight: '500' }}>{row.os.name}</div>
                                {selectedRow === idx && (
                                    <div style={{ fontSize: '10px', color: COLORS.textMuted, marginTop: '2px' }}>
                                        {row.os.detail}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div style={{
                            backgroundColor: selectedRow === idx ? COLORS.app + '20' : COLORS.bg,
                            padding: '12px',
                            borderRadius: '6px',
                            border: `1px solid ${selectedRow === idx ? COLORS.app + '50' : 'transparent'}`,
                            transition: 'all 0.2s ease',
                        }}>
                            <div style={{ fontSize: '12px', fontWeight: '500' }}>{row.dev.name}</div>
                            <div style={{
                                fontFamily: 'monospace',
                                fontSize: '10px',
                                color: COLORS.appLight,
                                marginTop: '2px',
                            }}>
                                {row.dev.code}
                            </div>
                        </div>
                    </div>
                ))}

                <div style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    color: COLORS.textMuted,
                    marginTop: '8px',
                }}>
                    클릭하면 상세 정보를 볼 수 있어요
                </div>
            </div>

            {/* 왜 필요한가 */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
            }}>
                <BenefitCard
                    icon="🌍"
                    title="이식성"
                    description="같은 코드가 Windows, Linux, macOS에서 동작"
                    color={COLORS.os}
                    lightColor={COLORS.osLight}
                />
                <BenefitCard
                    icon="🛡️"
                    title="안전성"
                    description="프로그램 간 메모리 격리, 자원 보호"
                    color={COLORS.hardware}
                    lightColor={COLORS.hardwareLight}
                />
                <BenefitCard
                    icon="🚀"
                    title="생산성"
                    description="수개월 → 한 줄 코드로 단축"
                    color={COLORS.app}
                    lightColor={COLORS.appLight}
                />
            </div>
        </div>
    );
}

// 혜택 카드 컴포넌트
function BenefitCard({ icon, title, description, color, lightColor }) {
    return (
        <div style={{
            backgroundColor: COLORS.cardBg,
            borderRadius: '10px',
            padding: '16px',
            textAlign: 'center',
            border: `1px solid ${COLORS.border}`,
        }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
            <div style={{
                fontSize: '13px',
                fontWeight: '600',
                color: lightColor,
                marginBottom: '4px',
            }}>
                {title}
            </div>
            <div style={{
                fontSize: '11px',
                color: COLORS.textMuted,
                lineHeight: '1.4',
            }}>
                {description}
            </div>
        </div>
    );
}