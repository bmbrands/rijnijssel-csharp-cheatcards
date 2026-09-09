using System;

namespace VoorbeeldArray
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] namen = { "Sam", "Noah", "Lina", "Milan" };

            Console.WriteLine("Eerste naam: " + namen[0]);
            Console.WriteLine("Aantal namen: " + namen.Length);

            int[] getallen = new int[3];

            getallen[0] = 5;
            getallen[1] = 10;
            getallen[2] = 15;

            Console.WriteLine("Eerste getal: " + getallen[0]);
            Console.WriteLine("Aantal getallen: " + getallen.Length);
        }
    }
}
