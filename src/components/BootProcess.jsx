import React, { useState } from 'react';

const COLORS = {
    bg: '#0f172a',
    cardBg: '#1e293b',
    border: '#334155',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    hardware: '#ef4444',
    hardwareLight: '#f87171',
    firmware: '#f59e0b',
    firmwareLight: '#fbbf24',
    bootloader: '#8b5cf6',
    bootloaderLight: '#a78bfa',
    os: '#3b82f6',
    osLight: '#60a5fa',
    success: '#10b981',
    successLight: '#34d399',
};

export default function BootProcess() {
    const [activeStep, setActiveStep] = useState(null);
    const [showDetail, setShowDetail] = useState(false);
    const [activeTab, setActiveTab] = useState('definition');

    const bootSteps = [
        {
            id: 'power',
            title: '전원 ON',
            color: COLORS.hardware,
            lightColor: COLORS.hardwareLight,
            icon: '⚡',
            badge: '하드웨어',
            description: 'CPU가 깨어나서 Fetch-Decode-Execute 시작',
            detail: 'CPU는 전원이 들어오면 미리 정해진 주소(Reset Vector)에서 첫 명령어를 가져옵니다. 이 주소는 BIOS/UEFI가 있는 곳을 가리킵니다.',
            analogy: '🛏️ 알람이 울려서 눈을 뜸',
        },
        {
            id: 'bios',
            title: 'BIOS/UEFI 실행',
            color: COLORS.firmware,
            lightColor: COLORS.firmwareLight,
            icon: '🔧',
            badge: '펌웨어',
            description: 'POST(Power-On Self-Test)로 하드웨어 점검 후 부트로더 찾기',
            detail: 'RAM, 키보드, 디스크 등을 점검합니다. 문제 있으면 비프음이 울립니다. 점검 후 부팅 디스크에서 부트로더를 찾아 실행합니다.',
            analogy: '🪥 세수하고 몸 상태 체크',
        },
        {
            id: 'bootloader',
            title: '부트로더 실행',
            color: COLORS.bootloader,
            lightColor: COLORS.bootloaderLight,
            icon: '🚀',
            badge: '부트로더',
            description: '디스크에서 OS 커널을 찾아 RAM에 복사',
            detail: '부트로더(GRUB, Windows Boot Manager 등)가 디스크의 OS 커널을 RAM에 로드합니다. 멀티부팅이면 OS 선택 화면이 뜹니다.',
            analogy: '🚗 차 시동 걸고 목적지(OS) 향해 출발',
        },
        {
            id: 'kernel',
            title: 'OS 커널 시작',
            color: COLORS.os,
            lightColor: COLORS.osLight,
            icon: '🎛️',
            badge: 'OS',
            description: 'OS가 드라이버 로드, 서비스 시작',
            detail: '커널이 메모리 관리자, 프로세스 스케줄러, 파일 시스템 등을 초기화합니다.',
            analogy: '🏢 사무실 도착해서 업무 준비',
        },
        {
            id: 'ready',
            title: '사용 준비 완료',
            color: COLORS.success,
            lightColor: COLORS.successLight,
            icon: '✅',
            badge: '완료',
            description: '로그인 화면 표시, 프로그램 실행 가능',
            detail: 'GUI가 시작되고 로그인 화면이 뜹니다. 이제 프로그램을 실행할 수 있습니다.',
            analogy: '💻 업무 시작 준비 완료!',
        },
    ];

    const tabs = [
        { id: 'definition', label: '부트로더란?', icon: '📖' },
        { id: 'location', label: '저장 위치', icon: '💾' },
        { id: 'bios-uefi', label: 'BIOS vs UEFI', icon: '⚙️' },
        { id: 'types', label: '종류', icon: '🛠️' },
    ];

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
                    background: `linear-gradient(135deg, ${COLORS.firmwareLight}, ${COLORS.bootloaderLight}, ${COLORS.osLight})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    🔌 부팅 과정과 부트로더
                </h2>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    전원 ON부터 OS 시작까지, 부트로더의 역할 깊이 이해하기
                </p>
            </div>

            {/* ========== 부트로더 상세 설명 탭 ========== */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
            }}>
                {/* 탭 헤더 */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '16px',
                    flexWrap: 'wrap',
                }}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                backgroundColor: activeTab === tab.id ? COLORS.bootloader + '30' : COLORS.bg,
                                border: `1px solid ${activeTab === tab.id ? COLORS.bootloader : COLORS.border}`,
                                borderRadius: '8px',
                                padding: '8px 16px',
                                color: activeTab === tab.id ? COLORS.bootloaderLight : COLORS.textMuted,
                                fontSize: '13px',
                                fontWeight: activeTab === tab.id ? '600' : '400',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                            }}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* 탭 콘텐츠 */}
                <div style={{
                    backgroundColor: COLORS.bg,
                    borderRadius: '8px',
                    padding: '20px',
                }}>
                    {activeTab === 'definition' && <DefinitionTab />}
                    {activeTab === 'location' && <LocationTab />}
                    {activeTab === 'bios-uefi' && <BiosUefiTab />}
                    {activeTab === 'types' && <TypesTab />}
                </div>
            </div>

            {/* ========== 부팅 순서 타임라인 ========== */}
            <div style={{
                backgroundColor: COLORS.cardBg,
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                }}>
                    <h4 style={{
                        margin: 0,
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: COLORS.text,
                    }}>
                        🔄 부팅 순서 (클릭해서 자세히)
                    </h4>
                    <button
                        onClick={() => setShowDetail(!showDetail)}
                        style={{
                            backgroundColor: COLORS.bg,
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: '6px',
                            padding: '6px 12px',
                            color: COLORS.textMuted,
                            fontSize: '12px',
                            cursor: 'pointer',
                        }}
                    >
                        {showDetail ? '기술 설명 보기' : '비유로 보기 🎭'}
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {bootSteps.map((step, idx) => (
                        <React.Fragment key={step.id}>
                            <BootStep
                                step={step}
                                isActive={activeStep === step.id}
                                showDetail={showDetail}
                                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                            />
                            {idx < bootSteps.length - 1 && <FlowArrow />}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* ========== 디스크 → RAM 시각화 ========== */}
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
                    📦 부트로더의 핵심 역할: OS를 메모리로 복사
                </h4>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                }}>
                    {/* 디스크 */}
                    <div style={{
                        backgroundColor: COLORS.bg,
                        border: `2px solid ${COLORS.border}`,
                        borderRadius: '12px',
                        padding: '20px',
                        textAlign: 'center',
                        minWidth: '140px',
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>💾</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.text }}>디스크 (SSD/HDD)</div>
                        <div style={{
                            marginTop: '12px',
                            backgroundColor: COLORS.os + '30',
                            border: `1px solid ${COLORS.os}`,
                            borderRadius: '6px',
                            padding: '8px',
                            fontSize: '12px',
                            color: COLORS.osLight,
                        }}>
                            [OS 커널]
                        </div>
                        <div style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '4px' }}>
                            저장만 됨 (실행 불가)
                        </div>
                    </div>

                    {/* 화살표 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                    }}>
                        <div style={{
                            backgroundColor: COLORS.bootloader + '30',
                            border: `1px solid ${COLORS.bootloader}`,
                            borderRadius: '20px',
                            padding: '8px 16px',
                            fontSize: '12px',
                            color: COLORS.bootloaderLight,
                            fontWeight: '600',
                        }}>
                            🚀 부트로더가
                        </div>
                        <div style={{ fontSize: '24px', color: COLORS.bootloaderLight }}>→</div>
                        <div style={{ fontSize: '11px', color: COLORS.textMuted }}>복사!</div>
                    </div>

                    {/* RAM */}
                    <div style={{
                        backgroundColor: COLORS.bg,
                        border: `2px solid ${COLORS.success}`,
                        borderRadius: '12px',
                        padding: '20px',
                        textAlign: 'center',
                        minWidth: '140px',
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>🧠</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.text }}>RAM (메모리)</div>
                        <div style={{
                            marginTop: '12px',
                            backgroundColor: COLORS.success + '30',
                            border: `1px solid ${COLORS.success}`,
                            borderRadius: '6px',
                            padding: '8px',
                            fontSize: '12px',
                            color: COLORS.successLight,
                        }}>
                            [OS 커널] ⚡
                        </div>
                        <div style={{ fontSize: '11px', color: COLORS.successLight, marginTop: '4px' }}>
                            CPU가 실행 가능!
                        </div>
                    </div>
                </div>

                {/* 핵심 메시지 */}
                <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    backgroundColor: COLORS.bg,
                    borderRadius: '8px',
                    borderLeft: `3px solid ${COLORS.bootloaderLight}`,
                }}>
                    <div style={{ fontSize: '13px', color: COLORS.text }}>
                        <strong style={{ color: COLORS.bootloaderLight }}>왜 필요한가?</strong>{' '}
                        CPU는 <strong>RAM에 있는 명령어만</strong> 실행할 수 있습니다.
                        디스크에 저장된 OS를 직접 실행할 수 없기 때문에,
                        부트로더가 <strong>"중간 다리"</strong> 역할로 OS를 RAM에 올려줍니다.
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ========================================
   탭 1: 부트로더 정의
======================================== */
function DefinitionTab() {
    return (
        <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: COLORS.bootloaderLight }}>
                📖 부트로더(Bootloader)란?
            </h4>

            {/* 한 줄 정의 */}
            <div style={{
                backgroundColor: COLORS.bootloader + '15',
                border: `1px solid ${COLORS.bootloader}50`,
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
            }}>
                <div style={{ fontSize: '14px', color: COLORS.text, lineHeight: '1.6' }}>
                    <strong style={{ color: COLORS.bootloaderLight }}>한 줄 정의:</strong>{' '}
                    OS를 디스크에서 읽어 <strong>메모리(RAM)에 올려주는 작은 프로그램</strong>
                </div>
            </div>

            {/* 왜 필요한가? */}
            <div style={{ fontSize: '14px', color: COLORS.text, lineHeight: '1.8', marginBottom: '16px' }}>
                <div style={{ fontWeight: '600', marginBottom: '8px', color: COLORS.text }}>
                    🤔 왜 필요한가?
                </div>
                <div style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: '8px',
                    padding: '12px 16px',
                }}>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: COLORS.text }}>
                        <li>OS는 <strong>디스크(SSD/HDD)</strong>에 파일로 저장되어 있음</li>
                        <li>그런데 CPU는 <strong>RAM에 있는 명령어만</strong> 실행 가능!</li>
                        <li>→ 누군가 OS를 디스크 → RAM으로 옮겨줘야 함</li>
                        <li>→ 이 역할을 하는 게 <strong style={{ color: COLORS.bootloaderLight }}>부트로더</strong></li>
                    </ul>
                </div>
            </div>

            {/* 부트로더가 하는 일 */}
            <div style={{ fontSize: '14px', color: COLORS.text }}>
                <div style={{ fontWeight: '600', marginBottom: '8px' }}>
                    ✅ 부트로더가 하는 일
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '8px',
                }}>
                    {[
                        { icon: '🔍', text: 'OS 커널 파일 찾기' },
                        { icon: '📤', text: '디스크 → RAM 복사' },
                        { icon: '⚙️', text: '커널 파라미터 전달' },
                        { icon: '🔀', text: '멀티부팅 시 OS 선택' },
                    ].map((item, i) => (
                        <div key={i} style={{
                            backgroundColor: COLORS.cardBg,
                            borderRadius: '6px',
                            padding: '10px 12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '13px',
                        }}>
                            <span>{item.icon}</span>
                            {item.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ========================================
   탭 2: 저장 위치
======================================== */
function LocationTab() {
    return (
        <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: COLORS.bootloaderLight }}>
                💾 부트로더는 어디에 저장될까?
            </h4>

            <div style={{ fontSize: '14px', color: COLORS.text, lineHeight: '1.6', marginBottom: '16px' }}>
                부트로더는 디스크의 <strong>특별한 영역</strong>에 저장됩니다.
                파티션 방식에 따라 위치가 다릅니다.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* MBR 방식 */}
                <div style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: '8px',
                    padding: '16px',
                    borderLeft: `3px solid ${COLORS.firmware}`,
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                    }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: COLORS.firmwareLight }}>
                            MBR (Master Boot Record) 방식
                        </span>
                        <span style={{
                            fontSize: '10px',
                            backgroundColor: COLORS.firmware + '30',
                            color: COLORS.firmwareLight,
                            padding: '2px 8px',
                            borderRadius: '10px',
                        }}>
                            레거시 BIOS
                        </span>
                    </div>
                    <div style={{ fontSize: '13px', color: COLORS.text, marginBottom: '8px' }}>
                        디스크의 <strong>맨 첫 번째 섹터 (512 bytes)</strong>에 저장
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        backgroundColor: COLORS.bg,
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        flexWrap: 'wrap',
                    }}>
                        <span style={{ color: COLORS.firmwareLight }}>[부트코드 446B]</span>
                        <span style={{ color: COLORS.textMuted }}>|</span>
                        <span style={{ color: COLORS.textMuted }}>[파티션테이블 64B]</span>
                        <span style={{ color: COLORS.textMuted }}>|</span>
                        <span style={{ color: COLORS.textMuted }}>[시그니처 2B]</span>
                    </div>
                    <div style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '8px' }}>
                        ⚠️ 446바이트는 너무 작아서 → <strong>2단계 부팅</strong> 필요 (Stage 1 → Stage 2)
                    </div>
                </div>

                {/* GPT 방식 */}
                <div style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: '8px',
                    padding: '16px',
                    borderLeft: `3px solid ${COLORS.os}`,
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px',
                    }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: COLORS.osLight }}>
                            GPT + EFI System Partition 방식
                        </span>
                        <span style={{
                            fontSize: '10px',
                            backgroundColor: COLORS.os + '30',
                            color: COLORS.osLight,
                            padding: '2px 8px',
                            borderRadius: '10px',
                        }}>
                            최신 UEFI
                        </span>
                    </div>
                    <div style={{ fontSize: '13px', color: COLORS.text, marginBottom: '8px' }}>
                        <strong>EFI System Partition (ESP)</strong>라는 별도 FAT32 파티션에 저장
                    </div>
                    <div style={{
                        backgroundColor: COLORS.bg,
                        borderRadius: '6px',
                        padding: '8px 12px',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        color: COLORS.osLight,
                    }}>
                        /boot/efi/EFI/ubuntu/grubx64.efi<br />
                        /boot/efi/EFI/Microsoft/Boot/bootmgfw.efi
                    </div>
                    <div style={{ fontSize: '11px', color: COLORS.successLight, marginTop: '8px' }}>
                        ✅ 용량 제한 없음, 여러 OS 부트로더 공존 가능
                    </div>
                </div>
            </div>

            {/* 2단계 부팅 설명 */}
            <div style={{
                marginTop: '16px',
                backgroundColor: COLORS.bootloader + '15',
                borderRadius: '8px',
                padding: '16px',
            }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: COLORS.bootloaderLight, marginBottom: '8px' }}>
                    🔢 MBR의 2단계 부팅이란?
                </div>
                <div style={{ fontSize: '13px', color: COLORS.text, lineHeight: '1.6' }}>
                    MBR 부트코드는 446바이트밖에 없어서 OS 로드에 부족합니다.<br />
                    <strong>Stage 1</strong> (MBR 446B): "Stage 2가 어디 있는지"만 알려줌<br />
                    <strong>Stage 2</strong> (디스크 다른 영역): 실제로 OS 커널을 로드
                </div>
            </div>
        </div>
    );
}

/* ========================================
   탭 3: BIOS vs UEFI
======================================== */
function BiosUefiTab() {
    return (
        <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: COLORS.bootloaderLight }}>
                ⚙️ BIOS vs UEFI: 펌웨어의 진화
            </h4>

            <div style={{ fontSize: '14px', color: COLORS.text, lineHeight: '1.6', marginBottom: '16px' }}>
                부트로더 <strong>전에</strong> 먼저 실행되는 게 <strong>펌웨어</strong>입니다.
                메인보드에 내장된 소프트웨어로, BIOS(구형)와 UEFI(신형) 두 종류가 있습니다.
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '12px',
            }}>
                {/* BIOS */}
                <div style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: '8px',
                    padding: '16px',
                    border: `1px solid ${COLORS.firmware}50`,
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '12px',
                    }}>
                        <span style={{ fontSize: '24px' }}>🖥️</span>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.firmwareLight }}>
                                BIOS (레거시)
                            </div>
                            <div style={{ fontSize: '10px', color: COLORS.textMuted }}>
                                Basic Input/Output System
                            </div>
                        </div>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: COLORS.text, lineHeight: '1.8' }}>
                        <li>1981년부터 사용</li>
                        <li>16비트 리얼 모드</li>
                        <li>MBR 파티션만 지원</li>
                        <li><strong style={{ color: COLORS.hardwareLight }}>2TB 디스크 제한</strong></li>
                        <li>텍스트 기반 UI</li>
                        <li>느린 부팅 속도</li>
                    </ul>
                </div>

                {/* UEFI */}
                <div style={{
                    backgroundColor: COLORS.cardBg,
                    borderRadius: '8px',
                    padding: '16px',
                    border: `1px solid ${COLORS.os}50`,
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '12px',
                    }}>
                        <span style={{ fontSize: '24px' }}>💻</span>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.osLight }}>
                                UEFI (최신)
                            </div>
                            <div style={{ fontSize: '10px', color: COLORS.textMuted }}>
                                Unified Extensible Firmware Interface
                            </div>
                        </div>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: COLORS.text, lineHeight: '1.8' }}>
                        <li>2005년부터 (현재 표준)</li>
                        <li>32/64비트 모드</li>
                        <li>GPT 파티션 지원</li>
                        <li><strong style={{ color: COLORS.successLight }}>9ZB 디스크 지원</strong></li>
                        <li>그래픽 UI, 마우스 지원</li>
                        <li><strong style={{ color: COLORS.successLight }}>빠른 부팅, Secure Boot</strong></li>
                    </ul>
                </div>
            </div>

            {/* Secure Boot 설명 */}
            <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                backgroundColor: COLORS.success + '15',
                borderRadius: '8px',
                borderLeft: `3px solid ${COLORS.success}`,
            }}>
                <div style={{ fontSize: '13px', color: COLORS.text }}>
                    <strong style={{ color: COLORS.successLight }}>Secure Boot란?</strong>{' '}
                    UEFI의 보안 기능으로, <strong>서명된 부트로더만</strong> 실행을 허용합니다.
                    악성코드가 부팅 과정에 끼어드는 것(부트킷)을 방지합니다.
                </div>
            </div>
        </div>
    );
}

/* ========================================
   탭 4: 부트로더 종류
======================================== */
function TypesTab() {
    const bootloaders = [
        {
            name: 'GRUB',
            fullName: 'GRand Unified Bootloader',
            os: 'Linux',
            color: COLORS.bootloader,
            features: ['가장 널리 사용되는 Linux 부트로더', '멀티부팅 지원 (Windows + Linux)', '커널 파라미터 편집 가능', '복구 모드 제공'],
            icon: '🐧',
        },
        {
            name: 'Windows Boot Manager',
            fullName: 'bootmgr / winload.efi',
            os: 'Windows',
            color: COLORS.os,
            features: ['Windows 기본 부트로더', 'BCD(Boot Config Data) 사용', 'BitLocker 암호화 지원', '자동 복구 모드'],
            icon: '🪟',
        },
        {
            name: 'systemd-boot',
            fullName: 'gummiboot에서 발전',
            os: 'Linux (UEFI 전용)',
            color: COLORS.success,
            features: ['UEFI 전용, 가볍고 빠름', 'GRUB보다 설정 단순', 'systemd와 통합', 'Arch Linux 등에서 인기'],
            icon: '⚡',
        },
        {
            name: 'U-Boot',
            fullName: 'Universal Boot Loader',
            os: '임베디드/IoT',
            color: COLORS.firmware,
            features: ['라즈베리파이, 공유기, IoT', 'ARM, MIPS 등 지원', '네트워크 부팅(TFTP)', '오픈소스'],
            icon: '🔧',
        },
    ];

    return (
        <div>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', color: COLORS.bootloaderLight }}>
                🛠️ 주요 부트로더 종류
            </h4>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px',
            }}>
                {bootloaders.map(bl => (
                    <div
                        key={bl.name}
                        style={{
                            backgroundColor: COLORS.cardBg,
                            borderRadius: '8px',
                            padding: '16px',
                            borderLeft: `3px solid ${bl.color}`,
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px',
                        }}>
                            <span style={{ fontSize: '20px' }}>{bl.icon}</span>
                            <div>
                                <div style={{ fontSize: '14px', fontWeight: '600', color: COLORS.text }}>
                                    {bl.name}
                                </div>
                                <div style={{ fontSize: '10px', color: COLORS.textMuted }}>
                                    {bl.os}
                                </div>
                            </div>
                        </div>
                        <div style={{ fontSize: '10px', color: COLORS.textMuted, marginBottom: '8px', fontFamily: 'monospace' }}>
                            {bl.fullName}
                        </div>
                        <ul style={{
                            margin: 0,
                            paddingLeft: '14px',
                            fontSize: '11px',
                            color: COLORS.text,
                            lineHeight: '1.6',
                        }}>
                            {bl.features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ========================================
   부팅 단계 컴포넌트
======================================== */
function BootStep({ step, isActive, showDetail, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                backgroundColor: isActive ? step.color + '20' : COLORS.bg,
                padding: '12px 16px',
                borderRadius: '8px',
                borderLeft: `3px solid ${step.color}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
            }}
        >
            <div style={{
                backgroundColor: step.color + '30',
                color: step.lightColor,
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                flexShrink: 0,
            }}>
                {step.icon}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px',
                }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: step.lightColor }}>
                        {step.title}
                    </span>
                    <span style={{
                        backgroundColor: step.color + '30',
                        color: step.lightColor,
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontSize: '10px',
                        fontWeight: '600',
                    }}>
                        {step.badge}
                    </span>
                </div>
                <div style={{ fontSize: '12px', color: COLORS.textMuted }}>
                    {showDetail ? step.analogy : step.description}
                </div>
                {isActive && (
                    <div style={{
                        marginTop: '8px',
                        padding: '8px 12px',
                        backgroundColor: COLORS.cardBg,
                        borderRadius: '6px',
                        fontSize: '12px',
                        color: COLORS.text,
                        lineHeight: '1.5',
                    }}>
                        {step.detail}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ========================================
   화살표 컴포넌트
======================================== */
function FlowArrow() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            color: COLORS.textMuted,
            fontSize: '14px',
            marginLeft: '15px',
        }}>
            ↓
        </div>
    );
}