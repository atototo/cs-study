import React, { useState, useEffect } from 'react';

const COLORS = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    java: '#f97316',      // 오렌지
    javaLight: '#fb923c',
    jvm: '#8b5cf6',       // 보라
    jvmLight: '#a78bfa',
    os: '#3b82f6',        // 파랑
    osLight: '#60a5fa',
    windows: '#0ea5e9',
    mac: '#64748b',
    linux: '#eab308',
    accent: '#10b981',
};

export default function JVMAndOS() {
    const [activeTab, setActiveTab] = useState('structure');
    const [selectedOS, setSelectedOS] = useState('windows');
    const [compileStep, setCompileStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const startAnimation = () => {
        setIsAnimating(true);
        setCompileStep(0);

        const steps = [1, 2, 3, 4];
        steps.forEach((step, idx) => {
            setTimeout(() => {
                setCompileStep(step);
                if (step === 4) {
                    setTimeout(() => setIsAnimating(false), 1000);
                }
            }, (idx + 1) * 800);
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
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                    margin: '0 0 8px 0',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    ☕ JVM과 OS의 관계
                </h3>
                <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '14px' }}>
                    "Write Once, Run Anywhere" - Java의 플랫폼 독립성
                </p>
            </div>

            {/* 탭 네비게이션 */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
                borderBottom: `1px solid ${COLORS.border}`,
                paddingBottom: '12px',
            }}>
                {[
                    { id: 'structure', label: '🏗️ 구조', desc: 'JVM 레이어' },
                    { id: 'platform', label: '🌍 플랫폼 독립성', desc: 'WORA' },
                    { id: 'memory', label: '🧠 메모리 설정', desc: '-Xmx' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '10px 16px',
                            backgroundColor: activeTab === tab.id ? COLORS.jvm + '30' : 'transparent',
                            border: `1px solid ${activeTab === tab.id ? COLORS.jvm : COLORS.border}`,
                            borderRadius: '8px',
                            color: activeTab === tab.id ? COLORS.jvmLight : COLORS.textMuted,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontSize: '13px',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* 탭 컨텐츠 */}
            {activeTab === 'structure' && (
                <StructureTab selectedOS={selectedOS} setSelectedOS={setSelectedOS} />
            )}
            {activeTab === 'platform' && (
                <PlatformTab
                    compileStep={compileStep}
                    isAnimating={isAnimating}
                    startAnimation={startAnimation}
                />
            )}
            {activeTab === 'memory' && <MemoryTab />}
        </div>
    );
}

// 구조 탭 - JVM 레이어 시각화
function StructureTab({ selectedOS, setSelectedOS }) {
    const osData = {
        windows: { name: 'Windows', icon: '🪟', color: COLORS.windows },
        mac: { name: 'macOS', icon: '🍎', color: COLORS.mac },
        linux: { name: 'Linux', icon: '🐧', color: COLORS.linux },
    };

    return (
        <div>
            {/* OS 선택 */}
            <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '20px',
                justifyContent: 'center',
            }}>
                {Object.entries(osData).map(([key, os]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedOS(key)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: selectedOS === key ? os.color + '30' : COLORS.cardBg,
                            border: `2px solid ${selectedOS === key ? os.color : COLORS.border}`,
                            borderRadius: '8px',
                            color: selectedOS === key ? COLORS.text : COLORS.textMuted,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <span>{os.icon}</span>
                        <span>{os.name}</span>
                    </button>
                ))}
            </div>

            {/* 레이어 다이어그램 */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                maxWidth: '500px',
                margin: '0 auto',
            }}>
                {/* Java Application */}
                <div style={{
                    backgroundColor: COLORS.java + '20',
                    border: `2px solid ${COLORS.java}`,
                    borderRadius: '12px 12px 4px 4px',
                    padding: '16px',
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>☕</div>
                    <div style={{ fontWeight: '600', color: COLORS.javaLight }}>Java Application</div>
                    <div style={{ fontSize: '12px', color: COLORS.textMuted }}>
                        Spring Boot, IntelliJ, Minecraft...
                    </div>
                </div>

                <Arrow label="바이트코드 (.class)" />

                {/* JVM */}
                <div style={{
                    backgroundColor: COLORS.jvm + '20',
                    border: `2px solid ${COLORS.jvm}`,
                    borderRadius: '4px',
                    padding: '20px',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px',
                    }}>
                        <div>
                            <div style={{ fontWeight: '600', color: COLORS.jvmLight, fontSize: '16px' }}>
                                JVM (Java Virtual Machine)
                            </div>
                            <div style={{ fontSize: '12px', color: COLORS.textMuted }}>
                                {osData[selectedOS].icon} {osData[selectedOS].name}용 JVM
                            </div>
                        </div>
                        <div style={{
                            backgroundColor: COLORS.jvm + '40',
                            padding: '6px 12px',
                            borderRadius: '16px',
                            fontSize: '11px',
                            color: COLORS.jvmLight,
                        }}>
                            🔄 추상화 계층
                        </div>
                    </div>

                    {/* JVM 내부 구조 */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '8px',
                    }}>
                        {[
                            { name: 'Heap', desc: '객체 저장', icon: '📦' },
                            { name: 'Stack', desc: '메서드 호출', icon: '📚' },
                            { name: 'GC', desc: '메모리 정리', icon: '🗑️' },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                style={{
                                    backgroundColor: COLORS.bg,
                                    padding: '10px',
                                    borderRadius: '6px',
                                    textAlign: 'center',
                                }}
                            >
                                <div style={{ fontSize: '16px' }}>{item.icon}</div>
                                <div style={{ fontSize: '12px', fontWeight: '600' }}>{item.name}</div>
                                <div style={{ fontSize: '10px', color: COLORS.textMuted }}>{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <Arrow label="시스템 콜" />

                {/* OS */}
                <div style={{
                    backgroundColor: osData[selectedOS].color + '20',
                    border: `2px solid ${osData[selectedOS].color}`,
                    borderRadius: '4px 4px 12px 12px',
                    padding: '16px',
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: '24px', marginBottom: '4px' }}>{osData[selectedOS].icon}</div>
                    <div style={{ fontWeight: '600', color: COLORS.text }}>{osData[selectedOS].name}</div>
                    <div style={{ fontSize: '12px', color: COLORS.textMuted }}>
                        CPU, 메모리, 파일, 네트워크 관리
                    </div>
                </div>
            </div>

            {/* 핵심 포인트 */}
            <div style={{
                marginTop: '24px',
                backgroundColor: COLORS.accent + '15',
                borderRadius: '8px',
                padding: '16px',
                border: `1px solid ${COLORS.accent}40`,
            }}>
                <div style={{ fontWeight: '600', color: COLORS.accent, marginBottom: '8px', fontSize: '14px' }}>
                    💡 핵심: JVM이 중간에서 번역
                </div>
                <div style={{ fontSize: '13px', color: COLORS.text, lineHeight: '1.6' }}>
                    Java 코드는 <strong>바이트코드</strong>로 컴파일되고, JVM이 이를
                    <strong style={{ color: osData[selectedOS].color }}> {osData[selectedOS].name}</strong>가
                    이해하는 <strong>네이티브 코드</strong>로 변환합니다.
                    OS마다 다른 JVM이 있어서 같은 .class 파일이 어디서든 실행됩니다.
                </div>
            </div>
        </div>
    );
}

// 플랫폼 독립성 탭
function PlatformTab({ compileStep, isAnimating, startAnimation }) {
    return (
        <div>
            {/* 애니메이션 컨트롤 */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <button
                    onClick={startAnimation}
                    disabled={isAnimating}
                    style={{
                        padding: '10px 24px',
                        backgroundColor: isAnimating ? COLORS.border : COLORS.accent,
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: isAnimating ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    {isAnimating ? '실행 중...' : '▶️ 컴파일 과정 보기'}
                </button>
            </div>

            {/* 컴파일 플로우 */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                flexWrap: 'wrap',
                marginBottom: '24px',
            }}>
                {/* Step 1: .java */}
                <FlowBox
                    active={compileStep >= 1}
                    color={COLORS.java}
                    icon="📝"
                    title="Hello.java"
                    desc="소스 코드"
                />

                <FlowArrow active={compileStep >= 2} label="javac" />

                {/* Step 2: .class */}
                <FlowBox
                    active={compileStep >= 2}
                    color={COLORS.jvm}
                    icon="📦"
                    title="Hello.class"
                    desc="바이트코드"
                />

                <FlowArrow active={compileStep >= 3} label="JVM" />

                {/* Step 3: 각 OS */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    opacity: compileStep >= 3 ? 1 : 0.3,
                    transition: 'opacity 0.3s ease',
                }}>
                    {[
                        { os: 'Windows', icon: '🪟', color: COLORS.windows },
                        { os: 'macOS', icon: '🍎', color: COLORS.mac },
                        { os: 'Linux', icon: '🐧', color: COLORS.linux },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                backgroundColor: item.color + '20',
                                border: `1px solid ${item.color}`,
                                borderRadius: '6px',
                                padding: '6px 12px',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                animation: compileStep >= 4 ? 'pulse 0.5s ease' : 'none',
                            }}
                        >
                            <span>{item.icon}</span>
                            <span>{item.os}</span>
                            {compileStep >= 4 && <span style={{ color: COLORS.accent }}>✓</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* 비교: Java vs C */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
            }}>
                {/* Java */}
                <div style={{
                    backgroundColor: COLORS.java + '15',
                    borderRadius: '12px',
                    padding: '16px',
                    border: `1px solid ${COLORS.java}40`,
                }}>
                    <div style={{
                        fontWeight: '600',
                        color: COLORS.javaLight,
                        marginBottom: '12px',
                        fontSize: '14px',
                    }}>
                        ☕ Java (WORA)
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
                        <div style={{ marginBottom: '8px' }}>
                            <code style={{
                                backgroundColor: COLORS.bg,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '11px',
                            }}>
                                .java → .class → 모든 OS
                            </code>
                        </div>
                        <div style={{ color: COLORS.accent }}>✓ 한 번 컴파일, 어디서든 실행</div>
                        <div style={{ color: COLORS.textMuted }}>✓ JVM이 OS 차이를 흡수</div>
                    </div>
                </div>

                {/* C/C++ */}
                <div style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: '12px',
                    padding: '16px',
                    border: `1px solid ${COLORS.border}`,
                }}>
                    <div style={{
                        fontWeight: '600',
                        color: COLORS.textMuted,
                        marginBottom: '12px',
                        fontSize: '14px',
                    }}>
                        ⚙️ C/C++ (네이티브)
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
                        <div style={{ marginBottom: '8px' }}>
                            <code style={{
                                backgroundColor: COLORS.bg,
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '11px',
                            }}>
                                .c → OS별 .exe/.out
                            </code>
                        </div>
                        <div style={{ color: '#ef4444' }}>✗ OS마다 다시 컴파일</div>
                        <div style={{ color: COLORS.textMuted }}>✗ Windows용 ≠ Mac용</div>
                    </div>
                </div>
            </div>

            {/* 면접 포인트 */}
            <div style={{
                marginTop: '20px',
                backgroundColor: COLORS.cardBg,
                borderRadius: '8px',
                padding: '16px',
            }}>
                <div style={{
                    fontWeight: '600',
                    color: COLORS.accent,
                    marginBottom: '8px',
                    fontSize: '13px',
                }}>
                    🎯 면접 답변
                </div>
                <div style={{
                    fontSize: '13px',
                    color: COLORS.text,
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                }}>
                    "Java가 플랫폼 독립적인 이유는 <strong>JVM이 중간 계층</strong>으로 존재하기 때문입니다.
                    Java 소스는 <strong>바이트코드</strong>로 컴파일되고, 각 OS별 JVM이 이를
                    해당 OS의 네이티브 코드로 변환합니다. 덕분에 <strong>같은 .class 파일</strong>이
                    Windows, macOS, Linux 어디서든 실행됩니다."
                </div>
            </div>
        </div>
    );
}

// 메모리 설정 탭
function MemoryTab() {
    const [xms, setXms] = useState(256);
    const [xmx, setXmx] = useState(512);

    return (
        <div>
            {/* 메모리 시뮬레이터 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '13px',
                        color: COLORS.textMuted,
                    }}>
                        <code style={{ color: COLORS.javaLight }}>-Xms</code> 초기 Heap: {xms}MB
                    </label>
                    <input
                        type="range"
                        min="128"
                        max="1024"
                        step="128"
                        value={xms}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setXms(val);
                            if (val > xmx) setXmx(val);
                        }}
                        style={{ width: '100%', accentColor: COLORS.jvm }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontSize: '13px',
                        color: COLORS.textMuted,
                    }}>
                        <code style={{ color: COLORS.javaLight }}>-Xmx</code> 최대 Heap: {xmx}MB
                    </label>
                    <input
                        type="range"
                        min="128"
                        max="2048"
                        step="128"
                        value={xmx}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setXmx(val);
                            if (val < xms) setXms(val);
                        }}
                        style={{ width: '100%', accentColor: COLORS.jvm }}
                    />
                </div>

                {/* 명령어 생성 */}
                <div style={{
                    backgroundColor: COLORS.bg,
                    borderRadius: '8px',
                    padding: '16px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                }}>
                    <span style={{ color: COLORS.accent }}>java</span>
                    <span style={{ color: COLORS.javaLight }}> -Xms{xms}m -Xmx{xmx}m</span>
                    <span style={{ color: COLORS.text }}> -jar app.jar</span>
                </div>
            </div>

            {/* 시각적 메모리 다이어그램 */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
            }}>
                <div style={{
                    fontSize: '13px',
                    color: COLORS.textMuted,
                    marginBottom: '16px',
                    textAlign: 'center',
                }}>
                    OS가 JVM에게 할당하는 메모리
                </div>

                {/* OS 영역 */}
                <div style={{
                    backgroundColor: COLORS.os + '20',
                    border: `2px solid ${COLORS.os}`,
                    borderRadius: '12px',
                    padding: '16px',
                }}>
                    <div style={{
                        fontSize: '12px',
                        color: COLORS.osLight,
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <span>🖥️</span>
                        <span>OS 관리 영역</span>
                        <span style={{ marginLeft: 'auto', color: COLORS.textMuted }}>
                            "JVM아, {xmx}MB까지 써도 돼"
                        </span>
                    </div>

                    {/* JVM 영역 */}
                    <div style={{
                        backgroundColor: COLORS.jvm + '20',
                        border: `2px solid ${COLORS.jvm}`,
                        borderRadius: '8px',
                        padding: '12px',
                    }}>
                        <div style={{
                            fontSize: '11px',
                            color: COLORS.jvmLight,
                            marginBottom: '8px',
                        }}>
                            ☕ JVM 메모리
                        </div>

                        {/* Heap 바 */}
                        <div style={{
                            backgroundColor: COLORS.bg,
                            borderRadius: '6px',
                            height: '40px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* 초기 할당 */}
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                height: '100%',
                                width: `${(xms / xmx) * 100}%`,
                                backgroundColor: COLORS.accent + '60',
                                borderRight: `2px dashed ${COLORS.accent}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                color: COLORS.text,
                            }}>
                                초기 {xms}MB
                            </div>

                            {/* 최대 라벨 */}
                            <div style={{
                                position: 'absolute',
                                right: '8px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: '11px',
                                color: COLORS.textMuted,
                            }}>
                                최대 {xmx}MB
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '8px',
                            fontSize: '10px',
                            color: COLORS.textMuted,
                        }}>
                            <span>시작 시 확보 (-Xms)</span>
                            <span>필요시 확장 → 최대 (-Xmx)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 설명 */}
            <div style={{
                marginTop: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
            }}>
                <div style={{
                    backgroundColor: COLORS.accent + '15',
                    borderRadius: '8px',
                    padding: '12px',
                    border: `1px solid ${COLORS.accent}40`,
                }}>
                    <div style={{ fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>
                        -Xms (Initial)
                    </div>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted }}>
                        시작할 때 미리 확보하는 Heap 크기.
                        자주 확장하면 성능 저하 → 예상 사용량으로 설정
                    </div>
                </div>
                <div style={{
                    backgroundColor: COLORS.jvm + '15',
                    borderRadius: '8px',
                    padding: '12px',
                    border: `1px solid ${COLORS.jvm}40`,
                }}>
                    <div style={{ fontWeight: '600', fontSize: '12px', marginBottom: '4px' }}>
                        -Xmx (Maximum)
                    </div>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted }}>
                        최대로 사용할 수 있는 Heap 크기.
                        초과 시 OutOfMemoryError 발생!
                    </div>
                </div>
            </div>
        </div>
    );
}

// 플로우 박스 컴포넌트
function FlowBox({ active, color, icon, title, desc }) {
    return (
        <div style={{
            backgroundColor: active ? color + '20' : COLORS.cardBg,
            border: `2px solid ${active ? color : COLORS.border}`,
            borderRadius: '8px',
            padding: '12px 16px',
            textAlign: 'center',
            opacity: active ? 1 : 0.4,
            transition: 'all 0.3s ease',
            transform: active ? 'scale(1.05)' : 'scale(1)',
        }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{icon}</div>
            <div style={{ fontSize: '12px', fontWeight: '600' }}>{title}</div>
            <div style={{ fontSize: '10px', color: COLORS.textMuted }}>{desc}</div>
        </div>
    );
}

// 플로우 화살표 컴포넌트
function FlowArrow({ active, label }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: active ? 1 : 0.3,
            transition: 'opacity 0.3s ease',
        }}>
            <div style={{
                fontSize: '10px',
                color: COLORS.textMuted,
                marginBottom: '2px',
            }}>
                {label}
            </div>
            <div style={{ color: active ? COLORS.accent : COLORS.border }}>→</div>
        </div>
    );
}

// 화살표 컴포넌트
function Arrow({ label }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '4px 0',
        }}>
            <div style={{
                fontSize: '10px',
                color: COLORS.textMuted,
                backgroundColor: COLORS.bg,
                padding: '2px 8px',
                borderRadius: '4px',
            }}>
                {label}
            </div>
            <div style={{ color: COLORS.border }}>↓</div>
        </div>
    );
}