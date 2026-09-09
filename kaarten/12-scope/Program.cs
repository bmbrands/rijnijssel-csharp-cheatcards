using System;

namespace VoorbeeldScope
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int totaal = 0;

            for (int i = 1; i <= 3; i++)
            {
                // teller bestaat alleen binnen dit blok
                int teller = i * 10;
                totaal = totaal + teller;
            }

            Console.WriteLine(totaal);

            // Dit zou een fout geven: teller bestaat hier niet meer
            // Console.WriteLine(teller);
        }
    }
}
