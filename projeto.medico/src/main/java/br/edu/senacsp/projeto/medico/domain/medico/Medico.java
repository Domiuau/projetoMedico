package br.edu.senacsp.projeto.medico.domain.medico;

import br.edu.senacsp.projeto.medico.domain.atendimento.Atendimento;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "medicos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Medico {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String crm;
    private String especialidade;
    private String telefone;
    private String email;
    private String senha;
    private boolean ativo;
    @OneToMany(mappedBy = "medico", cascade = CascadeType.ALL)
    private List<Atendimento> atendimentos = new ArrayList<>();

    public Medico(String nome, String crm, String especialidade, String telefone, String email, String senha) {
        this.nome = nome;
        this.crm = crm;
        this.especialidade = especialidade;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.ativo = true;

    }

}
