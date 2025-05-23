import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
    private static boolean[] visited;
    private static int[] arr;
    public static void dfs(int n, int m, int depth){
       if(depth==m){
           for(int val: arr){
               System.out.print(val+" ");

           }
           System.out.println();
           return;
       }

       for(int i=0; i<n; i++){
           if(!visited[i]){
                if(depth==0|| arr[depth-1]<i+1){
                    visited[i]=true;
                    arr[depth]=i+1;
                    dfs(n,m,depth+1);
                    visited[i]=false;
                }
           }
       }

    }


    public static void main(String[] args) throws IOException {
        BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(bf.readLine());
        int n=Integer.parseInt(st.nextToken());
        int m=Integer.parseInt(st.nextToken());
        int[] array = new int[n];
        StringTokenizer sf = new StringTokenizer(bf.readLine());
        for(int i=0; i<n; i++){
            array[i]=Integer.parseInt(sf.nextToken());
        }
        
        visited= new boolean[n];
        arr = new int[m];

        dfs(n,m,arr,0);


    }
}