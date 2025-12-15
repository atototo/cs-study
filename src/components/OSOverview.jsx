import React, { useState } from 'react';

const COLORS = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    application: '#8b5cf6',
    applicationLight: '#a78bfa',
    os: '#3b82f6',
    osLight: '#60a5fa',
    hardware: '#10b981',
    hardwareLight: '#34d399',
    accent: '#f59e0b',
};

const layerData = {
    application: {
        title: '응용 프로그램',
        subtitle: 'Application',
        color: COLORS.application,
        lightColor: COLORS.applicationLight,
        examples: ['Chrome', 'IntelliJ', 'Slack', 'Spring Boot'],
        description: '사용자가 직접 사용하는 소프트웨어',
        details: [
            '사용자 인터페이스 제공',
            'OS가 제공하는 API 호출',
            '하드웨어에 직접 접근 불가',
        ],
    },
    os: {
        title: '운영체제',
        subtitle: 'Operating System',
        color: COLORS.os,
        lightColor: COLORS.osLight,
        examples: ['Windows', 'macOS', 'Linux', 'Ubuntu'],
        description: '하드웨어와 소프트웨어 사이의 중간 관리자',
        roles: [
            { icon: '⚙️', name: '프로세스 관리', desc: 'CPU 시간 배분' },
            { icon: '🧠', name: '메모리 관리', desc: '메모리 할당/회수' },
            { icon: '📁', name: '파일 시스템', desc: '파일 저장/읽기' },
            { icon: '🔌', name: 'I/O 관리', desc: '입출력 장치 제어' },
        ],
    },
    hardware: {
        title: '하드웨어',
        subtitle: 'Hardware',
        color: COLORS.hardware,
        lightColor: COLORS.hardwareLight,
        examples: ['CPU', 'RAM', 'SSD/HDD', 'Network Card'],
        description: '실제 물리적 장치',
        details: [
            '전기 신호로 동작',
            'OS를 통해서만 제어됨',
            '직접 접근 시 보안 위험',
        ],
    },
};

export default function OSOverview() {
    const [selectedLayer, setSelectedLayer] = useState(null);
    const [hoveredRole, setHoveredRole] = useState(null);

    const handleLayerClick = (layer) => {
        setSelectedLayer(selectedLayer === layer ? null : layer);
    };

    return (
        <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            backgroundColor: COLORS.bg,
            borderRadius: '16px',
            padding: '32px',
            color: COLORS.text,
        }}>
            {/* 헤더 */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    margin: '0 0 8px 0',
                    background: `linear-gradient(135deg, ${COLORS.applicationLight}, ${COLORS.osLight}, ${COLORS.hardwareLight})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    🏗️ 컴퓨터 구조에서 OS의 위치
                </h2>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    클릭하여 각 계층의 상세 정보를 확인하세요
                </p>
            </div>

            {/* 메인 레이어 다이어그램 */}
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {/* 왼쪽: 레이어 스택 */}
                <div style={{ flex: '1', minWidth: '300px' }}>
                    {/* Application Layer */}
                    <LayerBox
                        data={layerData.application}
                        isSelected={selectedLayer === 'application'}
                        onClick={() => handleLayerClick('application')}
                        position="top"
                    />

                    {/* 화살표 */}
                    <Arrow direction="down" label="시스템 콜" />

                    {/* OS Layer */}
                    <div
                        onClick={() => handleLayerClick('os')}
                        style={{
                            backgroundColor: selectedLayer === 'os' ? COLORS.os + '30' : COLORS.cardBg,
                            border: `2px solid ${selectedLayer === 'os' ? COLORS.os : COLORS.border}`,
                            borderRadius: '12px',
                            padding: '20px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: selectedLayer === 'os' ? 'scale(1.02)' : 'scale(1)',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px',
                        }}>
                            <div>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '18px',
                                    color: COLORS.osLight,
                                }}>
                                    {layerData.os.title}
                                </h3>
                                <span style={{
                                    fontSize: '12px',
                                    color: COLORS.textMuted,
                                }}>
                                    {layerData.os.subtitle}
                                </span>
                            </div>
                            <div style={{
                                backgroundColor: COLORS.os + '30',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '12px',
                                color: COLORS.osLight,
                            }}>
                                🎛️ 자원 관리자
                            </div>
                        </div>

                        {/* OS 역할 그리드 */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '8px',
                        }}>
                            {layerData.os.roles.map((role, idx) => (
                                <div
                                    key={idx}
                                    onMouseEnter={() => setHoveredRole(idx)}
                                    onMouseLeave={() => setHoveredRole(null)}
                                    style={{
                                        backgroundColor: hoveredRole === idx ? COLORS.os + '40' : COLORS.bg,
                                        padding: '12px',
                                        borderRadius: '8px',
                                        transition: 'all 0.2s ease',
                                        border: `1px solid ${hoveredRole === idx ? COLORS.os : 'transparent'}`,
                                    }}
                                >
                                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{role.icon}</div>
                                    <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.text }}>
                                        {role.name}
                                    </div>
                                    <div style={{ fontSize: '11px', color: COLORS.textMuted }}>
                                        {role.desc}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* OS 예시 */}
                        <div style={{
                            display: 'flex',
                            gap: '8px',
                            marginTop: '16px',
                            flexWrap: 'wrap',
                        }}>
                            {layerData.os.examples.map((ex, idx) => (
                                <span
                                    key={idx}
                                    style={{
                                        backgroundColor: COLORS.os + '20',
                                        color: COLORS.osLight,
                                        padding: '4px 10px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                    }}
                                >
                                    {ex}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* 화살표 */}
                    <Arrow direction="down" label="드라이버 / 인터럽트" />

                    {/* Hardware Layer */}
                    <LayerBox
                        data={layerData.hardware}
                        isSelected={selectedLayer === 'hardware'}
                        onClick={() => handleLayerClick('hardware')}
                        position="bottom"
                    />
                </div>

                {/* 오른쪽: 상세 정보 패널 */}
                <div style={{
                    flex: '1',
                    minWidth: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}>
                    {selectedLayer ? (
                        <DetailPanel layer={selectedLayer} data={layerData[selectedLayer]} />
                    ) : (
                        <div style={{
                            backgroundColor: COLORS.cardBg,
                            borderRadius: '12px',
                            padding: '24px',
                            textAlign: 'center',
                            border: `1px dashed ${COLORS.border}`,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <div style={{ fontSize: '48px', marginBottom: '16px' }}>👈</div>
                            <p style={{ color: COLORS.textMuted, margin: 0 }}>
                                왼쪽 계층을 클릭하면<br />상세 정보가 표시됩니다
                            </p>
                        </div>
                    )}

                    {/* 핵심 포인트 */}
                    <div style={{
                        backgroundColor: COLORS.accent + '15',
                        borderRadius: '12px',
                        padding: '16px',
                        border: `1px solid ${COLORS.accent}40`,
                    }}>
                        <h4 style={{
                            margin: '0 0 12px 0',
                            color: COLORS.accent,
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}>
                            💡 핵심 포인트
                        </h4>
                        <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            color: COLORS.text,
                            fontSize: '13px',
                            lineHeight: '1.8',
                        }}>
                            <li>응용 프로그램은 <strong>OS를 통해서만</strong> 하드웨어에 접근</li>
                            <li>OS는 <strong>자원을 추상화</strong>하여 프로그램에 제공</li>
                            <li>이 구조 덕분에 <strong>보안</strong>과 <strong>안정성</strong> 확보</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 하단: 실무 연결 */}
            <div style={{
                marginTop: '24px',
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
                }}>
                    ☕ Java/Spring과 OS
                </h4>
                <div style={{
                    backgroundColor: COLORS.bg,
                    borderRadius: '8px',
                    padding: '16px',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    overflowX: 'auto',
                }}>
                    <div style={{ color: COLORS.textMuted, marginBottom: '8px' }}>
                        # JVM 메모리 설정 = OS에게 메모리 요청
                    </div>
                    <div>
                        <span style={{ color: COLORS.hardwareLight }}>java</span>
                        <span style={{ color: COLORS.accent }}> -Xms256m -Xmx512m</span>
                        <span style={{ color: COLORS.text }}> -jar app.jar</span>
                    </div>
                    <div style={{
                        marginTop: '12px',
                        paddingTop: '12px',
                        borderTop: `1px solid ${COLORS.border}`,
                        color: COLORS.textMuted,
                        fontSize: '12px',
                    }}>
                        <span style={{ color: COLORS.osLight }}>-Xms256m</span>: 시작 시 Heap 256MB 할당 요청
                        <br />
                        <span style={{ color: COLORS.osLight }}>-Xmx512m</span>: 최대 Heap 512MB까지 사용 허용
                    </div>
                </div>
            </div>
        </div>
    );
}

// 레이어 박스 컴포넌트
function LayerBox({ data, isSelected, onClick, position }) {
    const borderRadius = position === 'top'
        ? '12px 12px 4px 4px'
        : position === 'bottom'
            ? '4px 4px 12px 12px'
            : '4px';

    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: isSelected ? data.color + '30' : COLORS.cardBg,
                border: `2px solid ${isSelected ? data.color : COLORS.border}`,
                borderRadius,
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <div>
                    <h3 style={{
                        margin: 0,
                        fontSize: '18px',
                        color: data.lightColor,
                    }}>
                        {data.title}
                    </h3>
                    <span style={{
                        fontSize: '12px',
                        color: COLORS.textMuted,
                    }}>
                        {data.subtitle}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {data.examples.slice(0, 3).map((ex, idx) => (
                        <span
                            key={idx}
                            style={{
                                backgroundColor: data.color + '20',
                                color: data.lightColor,
                                padding: '4px 10px',
                                borderRadius: '12px',
                                fontSize: '11px',
                            }}
                        >
                            {ex}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

// 화살표 컴포넌트
function Arrow({ direction, label }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px 0',
            color: COLORS.textMuted,
        }}>
            <div style={{
                fontSize: '11px',
                marginBottom: '4px',
                backgroundColor: COLORS.bg,
                padding: '2px 8px',
                borderRadius: '4px',
            }}>
                {label}
            </div>
            <div style={{ fontSize: '16px' }}>
                {direction === 'down' ? '↓' : '↑'}
            </div>
        </div>
    );
}

// 상세 정보 패널
function DetailPanel({ layer, data }) {
    return (
        <div style={{
            backgroundColor: data.color + '15',
            borderRadius: '12px',
            padding: '20px',
            border: `1px solid ${data.color}40`,
        }}>
            <h3 style={{
                margin: '0 0 8px 0',
                color: data.lightColor,
                fontSize: '18px',
            }}>
                {data.title}
            </h3>
            <p style={{
                margin: '0 0 16px 0',
                color: COLORS.text,
                fontSize: '14px',
            }}>
                {data.description}
            </p>

            {data.details && (
                <ul style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: COLORS.text,
                    fontSize: '13px',
                    lineHeight: '1.8',
                }}>
                    {data.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                    ))}
                </ul>
            )}

            {data.roles && (
                <div style={{ marginTop: '16px' }}>
                    <h4 style={{
                        margin: '0 0 12px 0',
                        fontSize: '13px',
                        color: COLORS.textMuted,
                    }}>
                        주요 역할
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {data.roles.map((role, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    backgroundColor: COLORS.bg,
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                }}
                            >
                                <span style={{ fontSize: '18px' }}>{role.icon}</span>
                                <div>
                                    <div style={{ fontSize: '13px', fontWeight: '600' }}>{role.name}</div>
                                    <div style={{ fontSize: '11px', color: COLORS.textMuted }}>{role.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}