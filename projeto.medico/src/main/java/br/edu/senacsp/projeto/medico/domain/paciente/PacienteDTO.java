package br.edu.senacsp.projeto.medico.domain.paciente;

public record PacienteDTO(String nome, String cpf, String endereco, String telefone, String email, String senha) {

    public PacienteDTO(Paciente paciente) {
        this(paciente.getNome(), paciente.getCpf(), paciente.getEndereco(), paciente.getTelefone(), paciente.getEmail(), paciente.getSenha());
    }
}

