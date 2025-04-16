package br.edu.senacsp.projeto.medico.domain.medico;

public record MedicoDTO(String nome, String crm, String especialidade, String telefone, String email, String senha) {

    public MedicoDTO(Medico medico) {
        this(medico.getNome(), medico.getCrm(), medico.getEspecialidade(), medico.getTelefone(), medico.getEmail(), medico.getSenha());
    }
}


