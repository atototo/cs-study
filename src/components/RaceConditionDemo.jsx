import React, { useState, useRef } from 'react';

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
    danger: '#ef4444',
    dangerLight: '#f87171',
    success: '#10b981',
    warning: '#f59e0b',
};

export default function RaceConditionDemo() {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [useLock, setUseLock] = useState(false);
    const [logs, setLogs] = useState([]);
    const [result, setResult] = useState(null);
    const lockRef = useRef(false);

    const addLog = (thread, action, value, color) => {
        setLogs(prev => [...prev.slice(-7), { thread, action, value, color, id: Date.now() + Math.random() }]);
    };

    const runSimulation = async () => {
        setIsRunning(true);
        setCount(0);
        setLogs([]);
        setResult(null);

        let sharedCount = 0;
        const iterations = 5;

        const increment = async (threadName, color) => {
            for (let i = 0; i < iterations; i++) {
                if (useLock) {
                    // Lock 사용 시: 순차 실행
                    while (lockRef.current) {
                        await new Promise(r => setTimeout(r, 50));
                    }
                    lockRef.current = true;
                    addLog(threadName, '🔒 Lock 획득', '', color);
                    await new Promise(r => setTimeout(r, 100));
                }

                // Read
                const temp = sharedCount;
                addLog(threadName, 'READ', temp, color);
                await new Promise(r => setTimeout(r, 150));

                // Modify
                const newValue = temp + 1;
                addLog(threadName, 'ADD +1', `${temp} → ${newValue}`, color);
                await new Promise(r => setTimeout(r, 150));

                // Write
                sharedCount = newValue;
                setCount(sharedCount);
                addLog(threadName, 'WRITE', newValue, color);
                await new Promise(r => setTimeout(r, 100));

                if (useLock) {
                    lockRef.current = false;
                    addLog(threadName, '🔓 Lock 해제', '', color);
                    await new Promise(r => setTimeout(r, 50));
                }
            }
        };

        // 두 스레드 동시 실행
        await Promise.all([
            increment('Thread-1', COLORS.thread1),
            increment('Thread-2', COLORS.thread2),
        ]);

        const expected = iterations * 2;
        setResult({
            expected,
            actual: sharedCount,
            success: sharedCount === expected,
        });
        setIsRunning(false);
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
                    background: `linear-gradient(135deg, ${COLORS.thread1Light}, ${COLORS.thread2Light})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    🏃 Race Condition 시뮬레이션
                </h3>
                <p style={{ color: COLORS.textMuted, margin: 0, fontSize: '14px' }}>
                    두 스레드가 동시에 count++ 실행 시 발생하는 문제
                </p>
            </div>

            {/* 컨트롤 영역 */}
            <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap',
            }}>
                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    backgroundColor: useLock ? COLORS.success + '20' : COLORS.cardBg,
                    border: `2px solid ${useLock ? COLORS.success : COLORS.border}`,
                    borderRadius: '8px',
                }}>
                    <input
                        type="checkbox"
                        checked={useLock}
                        onChange={(e) => setUseLock(e.target.checked)}
                        disabled={isRunning}
                        style={{ width: '18px', height: '18px' }}
                    />
                    <span style={{ color: useLock ? COLORS.success : COLORS.textMuted }}>
                        {useLock ? '🔒 Lock 사용' : '🔓 Lock 없음'}
                    </span>
                </label>

                <button
                    onClick={runSimulation}
                    disabled={isRunning}
                    style={{
                        backgroundColor: isRunning ? COLORS.border : COLORS.thread1,
                        color: 'white',
                        border: 'none',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: isRunning ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isRunning ? '⏳ 실행 중...' : '▶️ 시뮬레이션 시작'}
                </button>
            </div>

            {/* 메인 영역 */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {/* 공유 변수 */}
                <div style={{
                    flex: '1',
                    minWidth: '200px',
                    backgroundColor: COLORS.cardBg,
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                }}>
                    <div style={{ color: COLORS.textMuted, fontSize: '12px', marginBottom: '8px' }}>
                        공유 변수
                    </div>
                    <div style={{
                        fontSize: '48px',
                        fontWeight: '700',
                        color: result ? (result.success ? COLORS.success : COLORS.danger) : COLORS.text,
                    }}>
                        {count}
                    </div>
                    <div style={{
                        marginTop: '12px',
                        padding: '8px',
                        backgroundColor: COLORS.bg,
                        borderRadius: '8px',
                        fontSize: '12px',
                    }}>
                        <code style={{ color: COLORS.warning }}>int count = {count};</code>
                    </div>
                </div>

                {/* 실행 로그 */}
                <div style={{
                    flex: '2',
                    minWidth: '300px',
                    backgroundColor: COLORS.cardBg,
                    borderRadius: '12px',
                    padding: '16px',
                }}>
                    <div style={{ color: COLORS.textMuted, fontSize: '12px', marginBottom: '12px' }}>
                        실행 로그 (최근 8개)
                    </div>
                    <div style={{
                        height: '200px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                    }}>
                        {logs.length === 0 ? (
                            <div style={{ color: COLORS.textMuted, textAlign: 'center', marginTop: '60px' }}>
                                시뮬레이션을 시작하세요
                            </div>
                        ) : (
                            logs.map((log) => (
                                <div
                                    key={log.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        padding: '6px 10px',
                                        backgroundColor: log.color + '15',
                                        borderLeft: `3px solid ${log.color}`,
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                    }}
                                >
                                    <span style={{ color: log.color, fontWeight: '600', minWidth: '70px' }}>
                                        {log.thread}
                                    </span>
                                    <span style={{ color: COLORS.text }}>{log.action}</span>
                                    {log.value && (
                                        <span style={{ color: COLORS.textMuted, marginLeft: 'auto' }}>
                                            {log.value}
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* 결과 */}
            {result && (
                <div style={{
                    marginTop: '20px',
                    backgroundColor: result.success ? COLORS.success + '15' : COLORS.danger + '15',
                    border: `2px solid ${result.success ? COLORS.success : COLORS.danger}`,
                    borderRadius: '12px',
                    padding: '16px',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '16px',
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: COLORS.textMuted, fontSize: '12px' }}>기대값</div>
                            <div style={{ fontSize: '24px', fontWeight: '700' }}>{result.expected}</div>
                            <div style={{ fontSize: '11px', color: COLORS.textMuted }}>5회 × 2스레드</div>
                        </div>
                        <div style={{ fontSize: '24px' }}>{result.success ? '=' : '≠'}</div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ color: COLORS.textMuted, fontSize: '12px' }}>실제값</div>
                            <div style={{
                                fontSize: '24px',
                                fontWeight: '700',
                                color: result.success ? COLORS.success : COLORS.danger,
                            }}>
                                {result.actual}
                            </div>
                        </div>
                        <div style={{
                            padding: '8px 16px',
                            backgroundColor: result.success ? COLORS.success : COLORS.danger,
                            color: 'white',
                            borderRadius: '8px',
                            fontWeight: '600',
                        }}>
                            {result.success ? '✅ 정상!' : '❌ Race Condition 발생!'}
                        </div>
                    </div>
                </div>
            )}

            {/* 설명 */}
            <div style={{
                marginTop: '20px',
                backgroundColor: COLORS.warning + '15',
                borderRadius: '12px',
                padding: '16px',
                border: `1px solid ${COLORS.warning}40`,
            }}>
                <h4 style={{ margin: '0 0 8px 0', color: COLORS.warning, fontSize: '14px' }}>
                    💡 왜 이런 일이 발생할까?
                </h4>
                <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
                    <code style={{ color: COLORS.thread1Light }}>count++</code>는 사실 3단계 연산입니다:
                    <div style={{
                        backgroundColor: COLORS.bg,
                        padding: '12px',
                        borderRadius: '8px',
                        marginTop: '8px',
                        fontFamily: 'monospace',
                    }}>
                        1. READ: temp = count (메모리에서 읽기)<br />
                        2. ADD: temp = temp + 1 (연산)<br />
                        3. WRITE: count = temp (메모리에 쓰기)
                    </div>
                    <p style={{ margin: '8px 0 0 0' }}>
                        두 스레드가 동시에 READ하면 같은 값을 읽고, 각자 +1해서 WRITE → <strong style={{ color: COLORS.danger }}>하나가 덮어씌워짐!</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}