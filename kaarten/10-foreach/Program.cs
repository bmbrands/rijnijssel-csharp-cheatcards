using System;

namespace VoorbeeldForeach
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] namen = { "Sam", "Noah", "Lina", "Milan" };

            // foreach pakt elk item uit de array, zonder index
            foreach (string naam in namen)
            {
                Console.WriteLine(naam);
            }
        }
    }
}
