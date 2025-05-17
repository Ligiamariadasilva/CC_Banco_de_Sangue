namespace DoadoresApi.Models;

public class Doador
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string TipoSanguineo { get; set; }
    public DateTime DataUltimaDoacao { get; set; }
}
