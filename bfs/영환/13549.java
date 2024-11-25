import java.io.*;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.util.StringTokenizer;

class  hNode {
	int x, time;
	public hNode(int x, int time) {
		this.x = x;
		this.time = time;
	}
}

public class Main {

	private static boolean visited[];
	private static int min = Integer.MAX_VALUE;
	private static int max = 100000;

	private static void BFS(int start, int target) {
		Queue<hNode> queue = new LinkedList<>();
		queue.add(new hNode(start, 0));

		while(!queue.isEmpty()) {
			hNode now = queue.poll();
			visited[now.x] = true;

			if (now.x == target) {
				min = Math.min(now.time, min);
			}
			if (now.x * 2 <= max && !visited[now.x * 2]) {
				queue.add(new hNode(now.x * 2, now.time));
			}
			if (now.x + 1 <= max && !visited[now.x + 1]) {
				queue.add(new hNode(now.x + 1, now.time + 1));
			}
			if (now.x - 1 >= 0 && !visited[now.x - 1]) {
				queue.add(new hNode(now.x - 1, now.time + 1));
			}
		}
	}
	public static void main(String[] args) throws IOException {
		Scanner input = new Scanner(System.in);
		int n = input.nextInt();
		int m = input.nextInt();

		visited = new boolean[max + 1];
		BFS(n, m);
		System.out.println(min);

	}
}



