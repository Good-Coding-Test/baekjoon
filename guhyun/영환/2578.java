import java.io.*;
import java.util.Scanner;

public class Main {
	private static int map[][];
	private static boolean result[][];

	private static void insertValue(int elem) {
		for (int i = 0 ; i < 5 ; i++) {
			for (int j = 0 ; j < 5 ; j++) {
				if (map[i][j] == elem) {
					result[i][j] = true;
					return;
				}
			}
		}
	}
	private static boolean checkBingGo() {
		int sum =  checkColAndRow() + checkDiag();
		if (sum >= 3)
			return true;
		return false;
	}

	private static int checkColAndRow() {
		int bingGoCount = 0;

		for (int i = 0 ; i < 5 ; i++) {
			int rowCount = 0;
			int colCount = 0;
			for (int j = 0 ; j < 5 ; j++) {
				if (result[j][i] == true) {
					colCount++;
				}
				if (result[i][j] == true) {
					rowCount++;
				}
			}
			if (rowCount == 5) {
				bingGoCount++;
			}
			if (colCount == 5) {
				bingGoCount++;
			}

		}
		return bingGoCount;
	}

	private static int checkDiag() {
		int bingGoCount = 0;
		int leftToRight = 0;
		int rightToLeft = 0;
		for (int i = 0 ; i < 5 ; i++) {
			if (result[i][i]) {
				leftToRight++;
			}
			if (result[i][4 - i]) {
				rightToLeft++;
			}
		}
		if (leftToRight == 5)
			bingGoCount++;
		if (rightToLeft == 5)
			bingGoCount++;
		return bingGoCount;
	}

	public static void main(String[] args) throws IOException {
		Scanner input = new Scanner(System.in);
		map = new int[5][5];
		result = new boolean[5][5];

		// 입력
		for (int i = 0 ; i < 5 ; i++) {
			for (int j = 0 ; j < 5 ; j++) {
				map[i][j] = input.nextInt();
			}
		}

		for (int i = 0 ; i < 5 ; i++) {
			for (int j = 0 ; j < 5; j++) {
				int elem = input.nextInt();
				insertValue(elem);
				if(checkBingGo()) {
					System.out.println(5 * i + j + 1);
					return;
				}
			}
		}

	}
}



