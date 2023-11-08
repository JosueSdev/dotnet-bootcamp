using Classes;

var account = new BankAccount("Josué Sandoval", 1000);
Console.WriteLine($"Account {account.Number} was created for {account.Owner} with {account.Balance} initial balance.");

account.MakeWithdrawal(500, DateTime.Now, "Rent payment");
account.MakeDeposit(100, DateTime.Now, "Friend paid me back");

Console.WriteLine(account.GetAccountHistory());
