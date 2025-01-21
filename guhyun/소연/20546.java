import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader bf = new BufferedReader(new InputStreamReader(System.in));
        int money = Integer.parseInt(bf.readLine());
        int[] stock = new int[14];
        StringTokenizer st = new StringTokenizer(bf.readLine());
        for(int i=0; i<14; i++){
            stock[i]=Integer.parseInt(st.nextToken());
        }
        int Jun= Jun(stock, money);
        //System.out.println("준현"+Jun);
        int Sung = Sung(stock,money);
        //System.out.println("성민"+Sung);
        if(Jun>Sung){
            System.out.println("BNP");
        }
        else if(Jun<Sung){
            System.out.println("TIMING");
        }
        else{
            System.out.println("SAMESAME");
        }

        
    }

    static int Jun (int[] stock, int money){
        int count=0;
        for(int i=0; i<14; i++){
            count+=money/stock[i];
            money=money%stock[i];
            if(i==13){
                return stock[i]*count+money;
            }
        }
        return 0;
    }

    static int Sung (int[] stock, int money){
        int count=0;
        for(int i=0; i<14; i++){
            if(i>2){
                if(stock[i]<stock[i-1] && stock[i-1]<stock[i-2] && stock[i-2]<stock[i-3]){
                    //매수
                    count+=money/stock[i];
                    money=money%stock[i];
                    //System.out.println("매수 하였습니다 현재는"+ (i+1)+"일"+"가격은"+stock[i]);
                }
                if(stock[i]>stock[i-1] && stock[i-1]>stock[i-2] && stock[i-2] > stock[i-3]){
                    if(count>0){
                        // 매도
                        money=stock[i]*count;
                        count=0;
                        //System.out.println("매도 하였습니다 현재는"+ (i+1)+"일"+"가격은"+stock[i]);
                    }

                }
                if(i==13){
                    return stock[i]*count+money;
                }
            }
        }
        return 0;
    }
}