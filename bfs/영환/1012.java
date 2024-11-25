import java.io.*;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

	private static int map[][];
	private static boolean visited[][];
	private static int dx[] = {0 ,0 ,-1, 1};
	private static int dy[] = {-1, 1, 0, 0};

	private static int n,m;


	private static boolean validMap(int y, int x) {
		if(0 <= x && x < m && 0 <= y && y <n && map[y][x] == 1 && !visited[y][x]) {
			return true;
		}
		return false;
	}
    
    // BFS로 배추가 심은 곳은 모두 visited = true로 변경
	private static void BFS(int y, int x) {
		Queue<int[]> queue = new LinkedList<>();
		queue.add(new int[] {y, x});

		visited[y][x] = true;

		while(!queue.isEmpty()) {
			int now[] = queue.poll();

			int nowY = now[0];
			int nowX = now[1];

			for (int i = 0 ; i < 4 ; i++) {
				int my = nowY + dy[i];
				int mx = nowX + dx[i];

				if (validMap(my, mx)) {
					visited[my][mx] = true;
					queue.add(new int[] {my, mx});
				}

			}

		}
	}
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

		int t = Integer.parseInt(br.readLine());

		for (int i = 0 ; i < t ; i++) {
			StringTokenizer st = new StringTokenizer(br.readLine());
			m = Integer.parseInt(st.nextToken());
			n = Integer.parseInt(st.nextToken());
			int k = Integer.parseInt(st.nextToken());
			int count = 0;

			map = new int[n][m];
			visited = new boolean[n][m];

			for (int j = 0 ; j < k ; j++) {
				st = new StringTokenizer(br.readLine());
				int x = Integer.parseInt(st.nextToken());
				int y = Integer.parseInt(st.nextToken());
				map[y][x] = 1;
			}
			for (int j = 0 ; j < n ; j++) {
				for (int h = 0 ; h < m ; h++) {
					if (map[j][h] == 1 && !visited[j][h]) {
						count++;
						BFS(j, h); //BFS에서 같이 붙어 있는 곳은 true로 되어 있으므로 if문에서 조건이 걸린 경우만 count를 올려줌
					}
				}
			}

			System.out.println(count);

		}


	}
}



