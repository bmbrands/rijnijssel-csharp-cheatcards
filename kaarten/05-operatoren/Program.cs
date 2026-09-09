using System;

namespace VoorbeeldOperatoren
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int leeftijd = 20;
            bool heeftKaart = true;

            if (leeftijd > 12)
            {
                Console.WriteLine("Ouder dan 12");
            }

            if (leeftijd < 65)
            {
                Console.WriteLine("Jonger dan 65");
            }

            if (leeftijd >= 18 && heeftKaart)
            {
                Console.WriteLine("Toegang toegestaan");
            }

            if (leeftijd < 18 || !heeftKaart)
            {
                Console.WriteLine("Geen toegang");
            }
        }
    }
}
