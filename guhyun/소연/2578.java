import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

    public static void main(String[] args) throws IOException{
        BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
        int[][] graph = new int[5][5];
        for (int i=0; i<5; i++){
            StringTokenizer st = new StringTokenizer(bf.readLine());
            for(int j=0; j<5; j++){
                graph[i][j]=Integer.parseInt(st.nextToken());
            }
        }
        int count=0;

        for(int i=0; i<5; i++){
            StringTokenizer st = new StringTokenizer(bf.readLine());
            for(int j=0; j<5; j++){
                int num= Integer.parseInt(st.nextToken());
                for(int k=0; k<5; k++){
                    for(int l=0; l<5; l++){
                        if(graph[k][l]==num){
                            graph[k][l]=0;
                            count+=1;
                            if(checkBingo(graph)>=3){
                                System.out.println(count);
                                return;
                            }
                        }
                    }
                }

            }
        }


    }
    static int checkBingo(int[][] graph){
        // 가로 열 체크
        int rowCheck=0;
        int colCheck=0;
        int bingoCount=0;
        for(int i=0; i<5; i++){
            rowCheck=0;
            colCheck=0;
            for(int j=0; j<5; j++){
                if(graph[i][j]==0){
                    rowCheck++;
                }
                if(graph[j][i]==0){
                    colCheck++;
                }
            }
            if(rowCheck==5){
                bingoCount++;
            }
            if(colCheck==5){
                bingoCount++;
            }
        }
        int diagCheckLeft=0;
        int diagCheckRight=0;
        for(int i=0; i<5; i++){
            if(graph[i][i]==0){
                diagCheckLeft++;
            }
            if(graph[i][4-i]==0){
                diagCheckRight++;
            }

        }
        if (diagCheckLeft==5){
            bingoCount++;
        }
        if(diagCheckRight==5){
            bingoCount++;
        }

    return bingoCount;

    }


}
