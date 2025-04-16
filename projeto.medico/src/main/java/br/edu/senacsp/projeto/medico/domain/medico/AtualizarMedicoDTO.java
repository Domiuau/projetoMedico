package br.edu.senacsp.projeto.medico.domain.medico;

public record AtualizarMedicoDTO(Long id, String nome, String especialidade, String telefone, String email, String senha) {

    public AtualizarMedicoDTO(Medico medico) {
        this(medico.getId(), medico.getNome(), medico.getEspecialidade(), medico.getTelefone(), medico.getEmail(), medico.getSenha());
    }
}


