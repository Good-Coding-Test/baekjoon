
import java.io.*;
import java.util.Arrays;
import java.util.Scanner;
import java.util.stream.IntStream;

public class Main {

	private static int junhyeun(int stock[], int n) {
		int count = 0;
		for (int i = 0 ; i < stock.length ; i++) {
			if (n >= stock[i]) {
				count += n / stock[i];
				n %= stock[i];
			}
		}
		return n + stock[stock.length -1] * count;
	}


	private static int sungmin(int stock[], int n) {
		int count = 0;

		int dducksangCount = 0;
		int dduckrockCount = 0;

		for (int i = 1 ; i < stock.length ; i++) {
			if (stock[i] > stock[i - 1]) {
				dducksangCount++;
				dduckrockCount = 0;
				if (dducksangCount == 3 && count >= 1) {
					n += count * stock[i];
					count = 0;
					dducksangCount = 0;
				}
			}
			else if (stock[i] < stock[i - 1]) {
				dduckrockCount++;
				dducksangCount = 0;
				if (dduckrockCount == 3 && n >= stock[i]) {
					count = n / stock[i];
					n = n % stock[i];
					dduckrockCount = 0;
				}
			}
			else {
				dduckrockCount = 0;
				dducksangCount = 0;
			}
		}
		return n + stock[stock.length - 1] * count;
	}



	public static void main(String[] args) throws IOException {
		Scanner input = new Scanner(System.in);

		int n = input.nextInt();
		int stock[] = new int[14];

		for (int i = 0 ; i < 14 ; i++) {
			stock[i] = input.nextInt();
		}

		int junhyeun = junhyeun(stock, n);
		int sungmin = sungmin(stock, n);
		if (junhyeun > sungmin) {
			System.out.println("BNP");
		}
		else if (junhyeun < sungmin) {
			System.out.println("TIMING");
		}
		else {
			System.out.println("SAMESAME");
		}
	}
}



