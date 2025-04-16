package br.edu.senacsp.projeto.medico.domain.atendimento;

import br.edu.senacsp.projeto.medico.domain.medico.Medico;
import br.edu.senacsp.projeto.medico.domain.paciente.Paciente;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "atendimentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "id_paciente")
    private Paciente paciente;
    @ManyToOne
    @JoinColumn(name = "id_medico")
    private Medico medico;
    @Column(name = "data_atendimento")
    private Date dataAtendimento;
    private String sala;

    public Atendimento(Paciente paciente, Medico medico, Date data, String sala) {
        this.paciente = paciente;
        this.medico = medico;
        this.dataAtendimento = data;
        this.sala = sala;
    }

    @Override
    public String toString() {
        return "Atendimento{" +
                "id=" + id +
                ", paciente=" + paciente +
                ", medico=" + medico +
                ", dataAtendimento=" + dataAtendimento +
                ", sala='" + sala + '\'' +
                '}';
    }


}
