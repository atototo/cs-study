import React, { useState } from 'react';

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
    os: '#3b82f6',
    osLight: '#60a5fa',
    accent: '#f59e0b',
    success: '#10b981',
};

export default function KernelUserMode() {
    const [selectedMode, setSelectedMode] = useState(null);

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
                    background: `linear-gradient(135deg, ${COLORS.userModeLight}, ${COLORS.kernelModeLight})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    🔐 Dual Mode Operation
                </h3>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    CPU는 보안과 안정성을 위해 두 가지 모드로 동작합니다
                </p>
            </div>

            {/* 메인 다이어그램 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                {/* 유저 모드 영역 */}
                <div
                    onClick={() => setSelectedMode(selectedMode === 'user' ? null : 'user')}
                    style={{
                        backgroundColor: selectedMode === 'user' ? COLORS.userMode + '25' : COLORS.cardBg,
                        border: `2px solid ${selectedMode === 'user' ? COLORS.userMode : COLORS.border}`,
                        borderRadius: '12px 12px 4px 4px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: selectedMode === 'user' ? 'scale(1.01)' : 'scale(1)',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                <span style={{
                                    backgroundColor: COLORS.userMode,
                                    color: 'white',
                                    padding: '3px 10px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                }}>
                                    Mode Bit = 1
                                </span>
                                <h4 style={{ margin: 0, color: COLORS.userModeLight, fontSize: '18px' }}>
                                    👤 유저 모드 (User Mode)
                                </h4>
                            </div>
                            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '13px' }}>
                                일반 응용 프로그램이 실행되는 제한된 환경
                            </p>
                        </div>
                    </div>

                    {/* 유저 모드 프로그램들 */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        {['Chrome', 'IntelliJ', 'Spring Boot', 'Node.js', 'JVM'].map((app, idx) => (
                            <span key={idx} style={{
                                backgroundColor: COLORS.userMode + '20',
                                color: COLORS.userModeLight,
                                padding: '6px 12px',
                                borderRadius: '16px',
                                fontSize: '12px',
                            }}>
                                {app}
                            </span>
                        ))}
                    </div>

                    {/* 제한 사항 */}
                    <div style={{
                        backgroundColor: COLORS.bg,
                        borderRadius: '8px',
                        padding: '12px',
                    }}>
                        <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '8px' }}>
                            ❌ 할 수 없는 것들
                        </div>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px' }}>
                            <span>• 하드웨어 직접 접근</span>
                            <span>• 다른 프로세스 메모리 접근</span>
                            <span>• 특권 명령어 실행</span>
                        </div>
                    </div>
                </div>

                {/* 모드 전환 화살표 */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 0',
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{
                                backgroundColor: COLORS.os + '20',
                                color: COLORS.osLight,
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '11px',
                            }}>
                                시스템 콜 / 인터럽트
                            </span>
                            <div style={{ color: COLORS.os, fontSize: '16px', marginTop: '2px' }}>↓</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: COLORS.success, fontSize: '16px', marginBottom: '2px' }}>↑</div>
                            <span style={{
                                backgroundColor: COLORS.success + '20',
                                color: COLORS.success,
                                padding: '4px 12px',
                                borderRadius: '12px',
                                fontSize: '11px',
                            }}>
                                작업 완료 후 복귀
                            </span>
                        </div>
                    </div>
                </div>

                {/* 커널 모드 영역 */}
                <div
                    onClick={() => setSelectedMode(selectedMode === 'kernel' ? null : 'kernel')}
                    style={{
                        backgroundColor: selectedMode === 'kernel' ? COLORS.kernelMode + '25' : COLORS.cardBg,
                        border: `2px solid ${selectedMode === 'kernel' ? COLORS.kernelMode : COLORS.border}`,
                        borderRadius: '4px 4px 12px 12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: selectedMode === 'kernel' ? 'scale(1.01)' : 'scale(1)',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                <span style={{
                                    backgroundColor: COLORS.kernelMode,
                                    color: 'white',
                                    padding: '3px 10px',
                                    borderRadius: '4px',
                                    fontSize: '11px',
                                    fontWeight: '600',
                                }}>
                                    Mode Bit = 0
                                </span>
                                <h4 style={{ margin: 0, color: COLORS.kernelModeLight, fontSize: '18px' }}>
                                    👑 커널 모드 (Kernel Mode)
                                </h4>
                            </div>
                            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: '13px' }}>
                                OS 커널이 실행되는 특권 환경 (Privileged Mode)
                            </p>
                        </div>
                    </div>

                    {/* 커널 구성요소 */}
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        {['OS 커널', '디바이스 드라이버', '파일 시스템', '메모리 관리자', '스케줄러'].map((comp, idx) => (
                            <span key={idx} style={{
                                backgroundColor: COLORS.kernelMode + '20',
                                color: COLORS.kernelModeLight,
                                padding: '6px 12px',
                                borderRadius: '16px',
                                fontSize: '12px',
                            }}>
                                {comp}
                            </span>
                        ))}
                    </div>

                    {/* 권한 */}
                    <div style={{
                        backgroundColor: COLORS.bg,
                        borderRadius: '8px',
                        padding: '12px',
                    }}>
                        <div style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '8px' }}>
                            ✅ 할 수 있는 것들
                        </div>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px' }}>
                            <span>• 모든 하드웨어 접근</span>
                            <span>• 모든 메모리 접근</span>
                            <span>• 모든 CPU 명령어 실행</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 비유 */}
            <div style={{
                marginTop: '20px',
                backgroundColor: COLORS.accent + '15',
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${COLORS.accent}40`,
            }}>
                <h4 style={{
                    margin: '0 0 8px 0',
                    color: COLORS.accent,
                    fontSize: '14px',
                }}>
                    🏢 비유: 회사 보안 시스템
                </h4>
                <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
                    <p style={{ margin: '0 0 8px 0' }}>
                        <strong style={{ color: COLORS.userModeLight }}>유저 모드</strong> = 일반 직원 출입 구역
                        (사무실, 회의실 자유롭게 접근)
                    </p>
                    <p style={{ margin: 0 }}>
                        <strong style={{ color: COLORS.kernelModeLight }}>커널 모드</strong> = 서버실, 금고 등 보안 구역
                        (관리자만 접근, 일반 직원은 <strong style={{ color: COLORS.osLight }}>요청서(시스템 콜)</strong> 제출)
                    </p>
                </div>
            </div>
        </div>
    );
}