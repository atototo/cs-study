import React, { useState, useEffect } from 'react';

// ========================================
// 공통 스타일
// ========================================
const colors = {
  stack: '#3b82f6',
  heap: '#10b981',
  data: '#f59e0b',
  code: '#8b5cf6',
  danger: '#ef4444',
  warning: '#f59e0b',
  bg: '#0f172a',
  bgLight: '#1e293b',
  border: '#334155',
  text: '#e2e8f0',
  textMuted: '#94a3b8',
};

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 20px',
        border: 'none',
        backgroundColor: active ? colors.stack : 'transparent',
        color: active ? 'white' : colors.textMuted,
        cursor: 'pointer',
        fontWeight: active ? 'bold' : 'normal',
        transition: 'all 0.2s',
        fontSize: '14px',
      }}
    >
      {children}
    </button>
  );
}

function Button({ onClick, children, variant = 'primary', disabled = false }) {
  const styles = {
    primary: { bg: colors.stack, color: 'white' },
    success: { bg: colors.heap, color: 'white' },
    danger: { bg: colors.danger, color: 'white' },
    outline: { bg: 'transparent', color: colors.stack, border: `1px solid ${colors.stack}` },
  };
  const s = styles[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        borderRadius: '6px',
        backgroundColor: disabled ? colors.border : s.bg,
        color: disabled ? colors.textMuted : s.color,
        border: s.border || 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </button>
  );
}

// ========================================
// 1. 메모리 개요 탭
// ========================================
function MemoryOverview() {
  const [selected, setSelected] = useState(null);

  const areas = [
    {
      name: 'Stack', color: colors.stack, icon: '📚',
      desc: '지역변수, 함수 호출 정보',
      detail: '함수가 호출될 때 쌓이고(Push), 끝나면 제거(Pop). LIFO 구조. 크기 고정(1~8MB)'
    },
    {
      name: 'Heap', color: colors.heap, icon: '📦',
      desc: 'new로 생성한 객체',
      detail: '런타임에 동적 할당. GC가 자동 해제(Java). 크기 유동적. 전역 접근 가능'
    },
    {
      name: 'Data', color: colors.data, icon: '📋',
      desc: '전역변수, static 변수',
      detail: '프로그램 시작~끝까지 유지. 모든 함수에서 접근 가능'
    },
    {
      name: 'Code', color: colors.code, icon: '📜',
      desc: '실행할 코드 자체',
      detail: '컴파일된 기계어. 읽기 전용(Read-Only). Text 영역이라고도 함'
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: colors.text, marginBottom: '16px' }}>🧱 메모리 4영역 (클릭해보세요)</h3>

      {/* 메모리 구조 시각화 */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* 왼쪽: 메모리 블록 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          minWidth: '200px'
        }}>
          {areas.map((area) => (
            <div
              key={area.name}
              onClick={() => setSelected(selected === area.name ? null : area.name)}
              style={{
                padding: '16px',
                backgroundColor: selected === area.name ? area.color : colors.bgLight,
                border: `2px solid ${area.color}`,
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: selected === area.name ? 'white' : colors.text,
              }}>
                <span style={{ fontSize: '20px' }}>{area.icon}</span>
                <span style={{ fontWeight: 'bold' }}>{area.name}</span>
              </div>
              <div style={{
                fontSize: '12px',
                color: selected === area.name ? 'rgba(255,255,255,0.8)' : colors.textMuted,
                marginTop: '4px'
              }}>
                {area.desc}
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽: 상세 설명 */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          {selected ? (
            <div style={{
              padding: '20px',
              backgroundColor: colors.bgLight,
              borderRadius: '12px',
              border: `2px solid ${areas.find(a => a.name === selected)?.color}`,
            }}>
              <h4 style={{ color: areas.find(a => a.name === selected)?.color, marginBottom: '12px' }}>
                {areas.find(a => a.name === selected)?.icon} {selected} 영역
              </h4>
              <p style={{ color: colors.text, lineHeight: '1.6' }}>
                {areas.find(a => a.name === selected)?.detail}
              </p>

              {selected === 'Stack' && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(239,68,68,0.3)'
                }}>
                  <span style={{ color: colors.danger }}>⚠️ StackOverflowError</span>
                  <span style={{ color: colors.textMuted, fontSize: '13px', display: 'block', marginTop: '4px' }}>
                    재귀가 너무 깊으면 Stack이 넘침!
                  </span>
                </div>
              )}

              {selected === 'Heap' && (
                <div style={{
                  marginTop: '12px',
                  padding: '12px',
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(239,68,68,0.3)'
                }}>
                  <span style={{ color: colors.danger }}>⚠️ OutOfMemoryError</span>
                  <span style={{ color: colors.textMuted, fontSize: '13px', display: 'block', marginTop: '4px' }}>
                    Heap이 꽉 차면 발생! (GC가 못 지움)
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div style={{
              padding: '40px',
              backgroundColor: colors.bgLight,
              borderRadius: '12px',
              textAlign: 'center',
              color: colors.textMuted,
            }}>
              👈 왼쪽 영역을 클릭해서 상세 정보 확인
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ========================================
// 2. Stack 애니메이션 탭
// ========================================
function StackAnimation() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: '초기 상태',
      code: '// 프로그램 시작 전',
      stack: [],
      desc: 'Stack이 비어있는 상태'
    },
    {
      title: 'main() 호출',
      code: 'public static void main(String[] args) {\n    int x = 10;\n    int y = 20;',
      stack: [{ name: 'main()', vars: ['x = 10', 'y = 20'], color: colors.stack }],
      desc: 'main 함수가 Stack에 Push됨'
    },
    {
      title: 'add() 호출',
      code: '    int result = add(x, y);\n}\n\npublic int add(int a, int b) {\n    int sum = a + b;',
      stack: [
        { name: 'main()', vars: ['x = 10', 'y = 20'], color: colors.stack },
        { name: 'add()', vars: ['a = 10', 'b = 20', 'sum = 30'], color: '#60a5fa' }
      ],
      desc: 'add 함수가 Stack 위에 Push됨'
    },
    {
      title: 'add() 종료 → Pop!',
      code: '    return sum;  // 30 반환\n}',
      stack: [
        { name: 'main()', vars: ['x = 10', 'y = 20', 'result = 30'], color: colors.stack }
      ],
      desc: 'add 함수가 Pop되고, 결과값이 main으로 전달'
    },
    {
      title: 'main() 종료',
      code: '}  // 프로그램 종료',
      stack: [],
      desc: 'main도 Pop되어 Stack이 비워짐'
    }
  ];

  const current = steps[step];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: colors.text, marginBottom: '16px' }}>📚 Stack 동작 애니메이션</h3>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* 왼쪽: 코드 */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          <div style={{
            backgroundColor: '#1e1e1e',
            borderRadius: '8px',
            padding: '16px',
            fontFamily: 'monospace',
            fontSize: '13px',
          }}>
            <div style={{ color: colors.textMuted, marginBottom: '8px' }}>
              Step {step + 1}/{steps.length}: {current.title}
            </div>
            <pre style={{ color: '#9cdcfe', margin: 0, whiteSpace: 'pre-wrap' }}>
              {current.code}
            </pre>
          </div>
          <p style={{ color: colors.textMuted, marginTop: '12px', fontSize: '14px' }}>
            💡 {current.desc}
          </p>
        </div>

        {/* 오른쪽: Stack 시각화 */}
        <div style={{ minWidth: '200px' }}>
          <div style={{
            backgroundColor: colors.bgLight,
            borderRadius: '8px',
            padding: '16px',
            minHeight: '250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
            <div style={{ color: colors.textMuted, fontSize: '12px', marginBottom: '8px', textAlign: 'center' }}>
              ↑ Stack Top
            </div>

            {current.stack.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: colors.textMuted,
                padding: '40px',
                border: `2px dashed ${colors.border}`,
                borderRadius: '8px'
              }}>
                (비어있음)
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: '4px' }}>
                {current.stack.map((frame, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px',
                      backgroundColor: frame.color,
                      borderRadius: '8px',
                      animation: 'slideIn 0.3s ease-out',
                    }}
                  >
                    <div style={{ fontWeight: 'bold', color: 'white' }}>{frame.name}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>
                      {frame.vars.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ color: colors.textMuted, fontSize: '12px', marginTop: '8px', textAlign: 'center' }}>
              ↓ Stack Bottom
            </div>
          </div>
        </div>
      </div>

      {/* 컨트롤 버튼 */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button onClick={() => setStep(0)} variant="outline" disabled={step === 0}>
          ⏮ 처음
        </Button>
        <Button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
          ◀ 이전
        </Button>
        <Button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}>
          다음 ▶
        </Button>
        <Button onClick={() => setStep(steps.length - 1)} variant="outline" disabled={step === steps.length - 1}>
          끝 ⏭
        </Button>
      </div>
    </div>
  );
}

// ========================================
// 3. Stack ↔ Heap 연결 탭 (NEW!)
// ========================================
function StackHeapConnection() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: '변수 선언',
      code: 'User user;  // 참조 변수만 선언',
      stack: [{ name: 'user', value: 'null', type: 'ref' }],
      heap: [],
      arrows: [],
      desc: 'Stack에 참조 변수만 생성 (아직 객체 없음)'
    },
    {
      title: '객체 생성',
      code: 'user = new User("영은");',
      stack: [{ name: 'user', value: '0x1000', type: 'ref' }],
      heap: [{ addr: '0x1000', type: 'User', fields: ['name: "영은"'] }],
      arrows: [{ from: 'user', to: '0x1000' }],
      desc: 'new → Heap에 객체 생성, Stack에는 주소(참조)만 저장'
    },
    {
      title: '두 번째 객체',
      code: 'User user2 = new User("클로드");',
      stack: [
        { name: 'user', value: '0x1000', type: 'ref' },
        { name: 'user2', value: '0x2000', type: 'ref' }
      ],
      heap: [
        { addr: '0x1000', type: 'User', fields: ['name: "영은"'] },
        { addr: '0x2000', type: 'User', fields: ['name: "클로드"'] }
      ],
      arrows: [{ from: 'user', to: '0x1000' }, { from: 'user2', to: '0x2000' }],
      desc: '각 변수가 다른 Heap 객체를 가리킴'
    },
    {
      title: '참조 복사',
      code: 'user2 = user;  // 참조만 복사!',
      stack: [
        { name: 'user', value: '0x1000', type: 'ref' },
        { name: 'user2', value: '0x1000', type: 'ref' }
      ],
      heap: [
        { addr: '0x1000', type: 'User', fields: ['name: "영은"'], highlight: true },
        { addr: '0x2000', type: 'User', fields: ['name: "클로드"'], orphan: true }
      ],
      arrows: [{ from: 'user', to: '0x1000' }, { from: 'user2', to: '0x1000' }],
      desc: '⚠️ 두 변수가 같은 객체를 가리킴! 0x2000 객체는 미아(GC 대상)'
    }
  ];

  const current = steps[step];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: colors.text, marginBottom: '16px' }}>🔗 Stack ↔ Heap 참조 관계</h3>

      {/* 코드 */}
      <div style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        padding: '12px',
        fontFamily: 'monospace',
        fontSize: '13px',
        marginBottom: '16px'
      }}>
        <span style={{ color: colors.textMuted }}>Step {step + 1}: </span>
        <span style={{ color: '#9cdcfe' }}>{current.code}</span>
      </div>

      {/* 시각화 */}
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Stack */}
        <div>
          <div style={{
            color: colors.stack,
            fontWeight: 'bold',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            📚 Stack
          </div>
          <div style={{
            backgroundColor: colors.bgLight,
            border: `2px solid ${colors.stack}`,
            borderRadius: '8px',
            padding: '16px',
            minWidth: '150px',
            minHeight: '150px',
          }}>
            {current.stack.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '8px 12px',
                  backgroundColor: colors.stack,
                  borderRadius: '6px',
                  marginBottom: '8px',
                  color: 'white',
                  fontSize: '13px',
                }}
              >
                <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                <div style={{ opacity: 0.8, fontFamily: 'monospace' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 화살표 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          color: colors.textMuted,
          fontSize: '24px'
        }}>
          {current.arrows.length > 0 ? '→→→' : ''}
        </div>

        {/* Heap */}
        <div>
          <div style={{
            color: colors.heap,
            fontWeight: 'bold',
            marginBottom: '8px',
            textAlign: 'center'
          }}>
            📦 Heap
          </div>
          <div style={{
            backgroundColor: colors.bgLight,
            border: `2px solid ${colors.heap}`,
            borderRadius: '8px',
            padding: '16px',
            minWidth: '180px',
            minHeight: '150px',
          }}>
            {current.heap.length === 0 ? (
              <div style={{ color: colors.textMuted, textAlign: 'center', padding: '20px' }}>
                (비어있음)
              </div>
            ) : (
              current.heap.map((obj, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px',
                    backgroundColor: obj.orphan ? 'rgba(239,68,68,0.2)' :
                      obj.highlight ? 'rgba(16,185,129,0.3)' : colors.heap,
                    border: obj.orphan ? `2px dashed ${colors.danger}` : 'none',
                    borderRadius: '6px',
                    marginBottom: '8px',
                    color: obj.orphan ? colors.danger : 'white',
                    fontSize: '13px',
                  }}
                >
                  <div style={{ fontFamily: 'monospace', opacity: 0.7, fontSize: '11px' }}>
                    {obj.addr}
                  </div>
                  <div style={{ fontWeight: 'bold' }}>{obj.type}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    {obj.fields.join(', ')}
                  </div>
                  {obj.orphan && (
                    <div style={{ fontSize: '11px', marginTop: '4px' }}>
                      ⚠️ GC 대상
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 설명 */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: colors.bgLight,
        borderRadius: '8px',
        color: colors.text
      }}>
        💡 {current.desc}
      </div>

      {/* 컨트롤 */}
      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <Button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
          ◀ 이전
        </Button>
        <Button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1}>
          다음 ▶
        </Button>
      </div>
    </div>
  );
}

// ========================================
// 4. Heap & GC 애니메이션 탭 (NEW!)
// ========================================
function HeapGCAnimation() {
  const [objects, setObjects] = useState([]);
  const [gcRunning, setGcRunning] = useState(false);
  const [log, setLog] = useState(['Heap 시뮬레이터 시작']);

  const addObject = () => {
    const id = Date.now();
    const newObj = {
      id,
      name: `Object_${objects.length + 1}`,
      referenced: true,
      size: Math.floor(Math.random() * 30) + 20,
    };
    setObjects(prev => [...prev, newObj]);
    setLog(prev => [...prev, `✅ ${newObj.name} 생성 (${newObj.size}MB)`]);
  };

  const removeReference = (id) => {
    setObjects(prev => prev.map(obj =>
      obj.id === id ? { ...obj, referenced: false } : obj
    ));
    const obj = objects.find(o => o.id === id);
    setLog(prev => [...prev, `❌ ${obj?.name} 참조 해제 (GC 대상)`]);
  };

  const runGC = () => {
    setGcRunning(true);
    setLog(prev => [...prev, '🗑️ GC 실행 중...']);

    setTimeout(() => {
      const toRemove = objects.filter(o => !o.referenced);
      const freed = toRemove.reduce((sum, o) => sum + o.size, 0);

      setObjects(prev => prev.filter(o => o.referenced));
      setLog(prev => [...prev, `🗑️ GC 완료: ${toRemove.length}개 객체, ${freed}MB 해제`]);
      setGcRunning(false);
    }, 1000);
  };

  const totalSize = objects.reduce((sum, o) => sum + o.size, 0);
  const unreferencedCount = objects.filter(o => !o.referenced).length;

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: colors.text, marginBottom: '16px' }}>🗑️ Heap & Garbage Collection</h3>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* 왼쪽: Heap 시각화 */}
        <div style={{ flex: 1, minWidth: '280px' }}>
          {/* 메모리 바 */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: colors.textMuted, fontSize: '13px' }}>Heap 사용량</span>
              <span style={{ color: totalSize > 150 ? colors.danger : colors.text, fontSize: '13px' }}>
                {totalSize}MB / 200MB
              </span>
            </div>
            <div style={{
              height: '20px',
              backgroundColor: colors.bgLight,
              borderRadius: '10px',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(totalSize / 2, 100)}%`,
                backgroundColor: totalSize > 150 ? colors.danger : colors.heap,
                transition: 'all 0.3s'
              }} />
            </div>
          </div>

          {/* 객체들 */}
          <div style={{
            backgroundColor: colors.bgLight,
            border: `2px solid ${colors.heap}`,
            borderRadius: '8px',
            padding: '16px',
            minHeight: '200px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignContent: 'flex-start'
          }}>
            {objects.length === 0 ? (
              <div style={{ color: colors.textMuted, width: '100%', textAlign: 'center', padding: '40px' }}>
                "객체 생성" 버튼을 눌러보세요
              </div>
            ) : (
              objects.map(obj => (
                <div
                  key={obj.id}
                  onClick={() => obj.referenced && removeReference(obj.id)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: obj.referenced ? colors.heap : 'rgba(239,68,68,0.3)',
                    border: obj.referenced ? 'none' : `2px dashed ${colors.danger}`,
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '12px',
                    cursor: obj.referenced ? 'pointer' : 'default',
                    opacity: gcRunning && !obj.referenced ? 0.5 : 1,
                    transition: 'all 0.3s',
                  }}
                >
                  <div>{obj.name}</div>
                  <div style={{ opacity: 0.7 }}>{obj.size}MB</div>
                  {!obj.referenced && <div style={{ color: colors.danger }}>🗑️</div>}
                </div>
              ))
            )}
          </div>

          {/* 버튼들 */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <Button onClick={addObject} variant="success">
              + 객체 생성
            </Button>
            <Button
              onClick={runGC}
              variant="danger"
              disabled={gcRunning || unreferencedCount === 0}
            >
              {gcRunning ? '🗑️ GC 중...' : `🗑️ GC 실행 (${unreferencedCount}개 대상)`}
            </Button>
          </div>

          <p style={{ color: colors.textMuted, fontSize: '12px', marginTop: '8px' }}>
            💡 객체를 클릭하면 참조 해제 → GC 대상이 됩니다
          </p>
        </div>

        {/* 오른쪽: 로그 */}
        <div style={{ minWidth: '200px' }}>
          <div style={{ color: colors.textMuted, marginBottom: '8px', fontSize: '13px' }}>
            📋 Activity Log
          </div>
          <div style={{
            backgroundColor: '#1e1e1e',
            borderRadius: '8px',
            padding: '12px',
            height: '250px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            fontSize: '11px',
          }}>
            {log.slice(-10).map((entry, idx) => (
              <div key={idx} style={{ color: colors.textMuted, marginBottom: '4px' }}>
                {entry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// 5. 메모리 누수 데모 탭 (NEW!)
// ========================================
function MemoryLeakDemo() {
  const [scenario, setScenario] = useState(0);

  const scenarios = [
    {
      title: '정상 케이스',
      icon: '✅',
      code: `// 사용 후 참조 해제
List<User> users = new ArrayList<>();
users.add(new User("A"));
// 작업 완료 후
users.clear();  // ← 참조 해제
users = null;   // ← GC 가능`,
      heap: [
        { name: 'ArrayList', status: 'freed', desc: 'GC가 수거함' }
      ],
      problem: false,
      explanation: '참조를 끊으면 GC가 객체를 수거할 수 있음'
    },
    {
      title: '메모리 누수 - Static Collection',
      icon: '💥',
      code: `// ❌ static 컬렉션에 계속 추가
public class Cache {
    static List<User> cache = new ArrayList<>();
    
    public void addUser(User u) {
        cache.add(u);  // 계속 쌓임!
    }
    // clear() 안 함 → 누수!
}`,
      heap: [
        { name: 'User_1', status: 'leak' },
        { name: 'User_2', status: 'leak' },
        { name: 'User_3', status: 'leak' },
        { name: '...계속 증가', status: 'leak' },
      ],
      problem: true,
      explanation: 'static 컬렉션은 프로그램 종료까지 유지 → 계속 쌓이면 OOM'
    },
    {
      title: '메모리 누수 - 리스너 미해제',
      icon: '💥',
      code: `// ❌ 이벤트 리스너 등록만 하고 해제 안 함
button.addClickListener(this);
// ... 사용 후 ...
// button.removeClickListener(this); ← 이거 안 함!

// 결과: this 객체가 GC 안 됨`,
      heap: [
        { name: 'Button', status: 'ok' },
        { name: 'MyClass (this)', status: 'leak', desc: '리스너로 참조 중' },
      ],
      problem: true,
      explanation: '이벤트 리스너가 객체를 참조 → 해제 안 하면 GC 불가'
    },
    {
      title: '해결책',
      icon: '💡',
      code: `// ✅ 해결 방법들

// 1. 사용 후 명시적 제거
cache.remove(object);
cache.clear();

// 2. WeakReference 사용
WeakReference<User> ref = new WeakReference<>(user);

// 3. 캐시 크기 제한 (LRU 등)
if (cache.size() > MAX_SIZE) {
    cache.remove(oldestKey);
}

// 4. try-with-resources (AutoCloseable)
try (Connection conn = getConnection()) {
    // 사용
}  // 자동 close`,
      heap: [],
      problem: false,
      explanation: '명시적 해제, WeakReference, 크기 제한, AutoCloseable 활용'
    }
  ];

  const current = scenarios[scenario];

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: colors.text, marginBottom: '16px' }}>💥 메모리 누수 시나리오</h3>

      {/* 시나리오 선택 버튼 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {scenarios.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setScenario(idx)}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: scenario === idx ? 'none' : `1px solid ${colors.border}`,
              backgroundColor: scenario === idx ?
                (s.problem ? colors.danger : colors.heap) : 'transparent',
              color: scenario === idx ? 'white' : colors.textMuted,
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* 코드 */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <pre style={{
            backgroundColor: '#1e1e1e',
            borderRadius: '8px',
            padding: '16px',
            color: '#9cdcfe',
            fontSize: '12px',
            overflow: 'auto',
            margin: 0,
            border: current.problem ? `2px solid ${colors.danger}` : `2px solid ${colors.heap}`,
          }}>
            {current.code}
          </pre>
        </div>

        {/* Heap 상태 */}
        {current.heap.length > 0 && (
          <div style={{ minWidth: '180px' }}>
            <div style={{ color: colors.textMuted, marginBottom: '8px', fontSize: '13px' }}>
              Heap 상태
            </div>
            <div style={{
              backgroundColor: colors.bgLight,
              borderRadius: '8px',
              padding: '12px',
            }}>
              {current.heap.map((obj, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px',
                    marginBottom: '8px',
                    borderRadius: '6px',
                    backgroundColor: obj.status === 'leak' ? 'rgba(239,68,68,0.2)' :
                      obj.status === 'freed' ? 'rgba(16,185,129,0.2)' : colors.heap,
                    border: obj.status === 'leak' ? `1px solid ${colors.danger}` : 'none',
                    fontSize: '12px',
                  }}
                >
                  <div style={{
                    color: obj.status === 'leak' ? colors.danger :
                      obj.status === 'freed' ? colors.heap : 'white',
                    fontWeight: 'bold'
                  }}>
                    {obj.status === 'leak' && '🔴 '}{obj.name}
                  </div>
                  {obj.desc && (
                    <div style={{ color: colors.textMuted, fontSize: '11px' }}>{obj.desc}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 설명 */}
      <div style={{
        marginTop: '16px',
        padding: '12px 16px',
        backgroundColor: current.problem ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
        border: `1px solid ${current.problem ? colors.danger : colors.heap}`,
        borderRadius: '8px',
        color: colors.text,
      }}>
        {current.problem ? '⚠️ ' : '✅ '}{current.explanation}
      </div>
    </div>
  );
}

// ========================================
// 메인 컴포넌트
// ========================================
export default function MemoryStructure() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: '📋 개요', component: <MemoryOverview /> },
    { label: '📚 Stack', component: <StackAnimation /> },
    { label: '🔗 Stack↔Heap', component: <StackHeapConnection /> },
    { label: '🗑️ Heap & GC', component: <HeapGCAnimation /> },
    { label: '💥 메모리누수', component: <MemoryLeakDemo /> },
  ];

  return (
    <div style={{
      backgroundColor: colors.bg,
      borderRadius: '12px',
      overflow: 'hidden',
      margin: '20px 0',
      border: `1px solid ${colors.border}`,
    }}>
      {/* 탭 헤더 */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: colors.bgLight,
        borderBottom: `1px solid ${colors.border}`,
      }}>
        {tabs.map((tab, idx) => (
          <TabButton
            key={idx}
            active={activeTab === idx}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </TabButton>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div style={{ minHeight: '400px' }}>
        {tabs[activeTab].component}
      </div>

      {/* 애니메이션 스타일 */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}