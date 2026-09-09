using System;

namespace VoorbeeldConsole
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Wat is jouw naam? ");
            string naam = Console.ReadLine();

            Console.WriteLine("Hallo " + naam);

            Console.Write("Hoe oud ben je? ");
            int leeftijd = int.Parse(Console.ReadLine());
            Console.WriteLine("Je bent " + leeftijd + " jaar oud.");
        }
    }
}
