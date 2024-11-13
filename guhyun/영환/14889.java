
import java.io.*;
import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {

	private static int n;

	private static boolean team[];

	private static int min = 101;
	private static void calculatePower(int input[][]) {

		int trueTeam = 0;
		int falseTeam = 0;

		for (int i = 0 ; i < n ; i++) {
			for (int j = 0 ; j < n ; j++) {
				if (team[i] && team[j]) {
					trueTeam += input[i][j];
				}
				else if(!team[i] && !team[j]){
					falseTeam += input[i][j];
				}
			}
		}
		min = Math.min(min, Math.abs(trueTeam - falseTeam));
	}

	private static void divideTeam(int number, int count, int input[][]) {

		if (n / 2 == count) {
			calculatePower(input);
			return ;
		}

		if (n == number) {
			return;
		}

        // 여기서 차례대로 팀을 n/2가 될 때 까지 나눔
		team[number] = true;
		divideTeam(number + 1, count + 1, input);

        // true인 경우로 재귀로 calculatePower로 계산 후 해당 number의 사람을 빼고 다음 사람으로 계산
		team[number] = false;
		divideTeam(number + 1, count, input);

	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		n = Integer.parseInt(br.readLine());
		team = new boolean[n];
		int input[][] = new int[n][n];
		for (int i = 0 ; i < n ; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine());
			for (int j = 0 ; j < n ; j++) {
				input[i][j] = Integer.parseInt(st.nextToken());
			}
		}

		divideTeam(0,0, input);

		System.out.println(min);

	}
}
