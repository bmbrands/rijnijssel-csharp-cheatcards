using System;

namespace VoorbeeldWhile
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int teller = 1;

            while (teller <= 3)
            {
                Console.WriteLine("Teller: " + teller);
                teller++;
            }
        }
    }
}
