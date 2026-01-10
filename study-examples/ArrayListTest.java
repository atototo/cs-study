import java.util.ArrayList;
import java.util.List;

public class ArrayListTest {
    public static void main(String[] args) {
        // 1. ArrayList 생성 및 초기 데이터 추가
        List<String> list = new ArrayList<>();
        list.add("A"); // index 0
        list.add("B"); // index 1
        list.add("C"); // index 2

        System.out.println("=== 1. 초기 상태 ===");
        printList(list);

        // 2. add(index, element) 테스트: 끼워넣기 (밀려남 확인)
        System.out.println("\n=== 2. list.add(1, \"NEW\") 실행: 중간 삽입 ===");
        System.out.println("-> 인덱스 1에 'NEW'를 넣으면 원래 1번이었던 'B'와 그 뒤는 다 밀려납니다.");
        list.add(1, "NEW");
        printList(list);

        // 3. set(index, element) 테스트: 덮어쓰기 (안 밀려남 확인)
        System.out.println("\n=== 3. list.set(2, \"MODIFIED\") 실행: 덮어쓰기 ===");
        System.out.println("-> 인덱스 2(현재 'B')를 'MODIFIED'로 바꿉니다. 다른 애들은 그대로입니다.");
        list.set(2, "MODIFIED");
        printList(list);

        // 4. remove(index) 테스트: 삭제하기 (당겨짐 확인)
        System.out.println("\n=== 4. list.remove(1) 실행: 삭제하기 ===");
        System.out.println("-> 인덱스 1('NEW')을 지우면 뒤에 있던 애들이 앞으로 당겨집니다.");
        list.remove(1);
        printList(list);

        // 5. indexOf(value) 테스트: 값으로 위치 찾기
        System.out.println("\n=== 5. list.indexOf(\"C\") 실행: 탐색 ===");
        int index = list.indexOf("C");
        System.out.println("-> 값 'C'는 현재 인덱스 " + index + "에 있습니다. (순차적으로 찾음)");
    }

    // 리스트 상태를 보기 좋게 출력하는 헬퍼 메서드
    private static void printList(List<String> list) {
        System.out.println("현재 크기: " + list.size());
        for (int i = 0; i < list.size(); i++) {
            System.out.println(String.format("Index [%d]: %s", i, list.get(i)));
        }
    }
}
