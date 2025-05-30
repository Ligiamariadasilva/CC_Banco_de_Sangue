using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DoadoresApi.Models
{
    [Table("doador")] // <-- define o nome exato da tabela no MySQL
    public class Doador
    {
        [Key]
        public int Id { get; set; }

        public string Nome { get; set; }

        public string TipoSanguineo { get; set; }

        public DateTime DataUltimaDoacao { get; set; }
    }
}
