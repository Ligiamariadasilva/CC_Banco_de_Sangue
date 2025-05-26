namespace DoadoresApi.Models;

//Define a classe Doador, que representa um doador de sangue no sistema.
public class Doador
{
    //Identificador do doador
    public int Id { get; set; }

    //Nome do doador
    public string Nome { get; set; }

    //Tipo sanguineo do Doador
    public string TipoSanguineo { get; set; }

    //Data da ultima Doacao que o doador fez
    public DateTime DataUltimaDoacao { get; set; }
}
