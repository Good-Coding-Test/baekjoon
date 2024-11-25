import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.PriorityQueue;
import java.util.Scanner;
import java.util.Stack;
import java.util.StringTokenizer;
import java.util.TreeSet;

public class Main {
	private static boolean visited[];
	private static ArrayList<Integer> list[];

	private static void DFS(int start) {

		visited[start] = true;

		for (int elem : list[start]) {
			if (!visited[elem]) {
				DFS(elem);
			}
		}
	}

	public static void main(String[] args) throws IOException {
		Scanner input = new Scanner(System.in);

		int n = input.nextInt();
		int m = input.nextInt();
		int result = 0;

		visited = new boolean[n + 1];
		list = new ArrayList[n + 1];

		for (int i = 1 ; i <= n ; i++) {
			list[i] = new ArrayList<>();
		}

		for (int i = 1 ; i <= m ; i++) {
			int u = input.nextInt();
			int v = input.nextInt();

			list[u].add(v);
			list[v].add(u);
		}

		for (int i = 1 ; i <= n ; i++) {
			if (!visited[i]) {
				result++;
				DFS(i);
			}
		}

		System.out.println(result);
	}
}



