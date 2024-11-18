
import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;
import java.util.StringTokenizer;

class hNode {
	int x,y;
	int value;

	public hNode(int y, int x, int value) {
		this.y = y;
		this.x = x;
		this.value = value;
	}

}
public class Main {

	private static int map[][];
	private static int n,m;
	private static int dx[] = {0, 0, 1, -1};
	private static int dy[] = {1, -1, 0, 0};


	private static Queue<hNode> queue = new LinkedList<>();
	private static boolean checkMap(int y, int x) {
		if ((0 <= x && x < m) && (0 <= y && y < n))
			return true;
		return false;
	}

	private static boolean checkTomato() {
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				if(map[i][j] == 0)
					return false;
			}
		}
		return true;
	}

	private static void BFS() {

		int resultDay = 0;

		while (!queue.isEmpty()) {
			hNode now = queue.poll();
			resultDay = now.value;

			for (int i = 0 ; i < 4; i++) {
				int x = now.x + dx[i];
				int y = now.y + dy[i];

				if (checkMap(y, x)) {
					if (map[y][x] == 0) {
						map[y][x] = 1;
						queue.add(new hNode(y, x, resultDay + 1));
					}
				}
			}
		}

		if (checkTomato()) {
			System.out.println(resultDay);
		}
		else {
			System.out.println("-1");
		}

	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());

		m = Integer.parseInt(st.nextToken());
		n = Integer.parseInt(st.nextToken());

		map = new int[n][m];

		for (int i = 0 ; i < n ; i++) {
			st = new StringTokenizer(br.readLine());
			for (int j = 0 ; j < m ; j++) {
				map[i][j] = Integer.parseInt(st.nextToken());
				if (map[i][j] == 1) {
					queue.add(new hNode(i, j, 0));
				}
			}
		}
		BFS();
	}
}



