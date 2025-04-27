package br.edu.senacsp.projeto.medico.domain.paciente;

import br.edu.senacsp.projeto.medico.domain.atendimento.Atendimento;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pacientes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Paciente {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cpf;
    private String endereco;
    private String telefone;
    private String email;
    private String senha;
    private boolean ativo;
    private String role;
    @OneToMany(mappedBy = "paciente", cascade = CascadeType.ALL)
    private List<Atendimento> atendimentos = new ArrayList<>();

    public Paciente(String nome, String cpf, String endereco, String telefone, String email, String senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
        this.ativo = true;
        this.role = "ROLE_PACIENTE";
    }


}
