package br.edu.senacsp.projeto.medico.domain.paciente;

public record AtualizarPacienteDTO(Long id, String nome, String endereco, String telefone, String email, String senha) {
}
