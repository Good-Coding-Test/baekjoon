import java.io.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.util.StringTokenizer;

public class Main {

	private static boolean visited[];
	private static ArrayList<Integer> list[];
	private static int count = 0;

	private static void BFS(int start) {
		Queue<Integer> queue = new LinkedList<>();
		visited[start] = true;
		queue.add(start);

		while(!queue.isEmpty()) {
			int now = queue.poll();

			for (int elem : list[now]) {
				if (!visited[elem]) {
					queue.add(elem);
					visited[elem] = true;
					count++;
				}
			}
		}

	}
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int n = Integer.parseInt(br.readLine());
		int m = Integer.parseInt(br.readLine());

		visited = new boolean[n + 1];
		list = new ArrayList[n + 1];

		for (int i = 1 ; i <= n ; i++) {
			list[i] = new ArrayList<>();
		}

		for (int i = 0 ; i < m ; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine());

			int a = Integer.parseInt(st.nextToken());
			int b = Integer.parseInt(st.nextToken());
			list[a].add(b);
			list[b].add(a);
		}

		BFS(1);
		System.out.println(count);
	}
}



