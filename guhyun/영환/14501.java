
import java.io.*;
import java.util.Scanner;

class hNode {
	int time;
	int value;

	int last;
	public hNode(int time, int value, int last) {
		this.time = time;
		this.last = last;
		this.value = value;
	}
}
public class Main {

	private static int max = 0;
	private static hNode list[];
	private static int n;

	private static void DFS(int start, int sum) {
		if (list[start].last <= n) {
			sum += list[start].value;
		}

		for (int i = start + 1 ; i < n ; i++) {
			if (list[start].last <= i && list[i].last <= n) {
				DFS(i , sum);
			}
		}
		if (max < sum) {
			max = sum;
		}
	}

	public static void main(String[] args) throws IOException {
		Scanner input = new Scanner(System.in);

		n = input.nextInt();
		list = new hNode[n];
		sum = new int[n];

		for (int i = 0; i < n; i++) {
			int time = input.nextInt();
			int value = input.nextInt();
			list[i] = new hNode(time, value, i + time);
		}

		for (int i = 0; i < n; i++) {
			DFS(i, 0);
		}

		System.out.println(max);
	}
}



