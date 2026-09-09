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
        }
    }
}
