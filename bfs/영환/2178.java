 import java.io.*;
import java.sql.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;


class hNode {
	int x, y;

	public hNode(int x, int y) {
		this.x = x;
		this.y = y;
	}

}
public class Main {

	static int dx[] = {1, 0 ,-1, 0};
	static int dy[] = {0, 1, 0, -1};
	static int n,m;

	private static boolean isValid(int x, int y, int array[][]) {
		if ((1 <= y && y <= n) && (1 <= x && x <= m) && array[y][x] == 1)
			return true;
		return false;
	}
	private static void BFS(int array[][], boolean visited[][], int count) {

		Queue<hNode> queue = new LinkedList<>();
		queue.add(new hNode(1,1));
		visited[1][1] = true;

		while(!queue.isEmpty()) {
			hNode elem = queue.poll();

			for (int i = 0 ; i < 4 ; i++) {
				int mx = elem.x + dx[i];
				int my = elem.y + dy[i];

				if (isValid(mx, my, array) && !visited[my][mx]) {
					visited[my][mx] = true;
					array[my][mx] = array[elem.y][elem.x] + 1;
					queue.add(new hNode(mx, my));
				}
			}
		}
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		n = Integer.parseInt(st.nextToken());
		m = Integer.parseInt(st.nextToken());

		int array[][] = new int[n + 1][m + 1];
		boolean visited[][] = new boolean[n + 1][m + 1];

		for (int i = 1 ; i <= n ; i++) {
			String input = br.readLine();
			for (int j = 1 ; j <= m ; j++) {
				array[i][j] = input.charAt(j - 1) - '0';
			}
		}

		BFS(array, visited, 1);

		System.out.println(array[n][m]);

	}
}