import React, { useState } from 'react';

const memoryAreas = [
  {
    name: 'Stack',
    color: '#3b82f6',
    icon: '📚',
    description: '지역변수, 함수 호출 정보',
    details: {
      stored: '지역변수, 매개변수, 리턴 주소',
      features: ['LIFO (Last In First Out)', '함수 호출 시 Push, 종료 시 Pop', '크기 고정 (1~8MB)'],
      error: 'StackOverflowError'
    }
  },
  {
    name: 'Heap',
    color: '#10b981',
    icon: '📦',
    description: 'new로 생성한 객체',
    details: {
      stored: '객체, 배열 (new로 생성)',
      features: ['크기 유동적 (런타임에 결정)', 'GC가 자동 해제 (Java)', '어디서든 참조로 접근 가능'],
      error: 'OutOfMemoryError'
    }
  },
  {
    name: 'Data',
    color: '#f59e0b',
    icon: '📋',
    description: '전역변수, static 변수',
    details: {
      stored: '전역변수, static 변수',
      features: ['프로그램 시작~끝까지 유지', '모든 함수에서 접근 가능', 'BSS + Data 영역으로 세분화'],
      error: '-'
    }
  },
  {
    name: 'Code',
    color: '#8b5cf6',
    icon: '📜',
    description: '실행할 코드 자체',
    details: {
      stored: '컴파일된 기계어 코드',
      features: ['읽기 전용 (Read-Only)', '실행 중 변경 불가', 'Text 영역이라고도 함'],
      error: '-'
    }
  }
];

const stackSteps = [
  {
    title: 'Step 1: main() 호출',
    code: 'public static void main(String[] args) {',
    stack: [{ name: 'main()', vars: [] }],
    highlight: 0
  },
  {
    title: 'Step 2: 변수 선언',
    code: '    int x = 10;\n    int y = 20;',
    stack: [{ name: 'main()', vars: ['x = 10', 'y = 20'] }],
    highlight: 0
  },
  {
    title: 'Step 3: add() 호출',
    code: '    int result = add(x, y);',
    stack: [
      { name: 'main()', vars: ['x = 10', 'y = 20'] },
      { name: 'add()', vars: ['a = 10', 'b = 20', 'sum = 30'] }
    ],
    highlight: 1
  },
  {
    title: 'Step 4: add() 종료 → Pop!',
    code: '    return sum;\n}',
    stack: [{ name: 'main()', vars: ['x = 10', 'y = 20', 'result = 30'] }],
    highlight: 0
  }
];

export default function MemoryStructure() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [stackStep, setStackStep] = useState(0);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* 메모리 영역 카드 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {memoryAreas.map((area) => (
          <div
            key={area.name}
            onClick={() => setSelectedArea(selectedArea === area.name ? null : area.name)}
            style={{
              padding: '1.5rem',
              borderRadius: '12px',
              backgroundColor: selectedArea === area.name ? area.color : '#f8fafc',
              color: selectedArea === area.name ? 'white' : '#1e293b',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: `2px solid ${area.color}`,
              boxShadow: selectedArea === area.name ? '0 10px 25px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{area.icon}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{area.name}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>{area.description}</div>
          </div>
        ))}
      </div>

      {/* 선택된 영역 상세 정보 */}
      {selectedArea && (
        <div style={{
          padding: '1.5rem',
          borderRadius: '12px',
          backgroundColor: '#1e293b',
          color: 'white',
          marginBottom: '2rem'
        }}>
          <h3 style={{ margin: '0 0 1rem 0' }}>
            {memoryAreas.find(a => a.name === selectedArea)?.icon} {selectedArea} 영역 상세
          </h3>
          {(() => {
            const area = memoryAreas.find(a => a.name === selectedArea);
            return (
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <strong>📌 저장 대상:</strong> {area.details.stored}
                </div>
                <div>
                  <strong>⚡ 특징:</strong>
                  <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                    {area.details.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
                <div>
                  <strong>🚨 관련 에러:</strong>{' '}
                  <code style={{ 
                    backgroundColor: area.details.error === '-' ? '#374151' : '#dc2626',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px'
                  }}>
                    {area.details.error}
                  </code>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Stack 애니메이션 */}
      <div style={{
        padding: '1.5rem',
        borderRadius: '12px',
        backgroundColor: '#0f172a',
        color: 'white'
      }}>
        <h3 style={{ margin: '0 0 1rem 0' }}>🎬 Stack 동작 애니메이션</h3>
        
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* 코드 영역 */}
          <div style={{ flex: 1, minWidth: '250px' }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
              {stackSteps[stackStep].title}
            </div>
            <pre style={{
              backgroundColor: '#1e293b',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '0.875rem',
              overflow: 'auto'
            }}>
              {stackSteps[stackStep].code}
            </pre>
          </div>

          {/* Stack 시각화 */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Stack 메모리</div>
            <div style={{
              backgroundColor: '#1e293b',
              padding: '1rem',
              borderRadius: '8px',
              minHeight: '150px'
            }}>
              {stackSteps[stackStep].stack.map((frame, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: stackSteps[stackStep].highlight === i ? '#3b82f6' : '#374151',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    marginBottom: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{frame.name}</div>
                  {frame.vars.map((v, j) => (
                    <div key={j} style={{ fontSize: '0.875rem', opacity: 0.8, marginLeft: '0.5rem' }}>
                      └ {v}
                    </div>
                  ))}
                </div>
              ))}
              {stackSteps[stackStep].stack.length === 0 && (
                <div style={{ opacity: 0.5, textAlign: 'center' }}>(비어있음)</div>
              )}
            </div>
          </div>
        </div>

        {/* 컨트롤 버튼 */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'center' }}>
          {stackSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => setStackStep(i)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: stackStep === i ? '#3b82f6' : '#374151',
                color: 'white',
                cursor: 'pointer',
                fontWeight: stackStep === i ? 'bold' : 'normal'
              }}
            >
              Step {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Stack vs Heap 비교표 */}
      <div style={{ marginTop: '2rem', overflowX: 'auto' }}>
        <h3>⚔️ Stack vs Heap 비교</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#1e293b', color: 'white' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>구분</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Stack</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Heap</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['저장 대상', '지역변수, 매개변수', '객체, 배열'],
              ['할당 속도', '빠름 ⚡', '느림'],
              ['크기', '고정 (작음)', '유동적 (큼)'],
              ['관리', '자동', 'GC 또는 수동'],
              ['에러', 'StackOverflowError', 'OutOfMemoryError']
            ].map(([label, stack, heap], i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{label}</td>
                <td style={{ padding: '0.75rem', backgroundColor: '#eff6ff' }}>{stack}</td>
                <td style={{ padding: '0.75rem', backgroundColor: '#ecfdf5' }}>{heap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
